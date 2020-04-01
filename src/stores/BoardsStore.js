import {observable,action, computed} from 'mobx'
import axios from 'axios'
import SingleOrderStore from './SingleOrderStore'

export default class OrdersStore {
    @observable boards = []

    @action getBoards = async () => {
        const boards = axios.get("http://localhost:4000/api/boards")
        boards.forEach(board => {
            board.orders = board.orders.map(o => new SingleOrderStore(o, board.stages.length))
        });
        this.boards = boards
    }
}