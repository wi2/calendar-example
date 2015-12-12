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

        {this.state
          && <Cases view={this.state.view}
                    store={this.state.store}
                    agenda={this.agenda}
                    current={this.state.current}
                    height={height}
                    toggleSelection={this._onSelect.bind(this)} />}

      </div>
    )
  }
}


class Cases extends Component {
  prepareProps(item) {
    let cond = this.props.agenda.compare(this.props.current, item.date)
    let props = {
      height: this.props.height,
      value: item.day,
      className: cond ? 'col-day col-day-active':'col-day',
      disabled: item.disabled,
      toggleSelection: this.props.toggleSelection.bind(this, item)
    }
    if (item.disabled) {
      delete props.toggleSelection;
      props.className = "col-day col-day-disabled";
    }
    return props;
  }

  render() {
    return (
      <Row>
          {this.props.store.map((line, j) => {
            if (this.props.view === 'month')
              return line.map((item, i) => {
                let props = this.prepareProps(item)
                return <Cell {...props} key={'cell-'+item.col+'-'+i+'-'+item.day} />
              })
            else
              return <ColCases {...this.props}
                              line={line}
                              key={'cell-column-'+j} />
          })}
      </Row>
    )
  }
}

class ColCases extends Component {
  prepareProps(item) {
    let cond = this.props.agenda.compare(this.props.current, item.date, true, true)
    let props = {
      height: this.props.height,
      value: item.minute ? "  " + item.minute : item.hour + "h ",
      className: cond ? 'col-day col-day-active':'col-day',
      disabled: item.disabled,
      toggleSelection: this.props.toggleSelection.bind(this, item)
    }
    if (item.disabled) {
      delete props.toggleSelection;
      props.className = "col-day col-day-disabled";
    }
    return props
  }

  render() {
    return (
      <Vertical>
        {this.props.line.map((item, i) => {
          let props = this.prepareProps(item)
          return <Cell {...props} key={'cell-col-'+i+'-'+item.day+'-'+item.hour} />
        })}
      </Vertical>
    )
  }
}
