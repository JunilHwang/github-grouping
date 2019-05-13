import React, { Component, ReactChildren } from 'react'
import { match } from 'react-router';

type Props = {
  match: match<any>
}

export default class Guide extends Component<Props> {
  render () {
    const { step } = this.props.match.params
    switch (~~step) {
      case 1 :
        return (
          <div className="guide">
            <h2 className="guide__title">저장소 만들기</h2>
          </div>
        )
    }
  }
}