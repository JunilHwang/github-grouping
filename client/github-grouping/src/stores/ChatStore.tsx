import { observable, action } from 'mobx'
import { IRootStore } from 'stores';

export interface Message {
  writer: any
  msg: string
  reg_date: number
}

export interface IChatStore {
  list: Message[]
  post(chat: Message): void
}

export default class ChatStore {
  private root: IRootStore
  @observable public list: Message[] = JSON.parse(localStorage.getItem('chatList') || 'null') || []
  constructor (root: IRootStore) {
    this.root = root
  }

  @action post = (msg: Message): void => {
    this.list.push(msg)
    localStorage.setItem('chatList', JSON.stringify(this.list))
  }
}