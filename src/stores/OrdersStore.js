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
           
       }
    }

    @action getAverageTimeForTask = () => {
        const objByEmployee = {}
        const toReturn = []
        console.log(this.orders.length);
        
         this.orders.forEach(o => {
            for(let i =1; i < o.progress;i++ ){
                console.log(o.stageEmployee);
                if(o.stageEmployees[i]['endDate']){
                    if(!objByEmployee[o.stageEmployees[i].name]){
                        objByEmployee[[o.stageEmployees[i].name]] ={sum : 0 ,num : 0}
                    }
                    objByEmployee[o.stageEmployees[i].name].sum += ((o.stageEmployees[i].endDate - o.stageEmployees[i].startDate) / 60000 )      
                    objByEmployee[o.stageEmployees[i].name].num += 1              
                }

            }
            
        })
        const objKeys = Object.keys(objByEmployee)
        for(let key of objKeys){
            const num = (objByEmployee[key].sum / objByEmployee[key].num)
            toReturn.push({name : key, average : (Math.round(num * 100) / 100).toFixed(2)})
        }
        
        return toReturn
    }
    @action getCompletedByEmployee = () => {
        const objByEmployee = {}
        const toReturn = []
        this.orders.forEach(o => {
            for(let i = 1; i< o.progress;i++){
                if(o.stageEmployees[i]['endDate']){
                    if(!objByEmployee[o.stageEmployees[i].name]){
                        objByEmployee[o.stageEmployees[i].name] = 1
                    }else{
                        objByEmployee[o.stageEmployees[i].name] += 1
                    }
                }
            }
        })
        const objKeys = Object.keys(objByEmployee)
        for(let key of objKeys){
            toReturn.push({name : key , amount : objByEmployee[key]})
        }

        return toReturn
    }

    @action getOrdersPerProduct = () => {
        const toReturn = []
        const objByProduct = {}
        this.orders.forEach(o => {
            if(!objByProduct[o.product.name]){
                objByProduct[o.product.name] = 1
            }else{
                objByProduct[o.product.name] +=1
            }
        })
        const objKeys = Object.keys(objByProduct)
        for(let key of objKeys){
            toReturn.push({name : key, number : objByProduct[key]})
        }
        return toReturn
    }
    

    @action initializeAll = () => {
        this.getOrders()
        this.getEmployees()
        this.getProducts()
        this.getCustomers()
    }


}