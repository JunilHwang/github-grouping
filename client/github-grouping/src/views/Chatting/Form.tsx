import React, { Component } from 'react'
import autobind from 'autobind-decorator';
import { IChatStore } from 'stores/ChatStore';
import { inject, observer } from 'mobx-react';
import { IUserStore } from 'stores/UserStore';

type Props = { chatStore?: IChatStore, userStore?: IUserStore }
@inject('chatStore', 'userStore')
@observer
@autobind
export default class ChattingForm extends Component<Props> {
  chatSubmit (e: any) {
    e.preventDefault()
    const frm = e.target
    const { post } = this.props.chatStore!
    const { user: writer } = this.props.userStore!
    const msg = frm.msg.value
    const reg_date = +new Date()
    post({ writer, msg, reg_date })
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