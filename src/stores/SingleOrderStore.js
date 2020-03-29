import {observable,action} from 'mobx'
import axios from 'axios'

export class SingleOrder {
    @observable id
    @observable shopifyDd
    @observable costumerid
    @observable price
    @observable product 
    @observable attributes
    @observable graphics
    @observable comment
    @observable progress
    @observable inProcess
    @observable stageEmployee 
    
    constructor(order){
     this.id = order.id   
     this.id = order.shopifyDd   
     this.id = order.costumerid   
     this.id = order.price   
     this.id = order.product   
     this.id = order.attributes   
     this.id = order.graphics   
     this.id = order.comment   
     this.id = order.progress   
     this.id = order.inProcess   
     this.id = order.stageEmployee   
    }
    
    @action advanceStage = () => {
        this.progress++
        this.inProcess = false
        axios.put("http://localhost:4000/order",this)
    }
    
    @action claimStage = (employee) => {
        this.stageEmployee[this.progress] = employee
        this.inProcess = true
        axios.put("http://localhost:4000/order",this)
    }
    
    
}