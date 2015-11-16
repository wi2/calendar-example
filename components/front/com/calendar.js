"use strict";

import React, {Component} from 'react';
import Agenda from '../lib/agenda'
import {Header, Navigation, Row, Info} from './calendar-utils'
import {Week, Month} from './calendar-view'


export default class extends Component {
  constructor(props) {
    super(props)
    this.agenda = new Agenda(this.props.year, this.props.month, this.props.day)
    this.state = {
      view: this.props.view,
      events: this.props.events,
      store: this.agenda.matrix(),
      info: this.agenda.getInfo(),
      start: -1,
      end: -1
    }
    this.props.onLoad(this.props)
  }

  componentWillReceiveProps(props) {
    this.agenda.changeDate(props.year, props.month, props.day)
    this.setState({
      view: props.view,
      events: props.events,
      agenda: this.agenda,
      store: this.agenda.matrix(),
      info: this.agenda.getInfo(),
      start: -1,
      end: -1,
      startInit: -1
    })
    this.props.onChange(props)
  }

  toggleSelection(val) {
    if (this.state.start !== -1) {
      let selection = this.getSmartSelection(val)
      this.setState({
        selection: selection,
        start: -1,
        end: -1,
        startInit: -1
      })
      this.props.onSelect(selection)
    } else {
      this.setState({
        startInit: val,
        start: val,
        end: val
      })
    }
  }

  moveSelection(val) {
    if (this.state.start !== -1)
      this.setState(this.getSmartSelection(val))
  }

  getSmartSelection(b) {
    let a = this.state.startInit
    return {
      start: a.date <= b.date ? a : b,
      end: a.date >= b.date ? a : b
    }
  }

  render() {
    let view = this.state.view
      , events = this.state.events
      , agenda = this.state.agenda
      , store = this.state.store
      , props = {
          events: events,
          toggleSelection: this.toggleSelection.bind(this),
          moveSelection: this.moveSelection.bind(this),
          onSelect: this.props.onSelect.bind(this),
          selectionStart: this.state.start,
          selectionEnd: this.state.end
        }

    return (
      <div className="agenda">
        <Navigation store={store} agenda={this.agenda} view={view} />
        <Info info={this.state.info} />
        <Header view={view} store={store} />
        {view === 'week'
          && <Row>
              {store.map((week, j) =>
                <Week {...props}
                      week={week}
                      agenda={this.agenda} key={`row-${j}`} />)}
             </Row>}
        {view === 'month'
          && store.map((week, j) =>
            <Month  {...props}
                    week={week}
                    agenda={this.agenda} key={`row-${j}`} />)}
      </div>
    )
  }
}
