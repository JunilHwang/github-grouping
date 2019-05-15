import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { IUserStore } from 'stores/UserStore';
import autobind from 'autobind-decorator';
import { Link } from 'react-router-dom';

type Props = {
  userStore?: IUserStore
}

@inject('userStore')
@observer
@autobind
export default class Grouping extends Component<Props> {
  componentDidMount() {
    const { getSuffled } = this.props.userStore!
    getSuffled()
  }
  render() {
    const { user, suffled, setSuffled, resetSuffled } = this.props.userStore!
    return (
      <div className="grouping-wrap">
        {
          user.name === 'JunilHwang'
          ? (
          <div className="btn-group">
            <a href="#!" className="btn main" onClick={setSuffled}>셔플</a>
            <a href="#!" className="btn delete" onClick={resetSuffled}>리셋</a>
          </div>
          ) : null
        }
        {suffled.map((pv, pk) => (
          <ul key={`pv${pk}}`} className="grouping">
            {pv.map((v: any, k: number) => (
              <li key={`${pk}${k}`} className={k === 0 ? 'leader' : ''} onClick={e => window.open(v.html_url)}>
                <figure className="grouping__thumbnail">
                  <img className="grouping__image" src={v.avatar_url} alt={v.name} />
                </figure>
                <p className="grouping__name">{v.name}</p>
              </li>
            ))}
          </ul>
        )) }
      </div>
    )
  }
}