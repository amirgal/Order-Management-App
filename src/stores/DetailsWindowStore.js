import {observable,action} from 'mobx'

export default class DetailsWindowStore {
    @observable showDetailsWindow = false
    @observable detailsWindowOrder
    @observable detailsWindowStage

    @action setDetailsWindowOrder = (order) => {
        this.detailsWindowOrder = order
    }

    @action toggleDetailsWindow = () => {
        this.showDetailsWindow = !this.showDetailsWindow
    }

    @action setDetailsWindowStage = (stage) => {
        this.detailsWindowStage = stage
    }
}