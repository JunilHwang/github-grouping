import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import { inject, observer } from 'mobx-react'
import { IUserStore } from 'stores/UserStore'
import { IChatStore, Message } from 'stores/ChatStore';
import { match } from 'react-router';

type Props = {
  userStore?: IUserStore
  chatStore?: IChatStore
  match?: match<any>
}
@inject('userStore', 'chatStore')
@observer
@autobind
export default class ChattingForm extends Component<Props> {
  chatSubmit (e: any) {
    e.preventDefault()
    const { insert } = this.props.chatStore!
    const frm = e.target
    const msg = frm.msg.value
    if ( msg.length === 0 ) return
    const { user: writer } = this.props.userStore!
    const reg_date = +new Date()
    console.log(this.props.match!)
    insert({idx: 0, room: 0, writer, msg, reg_date} as Message)
    frm.reset()
    frm.msg.focus()
  }
  render () {
    const { chatSubmit } = this
    return (
      <form action="" method="post" onSubmit={(e: any) => chatSubmit(e)}>
        <fieldset className="chat-form">
          <input type="text" name="msg" className="chat-form__input" />
          <button type="submit" className="chat-form__submit">전송</button>
        </fieldset>
      </form>
    )
  }
  }