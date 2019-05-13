import React, { Component } from 'react'
import { match } from 'react-router';
import Markdown from 'react-markdown'
import { guide1, guide2 } from './Guides'
import { Link } from 'react-router-dom';

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
            <Markdown source={guide1} />
            <div className="btn-group">
              <Link to="/guide/2" className="btn main">다음</Link>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="guide">
            <Markdown source={guide2} />
            <div className="btn-group">
              <Link to="/guide/1" className="btn main">이전</Link>
              <Link to="/guide/3" className="btn main">다음</Link>
            </div>
          </div>
        )
    }
  }
}