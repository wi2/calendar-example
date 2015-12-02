"use strict";

import React, {Component} from 'react';
import _ from 'lodash';
import {findDOMNode} from 'react-dom';
import Agenda from '../lib/agenda'
import {Header, Navigation, Row, Info} from './calendar-utils'
import {Day, Week, Month} from './calendar-view'
import Filter from './filter';


export default class extends Component {
  constructor(props) {
    super(props)
    this.agenda = new Agenda(this.props.year, this.props.month, this.props.day)
    this.agenda.setException(this.props.except||[]);
    this.state = {
      editor: false,
      view: this.props.view,
      events: this.props.events||[],
      store: this.agenda.matrix(this.props.view),
      info: this.agenda.getInfo(),
      start: -1,
      end: -1,
      startInit: -1
    }
    if (this.props.onLoad)
      this.props.onLoad(this.props)
  }

  componentWillReceiveProps(props) {
    this.agenda.changeDate(props.year, props.month, props.day)
    this.setState({
      current: props.current||{},
      view: props.view,
      events: props.events||[],
      agenda: this.agenda,
      store: this.agenda.matrix(props.view),
      info: this.agenda.getInfo(),
    })
    this.props.onChange(props)
  }

  toggleEditor() {
    this.setState({
      editor: !this.state.editor,
      start: -1,
      end: -1,
      startInit: -1
    });
  }

  toggleSelection(val) {
    if (this.state.editor) {
      if (this.state.start !== -1) {
        let selection = this.getSmartSelection(val)
        this.setState({
          selection: selection,
          start: -1,
          end: -1,
          startInit: -1
        })
        if (this.state.view === "month") {
          selection = {
            start: _.clone(selection.start),
            end: _.clone(selection.end),
          }
          selection.end.date = new Date(selection.end.date)
          selection.end.date.setHours(23)
          selection.end.hour = 23
        }
        this.props.onSelect(selection, this.state.editor)
      } else {
        this.setState({
          startInit: val,
          start: val,
          end: val
        })
      }
    } else {
      val.view = this.state.view
      this.props.onSelect(val, this.state.editor)
    }
  }

  moveSelection(val) {
    if (this.state.start !== -1)
      this.setState(this.getSmartSelection(val))
  }

  onSelectEvent(val) {
    this.props.onSelect(val, this.state.editor)
  }

  onFilterChange(val) {
    this.props.onFilterChange(val)
  }

  getSmartSelection(b) {
    let a = this.state.startInit
    return {
      start: a.date < b.date ? a : b,
      end: a.date < b.date ? b : a
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
        onSelect: this.onSelectEvent.bind(this),
        selectionStart: this.state.start,
        selectionEnd: this.state.end,
        editor: this.state.editor,
        current: this.props.current
      };

    return (
      <div className="agenda" style={{width: this.props.width}}>
        <Filter {...this.props.filters}
                rooms={this.props.rooms}
                onChange={this.onFilterChange.bind(this)} />
        <Navigation store={store}
                    agenda={this.agenda}
                    view={view}
                    editor={this.state.editor}
                    toggleEditor={this.toggleEditor.bind(this)} />
        <Info info={this.state.info} />
        {view !== 'day' && <Header view={view} store={store} agenda={this.agenda} />}
        {view === 'week' && <Row>
              {store.map((week, j) =>
                <Week {...props}
                      week={week}
                      height={this.props.height}
                      width={this.props.width}
                      agenda={this.agenda} key={`row-${j}`} />)}
             </Row>}
        {view === 'day' && <Day {...props}
                    week={store}
                    height={this.props.height}
                    width={this.props.width}
                    agenda={this.agenda} />}
        {view === 'month' && store.map((week, j) =>
            <Month  {...props}
                    week={week}
                    height={this.props.height}
                    width={this.props.width}
                    agenda={this.agenda} key={`row-${j}`} />)}
      </div>
    )
  }
}
