import { observable, action } from 'mobx'
import { RootStore } from 'stores';
import autobind from 'autobind-decorator';

export interface Message {
  writer: any
  msg: string
  reg_date: number
}

export interface IChatStore {
  list: Message[]
  post(chat: Message): void
}

@autobind
export default class ChatStore {
  private root: RootStore
  @observable public list: Message[] = JSON.parse(localStorage.getItem('chatList') || 'null') || []
  constructor (root: RootStore) {
    this.root = root
  }

  @action post = (msg: Message): void => {
    this.list.push(msg)
    localStorage.setItem('chatList', JSON.stringify(this.list))
  }
}