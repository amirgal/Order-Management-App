import {observable,action} from 'mobx'
import axios from 'axios'

export default class SingleOrder {
    
    @observable progress
    @observable inProcess
    @observable stageEmployees 
    
    
    constructor(order){
     this.id = order._id   
     this.shopifyId = order.shopifyId   
     this.costumerId = order.costumerId   
     this.price = order.price   
     this.product = order.product   
     this.attributes = order.attributes    
     this.progress = order.progress   
     this.inProcess = order.inProcess   
     this.stageEmployees = order.stageEmployees
     this.shippingAddress = order.shippingAddress  
    }
    
    @action advanceStage = () => {
        debugger
        this.progress +=1
        this.inProcess = false
        // axios.put("http://localhost:4000/order",this)
    }
    
    @action claimStage = (employeeName) => {
        this.stageEmployees[this.progress] = employeeName
        this.inProcess = true
        console.log(this.stageEmployee)
        // axios.put("http://localhost:4000/order",this)
    }
    
    
}