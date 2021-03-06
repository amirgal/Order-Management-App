import { observable, action, computed } from "mobx";
import axios from "axios";
import SingleOrderStore from "./SingleOrderStore";
import BoardStore from "./BoardStore";

export default class GeneralStore {
  @observable boards = [];
  @observable products = [];
  @observable employees = [];
  @observable customers = [];
  @observable orders = [];
  @observable adminId = "";
  @observable darkMode = localStorage.theme == "light" ? false : true;

  @action toggleDarkMode = () => {
    localStorage.setItem("theme", this.darkMode ? "light" : "dark");
    this.darkMode = !this.darkMode;
  };
  @action getAdminData = async (optionalData) => {
    let response;
    try {
      if (!optionalData) {
        response = await axios.get(
          `http://localhost:4000/api/getAdminData/${this.adminId}`
        );
      } else {
        response = optionalData;
      }
      this.getBoards(response.data.boards);
      this.employees = response.data.employees;
      this.products = response.data.products;
      this.customers = response.data.customers;
    } catch (error) {
      console.log(error);
    }
  };

  @action addWebhookOrder = (socketData) => {
    const board = this.boards.find((b) => b._id === socketData.boardId)
    const newOrder = new SingleOrderStore(socketData.order, board.stages)
    board.orders.push(newOrder)
    this.orders.push(newOrder)
    const customerIndex = this.customers.findIndex(
      (c) => c._id === socketData.customer._id
    );
    if (customerIndex === -1) {
      this.customers.push(socketData.customer);
    } else {
      this.customers.splice(customerIndex, 1, socketData.customer);
    }
  };
  @action fulfill = async (shopifyId) => {
    const res = await axios.post(`http://localhost:4000/api/fulfill`, {
      adminId: this.adminId,
      shopifyId,
    });
    console.log(res.data);
  };

  @action getBoards = async (optionalBoards) => {
    let boards = optionalBoards || [];
    this.boards = boards.map((board) => {
      return new BoardStore(board);
    });
    if(this.orders.length === 0){
      for (let board of this.boards) {
        this.orders = [...this.orders, ...board.orders];
      }
    }
  };

  @action getSingleOrder = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/singleOrder/${id}`
      );
      return response.data;
    } catch (error) {
      return error;
    }
  };
  @action getSingleCustomer = async (id) => {
    const response = await axios.get(
      `http://localhost:4000/api/singleCustomer/${id}`
    );
    return response.data;
  };

  @action createBoard = async (board) => {
    board.adminId = this.adminId;
    const savedBoard = await axios.post(
      "http://localhost:4000/api/board",
      board
    );
    const updatedProducts = [...this.products];
    updatedProducts.forEach((p) => {
      if (savedBoard.data.products.includes(p._id)) {
        p.boardId = savedBoard.data._id;
      }
    });
    this.products = updatedProducts;
    // savedBoard.data.orders.map(
    //   (o) => new SingleOrderStore(o, board.stages)
    // )
    this.boards.push(new BoardStore(savedBoard.data));
    this.orders = [
      ...this.orders,
      ...this.boards[this.boards.length - 1].orders,
    ];
  };

  @action addEmployee = async (name) => {
    let updatedEmployees = await axios.post(
      `http://localhost:4000/api/employees`,
      { name, isActive: true, adminId: this.adminId }
    );
    if (typeof updatedEmployees.data === "string") {
      alert(updatedEmployees.data);
    } else {
      this.employees = updatedEmployees.data;
    }
  };
  @action modifyEmployee = async (employee) => {
    employee.isActive = !employee.isActive;
    let updatedEmployees = await axios.put(
      "http://localhost:4000/api/employees",
      employee
    );
    this.employees = updatedEmployees.data;
  };

  @action makeSync = async () => {
    const adminId = this.adminId;
    const response = await axios.post(`http://localhost:4000/api/sync/`, {
      adminId,
    });
    if (response.data.products) {
      this.getBoards(response.data.boards);
      this.employees = response.data.employees;
      this.products = response.data.products;
      this.customers = response.data.customers;
      return true;
    } else {
      return false;
    }
  };

  @action getAverageTimeForTask = () => {
    const objByEmployee = {};
    const toReturn = [];
    this.orders.forEach((o) => {
      for (let i = 1; i < o.progress; i++) {
        if (!objByEmployee[o.stageEmployees[i].name]) {
          objByEmployee[[o.stageEmployees[i].name]] = { sum: 0, num: 0 };
        }

        objByEmployee[o.stageEmployees[i].name].sum +=
          (Date.parse(o.stageEmployees[i].endDate) -
            Date.parse(o.stageEmployees[i].startDate)) /
          60000;
        objByEmployee[o.stageEmployees[i].name].num += 1;
      }
    });
    const objKeys = Object.keys(objByEmployee);
    for (let key of objKeys) {
      const num = objByEmployee[key].sum / objByEmployee[key].num;
      toReturn.push({
        name: key,
        average: (Math.round(num * 100) / 100).toFixed(2),
      });
    }

    return toReturn;
  };
  @action getCompletedByEmployee = () => {
    const objByEmployee = {};
    const toReturn = [];

    this.orders.forEach((o) => {
      for (let i = 1; i < o.progress; i++) {
        if (o.stageEmployees[i]["endDate"]) {
          if (!objByEmployee[o.stageEmployees[i].name]) {
            objByEmployee[o.stageEmployees[i].name] = 1;
          } else {
            objByEmployee[o.stageEmployees[i].name] += 1;
          }
        }
      }
    });
    const objKeys = Object.keys(objByEmployee);
    for (let key of objKeys) {
      toReturn.push({ name: key, amount: objByEmployee[key] });
    }
    return toReturn;
  };

  @action getOrdersPerProduct = () => {
    const toReturn = [];
    const objByProduct = {};

    this.orders.forEach((o) => {
      if (!objByProduct[o.product.name]) {
        objByProduct[o.product.name] = 1;
      } else {
        objByProduct[o.product.name] += 1;
      }
    });
    const objKeys = Object.keys(objByProduct);
    for (let key of objKeys) {
      toReturn.push({ name: key, number: objByProduct[key] });
    }
    return toReturn;
  };

  @action getTimePerProduct = () => {
    const toReturn = [];
    const objTimePerProduct = {};
    this.orders.forEach((o) => {
      if (o.isComplete) {
        if (!objTimePerProduct[o.product.name]) {
          objTimePerProduct[o.product.name] = { sum: 0, num: 0 };
        }
        objTimePerProduct[o.product.name].sum +=
          (Date.parse(o.endDate) - Date.parse(o.date)) / 3600000;
        objTimePerProduct[o.product.name].num += 1;
      }
    });
    const keys = Object.keys(objTimePerProduct);
    for (let key of keys) {
      const num = objTimePerProduct[key].sum / objTimePerProduct[key].num;
      toReturn.push({
        name: key,
        average: (Math.round(num * 100) / 100).toFixed(2),
      });
    }
    return toReturn;
  };

  @computed get rdyToShipOrdersById() {
    const shippingOrdersByID = {};

    this.orders.forEach((o) => {
      if (o.isReadyToShip) {
        shippingOrdersByID[o.shopifyId] = [];
      }
    });
    this.orders.forEach((o) => {
      if (shippingOrdersByID[o.shopifyId]) {
        shippingOrdersByID[o.shopifyId].push(o);
      }
    });
    return shippingOrdersByID;
  }
}
