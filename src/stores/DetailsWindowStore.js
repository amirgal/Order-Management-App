import {observable,action} from 'mobx'

export default class DetailsWindowStore {
    @observable showDetailsWindow = false
    @observable detailsWindowOrder

    @action setDetailsWindowOrder = (order) => {
        this.detailsWindowOrder = order
    }

    @action toggleDetailsWindow = () => {
        this.showDetailsWindow = !this.showDetailsWindow
    }
}