import {observable,action} from 'mobx'
import axios from 'axios'
import SingleOrderStore from './SingleOrderStore'



export default class OrdersStore{
    @observable orders = []
    @observable products = []
    @observable employees = [{id:1,name:'nadav'},{id:2,name:'alon'},{id:3,name:'amir'}]
    
    @action getOrders = async () => {
        // const ordersResponse = await axios.get("http://localhost:4000/orders")
        // this.orders = ordersResponse
        const dummyOrders = [{progress:1,inProcess:false},{progress:2,inProcess:true},
        {progress:3,inProcess:false},{progress:4,inProcess:true},{progress:2,inProcess:false},
        {progress:5,inProcess:true},{progress:6,inProcess:false},{progress:7,inProcess:false}]
        this.orders = dummyOrders.map(o => new SingleOrderStore(o))
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