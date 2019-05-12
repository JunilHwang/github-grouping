import UserStore from './UserStore'

export interface IRootStore {
  userStore: UserStore
}

class RootStore implements IRootStore {
  public userStore: UserStore
  constructor () {
    this.userStore = new UserStore(this)
  }
}
export default new RootStore()