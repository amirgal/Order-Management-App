import {observable,action} from 'mobx'
import axios from 'axios'

export default class SingleOrder {
    
    @observable progress
    @observable inProcess
    @observable stageEmployees 
    @observable isComplete
    
    constructor(order){
     this._id = order._id   
     this.shopifyId = order.shopifyId   
     this.costumerId = order.costumerId   
     this.price = order.price   
     this.product = order.product   
     this.attributes = order.attributes    
     this.progress = order.progress   
     this.inProcess = order.inProcess   
     this.isComplete = order.isComplete
     this.stageEmployees = order.stageEmployees
     this.shippingAddress = order.shippingAddress  
    }
    
    @action advanceStage = () => {
        this.progress +=1
        this.inProcess = false
        if(this.progress > 6){this.isComplete = true}       //hardcoded stage for now
        axios.put("http://localhost:4000/order",this)
    }
    
    @action claimStage = (employeeName) => {
        this.stageEmployees[this.progress] = employeeName
        this.inProcess = true
        axios.put("http://localhost:4000/order",this)
    }
    
    
}