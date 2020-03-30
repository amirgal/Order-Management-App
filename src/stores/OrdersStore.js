import {observable,action} from 'mobx'
import axios from 'axios'
import SingleOrderStore from './SingleOrderStore'



export default class OrdersStore{
    @observable orders = []
    @observable products = []
    @observable employees = []
    @observable customers = []
    
    @action getOrders = async () => {
        const ordersResponse = await axios.get("http://localhost:4000/api/orders")
        this.orders = ordersResponse.data.map(o => new SingleOrderStore(o))
    }

    @action getEmployees = async () => {
        const employeesResponse = await axios.get("http://localhost:4000/api/employees")
        this.employees = employeesResponse.data
    }

    @action getProducts = async () => {
        const productsResponse = await axios.get("http://localhost:4000/api/products")
        this.products = productsResponse.data
    }

    @action getCustomers = async () => {
        const customersResponse = await axios.get("http://localhost:4000/api/customers")
        this.customers = customersResponse.data
    }

    @action addEmployee = async (name) => {
        let updatedEmployees =  await axios.post(`http://localhost:4000/api/employees`,{name,isActive : true})
        if(typeof updatedEmployees.data === "string"){
            alert(updatedEmployees.data)
        }else{
            this.employees = updatedEmployees.data
        }
    }
    @action modifyEmployee = async (employee) =>{
        employee.isActive = !employee.isActive
        let updatedEmployees = await axios.put('http://localhost:4000/api/employees',employee)
        this.employees = updatedEmployees.data
    }

    @action makeSync = async (paramsObj) => {
        const ordersUrl = `https://${paramsObj.apiKey}:${paramsObj.password}@${paramsObj.shopName}.myshopify.com/admin/api/2020-01/orders.json`
        const productsUrl = `https://${paramsObj.apiKey}:${paramsObj.password}@${paramsObj.shopName}.myshopify.com/admin/api/2020-01/products.json`
       const response =  await axios.post(`http://localhost:4000/api/sync/`,{productsUrl,ordersUrl})
       if(response.data.products ){
           this.orders = response.data.orders.map(o => new SingleOrderStore(o))
           this.employees = response.data.employees
           this.products = response.data.products
           return true
       }else{
           return false
       }
    }
    

    @action initializeAll = () => {
        this.getOrders()
        this.getEmployees()
        this.getProducts()
        this.getCustomers()
    }


}