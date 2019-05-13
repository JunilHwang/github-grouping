import React, { Component, ReactNode } from 'react'
import LayerStore from 'stores/LayerStore';
import { observer, inject } from 'mobx-react';
import UserList from './Layer/UserList'
import { FaTimes } from 'react-icons/fa';
import autobind from 'autobind-decorator';

type Props = {
  layerStore?: LayerStore
}
type TemplateProps = {
  children: ReactNode
}
@inject('layerStore')
@observer
@autobind
export default class Layer extends Component<Props> {
  Template ({ children }: TemplateProps) {
    const { closeLayer } = this.props.layerStore!
    return (
      <div className="layer">
        <span className="middle"></span>
        <div className="layer-content">
          <a href="#" className="close" onClick={closeLayer}><FaTimes /></a>
          { children }
        </div>
      </div>
    )
  }
  render () {
    const { layerComponent } = this.props.layerStore!
    const { Template, getComponent } = this
    return layerComponent ? (<Template> {getComponent(layerComponent)} </Template>) : null
  }

  getComponent (layerComponent: string) {
    switch (layerComponent) {
      case 'UserList' : return <UserList />
    }
  }
}