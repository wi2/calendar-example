"use strict";

import React, {Component} from 'react';
import Agenda from '../lib/agenda'
import {Header, Navigation, Vertical, Row, Cell, Info} from './calendar-utils'

export default class extends Component {
  componentDidMount() {
    this.agenda = new Agenda(this.props.year, this.props.month, this.props.day, this.props.hour)
    this.agenda.setException(this.props.except||[]);
    let view = this.props.day ? "week" : "month";
    view = this.props.view||view;
    this.update(view, true);
  }

  componentWillReceiveProps(props) {
    this.agenda.changeDate(props.year, props.month, props.day, props.hour)
    let view = props.day ? "week" : "month";
    view = props.view||view;
    this.update(view, true);
  }

  onPrevious(date) {
    this.agenda.changeDate(this.state.link.previous.y, this.state.link.previous.m, this.state.link.previous.d)
    this.update(this.state.view);
  }
  onNext(date) {
    this.agenda.changeDate(this.state.link.next.y, this.state.link.next.m, this.state.link.next.d)
    this.update(this.state.view);
  }

  _onSelect(val) {
    this.props.onSelect(val)
  }
  _toggleView() {
    this.update(this.state.view === 'month' ? 'week' : 'month')
  }

  update(view, withCurrent) {
    let info = this.agenda.getInfo(view)
      , link = this.agenda.getLinkHelper(view)
      , store = this.agenda.matrix(view)
      , current = new Date(link.current.y, link.current.month, link.current.d, link.current.h);

    let value = { store, info, link, view }

    if (withCurrent)
      value.current = current;
    this.setState(value);
  }

  render() {
    let height = 30;
    return (
      <div className="date-picker">
        {this.state
          && <Info info={this.state.info}
                   onPrevious={this.onPrevious.bind(this)}
                   onNext={this.onNext.bind(this)} />}
        {this.state
          && <Header view={this.state.view} store={this.state.store} agenda={this.agenda} />}
        {this.props.toggle
          && <Row><a onClick={this._toggleView.bind(this)} className="btn">toggle view</a></Row>}
        <Row>
          {this.state
            && this.state.store.map((line, j) => {
            if (this.state.view === 'month')
              return line.map((item, i) => {
                let cond = this.agenda.compare(this.state.current, item.date)
                let props = {
                  height,
                  value: item.day,
                  className: cond ? 'col-day col-day-active':'col-day',
                  disabled: item.disabled,
                  toggleSelection: this._onSelect.bind(this, item),
                  key: 'cell-'+j+'-'+i+this.props.name
                }
                if (item.disabled) {
                  delete props.toggleSelection;
                  props.className = "col-day col-day-disabled";
                }
                return <Cell {...props} />
              })
            else
              return (
                <Vertical key={`vertical-${j}-${this.props.name}`}>
                  {line.map((item, i) => {
                    let cond = this.agenda.compare(this.state.current, item.date, true)
                    let props = {
                      height,
                      value: item.day +" "+item.hour,
                      className: cond ? 'col-day col-day-active':'col-day',
                      disabled: item.disabled,
                      toggleSelection: this._onSelect.bind(this, item),
                      key: 'cell-'+j+'-'+i+this.props.name
                    }
                    if (item.disabled) {
                      delete props.toggleSelection;
                      props.className = "col-day col-day-disabled";
                    }
                    return <Cell {...props} />
                  })}
                </Vertical>
              )
          })}
        </Row>
      </div>
    )
  }
}




