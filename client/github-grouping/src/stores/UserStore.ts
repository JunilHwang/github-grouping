import { observable, action } from 'mobx'
import { RootStore } from './index'
import { asyncAction } from 'mobx-utils'
import { $pre, shuffle } from 'Utils'
import axios from 'axios'
import autobind from 'autobind-decorator';
import { socketEmit } from 'Utils/socket';

export interface IUserStore {
  user: any
  userList: any[]
  suffled: any[]
  login(code: string): AsyncIterableIterator<any>
  logout(): void
  setUserList(userList: any[]): void
  setSuffled(): void
  resetSuffled(): void
}

@autobind
export default class UserStore implements IUserStore {
  private root: RootStore
  @observable public user: any = JSON.parse(localStorage.getItem('user') || 'null')
  @observable public userList: any = []
  @observable public suffled: any[] = JSON.parse(localStorage.getItem('suffled') || 'null') || []
  constructor (root: RootStore) {
    this.root = root
  }

  @asyncAction
  async *login (code: string) {
    const r = yield $pre(axios.get('/api/github/auth', { params: { code } }))
    const access_token = r.access_token
    const r2 = yield $pre(axios.get('/api/github/user', { params: { access_token } }))
    this.user = { access_token, ...r2 }
    localStorage.setItem('user', JSON.stringify(this.user))
  }

  @action logout = (): void => {
    this.user = null
    socketEmit('out', null)
    localStorage.removeItem('user')
  }

  @action setUserList = (userList: any[]): void => {
    this.userList = userList
  }

  @action setSuffled (): void {
    const userList = this.userList
    const duplicated = [...userList, ...userList, ...userList, ...userList, ...userList, ...userList, ...userList, ...userList, ...userList, ...userList, ...userList, ...userList, ...userList, ...userList]
    const suffled = shuffle(duplicated)
    localStorage.setItem('suffled', JSON.stringify(suffled))
    this.suffled = suffled
  }
  
  @action resetSuffled (): void {
    localStorage.setItem('suffled', '[]')
    this.suffled = []
  }
}