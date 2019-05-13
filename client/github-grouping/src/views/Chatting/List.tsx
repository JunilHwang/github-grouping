import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { IChatStore, Message } from 'stores/ChatStore';
import { getToday } from 'Utils'
import { IUserStore } from 'stores/UserStore';
import { socketOn } from 'Utils/socket'

type Props = {
  chatStore?: IChatStore
  userStore?: IUserStore
}
@inject('chatStore', 'userStore')
@observer
export default class ChattingList extends Component<Props> {
  private chatList: React.RefObject<HTMLElement> = React.createRef()
  componentDidUpdate () {
    const target = this.chatList.current
    if (target) {
      const { scrollHeight: sh, scrollTop: st, clientHeight: ch} = target
      if (sh - st - ch < 500) this.scrollSet()
    }
  }
  componentDidMount() {
    this.scrollSet()
    const { post } = this.props.chatStore!
    socketOn('chat', (msg: Message) => {
      post(msg)
    })
  }
  scrollSet() {
    const target = this.chatList.current
    if (target) {
      target.scrollTo(0, target.scrollHeight)
    }
  }
  render () {
    const { list } = this.props.chatStore!
    const { user } = this.props.userStore!
    return (
      <section className="chat-list" ref={this.chatList}>
        {list.map(({writer, msg, reg_date}: Message, k: number) => (
          <article key={k} className={`chat-list__article ${(user.id === writer.id ? 'me' : 'other')}`}>
            <header className="chat-list__writer">
              <figure className="chat-list__thumbnail" onClick={e => window.open(writer.html_url)}>
                <img src={writer.avatar_url} alt={writer.name} />
              </figure>
            </header>
            <div className="chat-list__content">
              <strong className="chat-list__name">{writer.name}</strong>
              <p className="chat-list__msg">
                {msg}
                <span className="chat-list__date">{getToday(reg_date)}</span>
              </p>
            </div>
          </article>
        ))}
      </section>
    )
  }
}