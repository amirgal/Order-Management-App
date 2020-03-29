import {observable,action} from 'mobx'
import axios from 'axios'

export default class SingleOrder {
    @observable id
    @observable shopifyId
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
    //  this.id = order.id   
    //  this.shopifyId = order.shopifyId   
    //  this.costumerid = order.costumerid   
    //  this.price = order.price   
    //  this.product = order.product   
    //  this.attributes = order.attributes   
    //  this.graphics = order.graphics   
    //  this.comment = order.comment   
     this.progress = order.progress   
     this.inProcess = order.inProcess   
     this.stageEmployee = {1 : null}   
    }
    
    @action advanceStage = () => {
        this.progress++
        this.inProcess = false
        // axios.put("http://localhost:4000/order",this)
    }
    
    @action claimStage = (employeeName) => {
        this.stageEmployee[this.progress] = employeeName
        this.inProcess = true
        console.log(this.stageEmployee)
        // axios.put("http://localhost:4000/order",this)
    }
    
    
}