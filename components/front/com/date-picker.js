"use strict";

import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import Agenda from '../lib/agenda'
import {Header, Navigation, Vertical, Row, Cell, Info} from './calendar-utils'


class ViewDefault extends Component {
  constructor(props) {
    super(props)
    this.agenda = new Agenda()
  }
}

export class DatePicker extends ViewDefault {
  componentDidMount() {
    this.agenda = new Agenda(this.props.year, this.props.month, this.props.day, this.props.hour)
    let view = this.props.day ? "week" : "month";
    view = this.props.view||view

    let store = this.agenda.matrix(view)
      , info = this.agenda.getInfo(view)
      , link = this.agenda.getLinkHelper(view)
      , current = new Date(link.current.y, link.current.month, link.current.d, link.current.h)

    this.setState({
      store,
      info,
      link,
      view,
      current
    });
  }

  componentWillReceiveProps(props) {
    this.agenda.changeDate(props.year, props.month, props.day, props.hour)
    let view = props.day ? "week" : "month";
    view = props.view||view

    let store = this.agenda.matrix(view)
      , info = this.agenda.getInfo(view)
      , link = this.agenda.getLinkHelper(view)
      , current = new Date(link.current.y, link.current.month, link.current.d, link.current.h)

    this.setState({
      store,
      info,
      link,
      view,
      current
    });

  }
  onPrevious(date) {

    this.agenda.changeDate(this.state.link.previous.y, this.state.link.previous.m, this.state.link.previous.d)

    let view = this.state.view
      , store = this.agenda.matrix(view)
      , info = this.agenda.getInfo(view)
      , link = this.agenda.getLinkHelper(view)

    this.setState({
      store,
      info,
      link,
      view,
    });

  }
  onNext(date) {

    this.agenda.changeDate(this.state.link.next.y, this.state.link.next.m, this.state.link.next.d)

    let view = this.state.view
      , store = this.agenda.matrix(view)
      , info = this.agenda.getInfo(view)
      , link = this.agenda.getLinkHelper(view)


    this.setState({
      store,
      info,
      link,
      view,
    });

  }
  _onSelect(val) {
    this.props.onSelect(val)
  }

  render() {
    return (
      <div>
        {this.state && <Info info={this.state.info}
          onPrevious={this.onPrevious.bind(this)}
          onNext={this.onNext.bind(this)} />}
        {this.state && <Header view={this.state.view} store={this.state.store} />}
        <Row>
          {this.state
            && this.state.store.map((line, j) => {
            if (this.state.view === 'month')
              return line.map((item, i) => {
                let cond = this.agenda.compare(this.state.current, item.date)
                let props = {
                  height: 30,
                  value: item.day,
                  className: cond ? 'col-day col-day-active':'col-day',
                  key: 'cell-'+j+'-'+i+this.props.name
                }
                return <Cell {...props} toggleSelection={this._onSelect.bind(this, item)} />
              })
            else
              return (
                <Vertical key={`vertical-${j}-${this.props.name}`}>
                  {line.map((item, i) => {
                    let cond = this.agenda.compare(this.state.current, item.date, true)
                    let props = {
                      height: 30,
                      value: item.day +" "+item.hour,
                      className: cond ? 'col-day col-day-active':'col-day',
                      key: 'cell-'+j+'-'+i+this.props.name
                    }
                    return <Cell {...props} toggleSelection={this._onSelect.bind(this, item)} />
                  })}
                </Vertical>
              )
          })}
        </Row>
      </div>
    )
  }
}




