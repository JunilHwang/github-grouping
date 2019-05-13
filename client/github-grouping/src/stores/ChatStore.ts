import { observable, action } from 'mobx'
import { RootStore } from 'stores';
import autobind from 'autobind-decorator';
import { $pre } from 'Utils';
import Axios from 'axios';
import { asyncAction } from 'mobx-utils';
import { socketEmit } from 'Utils/socket';

export interface Message {
  idx: number
  room: number
  writer: any
  msg: string
  reg_date: number
}

export interface IChatStore {
  list: Message[]
  post(chat: Message): void
  get(room: number): AsyncIterableIterator<any>
  insert(msg: Message): AsyncIterableIterator<any>
}

@autobind
export default class ChatStore {
  private root: RootStore
  @observable public list: Message[] = []
  constructor (root: RootStore) {
    this.root = root
  }

  @asyncAction
  async *get (room: number = 0) {
    const list = yield $pre(Axios.get(`/api/chat/${room}`))
    this.list = list.map((v: any) => {
      v.writer = JSON.parse(v.writer)
      return v
    })
  }

  @action post = (msg: Message): void => {
    this.list.push(msg)
  }

  @asyncAction
  async *insert(msg: Message) {
    socketEmit('chat', msg)
    msg.writer = JSON.stringify(msg.writer)
    yield $pre(Axios.post(`/api/chat`, msg))
  }
}