import React, { Component } from 'react'
import { IUserStore } from 'stores/UserStore'
import { observer, inject } from 'mobx-react'
import { FaSignOutAlt } from 'react-icons/fa'
import { socketOn, socketEmit } from 'Utils/socket';

type Props = {
  userStore?: IUserStore
}

type State = {
  count: number
}

@inject('userStore')
@observer
export default class Profile extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = { count: 0 }
  }
  componentDidMount () {
    socketEmit('inter', null)
    socketOn('inter', (count: number) => {
      this.setState({ count })
    })
  }
  render () {
    const { user, logout } = this.props.userStore!
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
          <span className="nav__connected">접속자 : {this.state.count}명</span>
          <a className="nav__logout" href="#!" onClick={logout}><FaSignOutAlt /></a>
        </nav>
      </header>
    )
  }
}