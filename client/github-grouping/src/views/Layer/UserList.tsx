import React, { Component } from 'react'
import { socketEmit, socketOn } from 'Utils/socket';
import { IUserStore } from 'stores/UserStore';
import { observer, inject } from 'mobx-react';

type Props = {
  userStore?: IUserStore
}
@inject('userStore')
@observer
export default class Layer extends Component<Props> {
  constructor (props: any) {
    super(props)
  }
  componentDidMount () {
    socketEmit('get.user')
    socketOn('get.user', (list: any[]) => {
      this.setState({ list })
    })
  }
  render () {
    const { userList: list } = this.props.userStore!
    return (
      <div className="user-list">
        <h3 className="layer-title">접속자 목록</h3>
        {
          list.map((v, k) => (
            <article className="user-list__article" key={k} onClick={e => window.open(v.html_url)}>
              <figure className="user-list__thumbnail">
                <img className="user-list__image" src={v.avatar_url} alt={v.name} />
              </figure>
              <p className="user-list__name">{v.name}</p>
            </article>
          ))
        }
      </div>
    )
  }
}