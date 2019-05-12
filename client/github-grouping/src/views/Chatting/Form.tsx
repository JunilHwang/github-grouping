import React, { Component } from 'react'

export default class ChattingForm extends Component {
  render () {
    return (
      <form action="" method="post">
        <fieldset className="chat-form">
          <input type="text" className="chat-form__input" />
          <button type="submit" className="chat-form__submit">전송</button>
        </fieldset>
      </form>
    )
  }
}