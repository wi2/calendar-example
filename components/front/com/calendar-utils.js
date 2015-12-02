"use strict";

import React, {Component} from 'react';
import {Link} from 'react-router';
import Agenda from '../lib/agenda'

export class Vertical extends Component {
  render() {
    return <div className={this.props.className||"agenda-vertical"}>{this.props.children}</div>
  }
}

export class Row extends Component {
  render() {
    return <div className={this.props.className||"agenda-row"}>{this.props.children}</div>
  }
}

export class Cell extends Component {
  _handleClick(e) {
    e.preventDefault()
    if (this.props.toggleSelection) this.props.toggleSelection()
  }
  _handleOver(e) {
    e.preventDefault()
    if (this.props.moveSelection) this.props.moveSelection()
  }
  render() {
    return (
      <div className={this.props.className} style={{height: this.props.height}}
           onClick={this._handleClick.bind(this)}
           onMouseOver={this._handleOver.bind(this)}>
        <div className="col-content">{this.props.value}</div>
      </div>
    )
  }
}

export class Navigation extends Component {
  render() {
    let store = this.props.store
      , {prevLink, nextLink, todayLink, dayLink, monthLink, weekLink} = this.props.agenda.getLink(this.props.view)
      , className = this.props.editor ? "btn btn-success" : "btn"

    return (
      <div>
        <Row>
          <div className="agenda-navigation-editor">
            <button className={className+" btn-editor"}
              onClick={this.props.toggleEditor.bind(this)}>Editor</button>
          </div>
          <div className="agenda-navigation-view">
            <Link to={monthLink}>Month</Link>
            <Link to={weekLink}>Week</Link>
            <Link to={dayLink}>Day</Link>

          </div>
        </Row>
        <Row className="agenda-navigation">
          <Link to={prevLink}>Previous</Link>
          <Link to={todayLink}>Today</Link>
          <Link to={nextLink}>Next</Link>
        </Row>
      </div>
    )
  }
}

export class Header extends Component {
  render() {
    let days = this.props.agenda.getDays()
      , view = this.props.view
    return (
      <Row className="agenda-row agenda-header">
        {view === 'day'
          && <Cell value={this.props.day} className="col-label" />}
        {view !== 'day'
          && days.map((day, i) => <Cell value={day} className="col-label" key={`${day}-${i}`} />)}
        {view === 'week'
          && this.props.store.map((date, i) => {
          let props = {
            value: `${date[0].date.getDate()}/${date[0].date.getMonth()+1}`,
            className: "col-label",
            key: `${date}-${i}`
          }
          return <Cell {...props} />
        })}
      </Row>
    )
  }
}

export class Info extends Component {
  _handlePrevious(e) {
    e.preventDefault()
    this.props.onPrevious(this.props.info)
  }
  _handleNext(e) {
    e.preventDefault()
    this.props.onNext(this.props.info)
  }
  shouldComponentUpdate(props, state) {
    return props.info.y !== this.props.info.y || props.info.m !== this.props.info.m || props.info.d !== this.props.info.d
  }

  render() {
    return (
      <Row className="agenda-row agenda-info">
        {this.props.onPrevious && <a onClick={this._handlePrevious.bind(this)} className="btn">{"<"}</a>}
        {this.props.view !== 'month' && <span>{this.props.info.d}</span>}
        <span>{this.props.info.m}</span>
        <span>{this.props.info.y}</span>
        {this.props.onNext && <a onClick={this._handleNext.bind(this)} className="btn">{">"}</a>}
      </Row>
    )
  }
}
