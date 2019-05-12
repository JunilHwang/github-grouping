import React, { Component } from 'react'
import autobind from 'autobind-decorator';
import { Message } from 'stores/ChatStore';
import { inject, observer } from 'mobx-react';
import { IUserStore } from 'stores/UserStore';
import { socketEmit } from 'Utils/socket';

type Props = { userStore?: IUserStore }
@inject('userStore')
@observer
@autobind
export default class ChattingForm extends Component<Props> {
  chatSubmit (e: any) {
    e.preventDefault()
    const frm = e.target
    const msg = frm.msg.value
    if ( msg.length === 0 ) return
    const { user: writer } = this.props.userStore!
    const reg_date = +new Date()
    socketEmit('chat', { writer, msg, reg_date } as Message)
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