import React, { Component } from 'react'
import { FaGithub } from 'react-icons/fa'
import queryString from 'query-string'
import * as github from 'github.json'
import { inject, observer } from 'mobx-react'
import { IUserStore } from 'stores/UserStore'
import autobind from 'autobind-decorator'
import Profile from './Profile'
import ChattingList from './Chatting/List'
import ChattingForm from './Chatting/Form'
import { Switch, Route } from 'react-router';
import Grouping from './Grouping';
import Guide from './Guide';

type Props = {
  match: any
  location: any
  history: any
  userStore?: IUserStore
}

@inject('userStore')
@observer
@autobind
export default class Home extends Component<Props> {
  componentWillMount () {
    const { location, history } = this.props
    const { login } = this.props.userStore!
    if (location.search) {
      const code = queryString.parse(location.search).code as string
      login(code)
      history.push('/')
    }
  }
  render() {
    const { user } = this.props.userStore!
    const { HomeComponent, LoginComponent } = this
    return user ? <HomeComponent /> : <LoginComponent />
  }
  LoginComponent () {
    return (
      <main className="login-wrap">
        <section>
          <h1 className="login-wrap__title">돛단대 GitHub Grouping 프로그램</h1>
          <a href={`https://github.com/login/oauth/authorize?client_id=${github.client_id}&redirect_uri=${github.redirect_uri}&scope=${github.scope}`} className="login-wrap__button">
            <FaGithub />
            <span>GitHub로 로그인하기</span>
          </a>
        </section>
      </main>
    )
  }
  HomeComponent () {
    const Chatting = (props: {}) => (
      <main className="chat-wrap">
        <ChattingList {...props} />
        <ChattingForm {...props} />
      </main>
    )
    return (
      <section className="site-wrap">
        <Profile />
        <Switch>
          <Route path="/group" component={Grouping} />
          <Route path="/guide/:step" component={Guide} />
          <Route exact path="/chat/:id" component={Chatting} />
          <Route exact path="/" component={Chatting} />
        </Switch>
      </section>
    )
  }
}