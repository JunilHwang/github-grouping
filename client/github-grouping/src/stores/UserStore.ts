import { observable, action } from 'mobx'
import { IRootStore } from './index'
import { asyncAction } from 'mobx-utils'
import { $pre } from 'Utils'
import axios from 'axios'
import autobind from 'autobind-decorator';

export interface IUserStore {
  user: any,
  login(code: string): AsyncIterableIterator<any>
  logout(): void
}

@autobind
export default class UserStore implements IUserStore {
  private root: IRootStore
  @observable public user: any = JSON.parse(localStorage.getItem('user') || 'null')
  constructor (root: IRootStore) {
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
    localStorage.removeItem('user')
  }
}