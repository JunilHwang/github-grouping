import UserStore from './UserStore'
import ChatStore from './ChatStore'

export interface IRootStore {
  userStore: UserStore
  chatStore: ChatStore
}

class RootStore implements IRootStore {
  public userStore: UserStore
  public chatStore: ChatStore
  constructor () {
    this.userStore = new UserStore(this)
    this.chatStore = new ChatStore(this)
  }
}
export default new RootStore()