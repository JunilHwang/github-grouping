import React, { Component } from 'react'
import { IUserStore } from 'stores/UserStore';
import { observer, inject } from 'mobx-react';

type Props = {
  userStore?: IUserStore
}

@inject('userStore')
@observer
export default class Profile extends Component<Props> {
  render () {
    const { user, logout } = this.props.userStore!
    return (
      <header className="profile">
        <img src={user.avatar_url} alt={user.name} />
        <strong><a href={user.html_url}>{user.name}</a></strong>
        <p>{user.bio}</p>
        <p>{user.email}</p>
        <a href="#!" onClick={logout}>로그아웃</a>
      </header>
    )
  }
}