import UserStore from './UserStore'
import ChatStore from './ChatStore'
import LayerStore from './LayerStore'

export class RootStore {
  public userStore: UserStore
  public chatStore: ChatStore
  public layerStore: LayerStore
  constructor () {
    this.userStore = new UserStore(this)
    this.chatStore = new ChatStore(this)
    this.layerStore = new LayerStore(this)
  }
}
export default new RootStore()