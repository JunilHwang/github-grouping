import { observable, action } from 'mobx'
import { RootStore } from './index'
import autobind from 'autobind-decorator';

export interface ILayerStore {
  layerComponent: string
  setLayer(e:any, layerComponent: string): void
  closeLayer(e: any): void
}

@autobind
export default class LayerStore {
  private root: RootStore
  @observable public layerComponent: string = ''
  constructor (root: RootStore) {
    this.root = root
  }

  @action setLayer (e: any, layerComponent: string): void {
    e.preventDefault()
    this.layerComponent = layerComponent
  }

  @action closeLayer (e: any): void {
    this.layerComponent = ''
  }
}