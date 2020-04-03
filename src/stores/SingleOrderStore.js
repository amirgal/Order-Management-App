import {observable,action} from 'mobx'
import axios from 'axios'

export default class SingleOrder {
    
    @observable progress
    @observable inProcess
    @observable stageEmployees 
    @observable isComplete
    
    constructor(order,numStages){
     this._id = order._id   
     this.shopifyId = order.shopifyId   
     this.customerId = order.customerId   
     this.price = order.price   
     this.product = order.product   
     this.attributes = order.attributes    
     this.progress = order.progress   
     this.inProcess = order.inProcess   
     this.isComplete = order.isComplete
     this.stageEmployees = order.stageEmployees
     this.shippingAddress = order.shippingAddress  
     this.date = new Date(order.date)
     this.endDate = order.endDate ? new Date(order.endDate) : null
     this.numStages = numStages
     this.isReadyToShip = order.isReadyToShip
    }
    
    @action advanceStage = async () => {     
        this.stageEmployees[this.progress].endDate= new Date()
        this.progress +=1
        this.inProcess = false
        if(this.progress === this.numStages + 1){          
            this.isReadyToShip = true
        } 
        await axios.put("http://localhost:4000/api/order",this)
    }
    
    @action claimStage = async (employeeName) => {
        this.stageEmployees[this.progress] = {name:employeeName, startDate : new Date(),endDate : null}
        this.inProcess = true
        await axios.put("http://localhost:4000/api/order",this)
    }

    @action completeOrder = async () => {
        this.isReadyToShip = false        
        this.isComplete = true
        this.endDate = new Date()  
        await axios.put("http://localhost:4000/api/order",this)
    }
}