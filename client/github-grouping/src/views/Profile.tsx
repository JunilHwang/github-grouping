import React, { Component } from 'react'
import { IUserStore } from 'stores/UserStore'
import { observer, inject } from 'mobx-react'
import { FaSignOutAlt } from 'react-icons/fa'
import { socketOn, socketEmit } from 'Utils/socket';
import { ILayerStore } from 'stores/LayerStore';
import { Link } from 'react-router-dom';

type Props = {
  userStore?: IUserStore
  layerStore?: ILayerStore
}

@inject('userStore', 'layerStore')
@observer
export default class Profile extends Component<Props> {
  componentDidMount () {
    const { user, setUserList } = this.props.userStore!
    socketEmit('out.user', user.id)
    socketEmit('inter.user', user)
    socketOn('get.user', setUserList)
  }
  render () {
    const { user, logout, userList } = this.props.userStore!
    const { setLayer } = this.props.layerStore!
    return (
      <header className="profile">
        <figure className="profile__thumbnail--wrap">
          <img className="profile__thumbnail--image" src={user.avatar_url} alt={user.name} />
        </figure>
        <div className="profile__info">
          <h3 className="profile__header">
            <strong className="profile__name"><a href={user.html_url}>{user.name}</a></strong>
            <span className="profile__email">{user.email}</span>
          </h3>
          <p className="profile__bio">{user.bio}</p>
        </div>
        <nav className="nav">
          <Link className="nav__link" to="/chat/0">채팅</Link>
          <Link className="nav__link" to="/group">그룹</Link>
          <Link className="nav__link" to="/guide/1">가이드</Link>
          <span className="nav__link" onClick={(e: any) => setLayer(e, 'UserList')}>접속자 : {userList.length}명</span>
          <a className="nav__logout" href="#!" onClick={logout}><FaSignOutAlt /></a>
        </nav>
      </header>
    )
  }
}