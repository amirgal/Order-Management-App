import {observable,action} from 'mobx'
import axios from 'axios'


export class OrdersStore{
    @observable orders = []
    @observable employees = []
    @observable products = []
    
    @action getOrders = async () => {
        const ordersResponse = await axios.get("http://localhost:4000/orders")
        this.orders = ordersResponse
    }

    @action getEmployees = async () => {
        const employeesResponse = await axios.get("http://localhost:4000/employees")
        this.employees = employeesResponse
    }

    @action getProducts = async () => {
        const productsResponse = await axios.get("http://localhost:4000/products")
        this.products = productsResponse
    }

    @action initializeAll = () => {
        this.getOrders()
        this.getEmployees()
        this.getProducts()
    }


}