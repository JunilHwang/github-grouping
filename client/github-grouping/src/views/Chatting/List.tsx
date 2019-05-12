import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { IChatStore, Message } from 'stores/ChatStore';
import { getToday } from 'Utils'
import { IUserStore } from 'stores/UserStore';

type Props = {
  chatStore?: IChatStore
  userStore?: IUserStore
}
@inject('chatStore', 'userStore')
@observer
export default class ChattingList extends Component<Props> {
  render () {
    const { list } = this.props.chatStore!
    const { user } = this.props.userStore!
    return (
      <section className="chat-list">
        {list.map(({writer, msg, reg_date}: Message, k: number) => (
          <article key={k} className={`chat-list__article ${(user.id === writer.id ? 'me' : 'other')}`}>
            <header className="chat-list__writer">
              <figure className="chat-list__thumbnail">
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