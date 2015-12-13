"use strict";

import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';
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
      startInit: -1,
      selection: {},
      color: null
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

  hexToRGB(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
  }

  toggleEditor() {
    this.setState({
      editor: !this.state.editor,
      start: -1,
      end: -1,
      startInit: -1,
      color: null
    });
  }

  toggleSelection(val, isEvent=false) {
    if (this.state.editor) {
      if (this.state.start !== -1) {
        let selection = _.extend(this.state.selection, {start: this.state.start, end: this.state.end})
        this.setState({
          selection: {},
          start: -1,
          end: -1,
          startInit: -1,
          isEvent: false
        })
        if (this.state.view === "month") {
          selection = {
            start: _.clone(selection.start),
            end: _.clone(selection.end),
            isEvent: _.clone(selection.isEvent),
          }
          selection.end.date = new Date(selection.end.date)
          selection.end.date.setHours(23)
          selection.end.date.setMinutes(45)
          selection.end.hour = 23
          selection.end.minute = 45
        }
        this.props.onSelect(selection.isEvent ? _.extend({}, selection.isEvent, selection) : selection, this.state.editor)
      } else {
        let color = null;
        if (isEvent) {
          let colorRGB = this.hexToRGB(isEvent.room.color)
          color = `rgba(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b}, 0.5)`
        }
        this.setState({
          startInit: val,
          start: val,
          end: val,
          selection: {isEvent},
          color: color,
        })
      }
    } else {
      val.view = this.state.view
      this.props.onSelect(val, this.state.editor)
    }
  }

  moveSelection(val) {
    let updateState = true
    if (this.state.start !== -1) {
      let selection = this.getSmartSelection(val)
      if (this.props.limitDay && selection.start.date.getDate() !== selection.end.date.getDate())
          updateState = false
      if (updateState)
        this.setState(selection)
    }
  }

  onSelectEvent(val) {
    if ((val.member && val.member.id === this.props.me.id) || this.props.me.role.name === 'admin'){
      val.date = new Date(val.start);
      this.props.onSelect(val, this.state.editor)
    }
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
        selectionColor: this.state.color,
        editor: this.state.editor,
        current: this.props.current
      };

    return (
      <Motion defaultStyle={{left:1500, width: 1500}} style={{left: spring(0, [120, 20]), width: spring(this.props.width||1500, [120, 20])}}>
        {value =>

        <div className={"agenda"+(this.state.editor && !this.state.selection.isEvent ? " edition":"")} style={{width: value.width, marginLeft: value.left}}>
          <Filter {...this.props.filters}
                  rooms={this.props.rooms}
                  onChange={this.onFilterChange.bind(this)} />
          <Navigation store={store}
                      agenda={this.agenda}
                      view={view}
                      editor={this.state.editor}
                      toggleEditor={this.toggleEditor.bind(this)} />
          <Info info={this.state.info} view={view} />
          {view !== 'day' && <Header view={view} store={store} agenda={this.agenda} />}
          {view === 'week' && <Row>
                {store.map((week, j) =>
                  <Week {...props}
                        week={week}
                        height={this.props.height}
                        width={this.props.width}
                        agenda={this.agenda} key={`row-${j}`} />)}
               </Row>}
          {view === 'day' && <Row><Day {...props}
                      week={store}
                      height={this.props.height}
                      width={this.props.width}
                      agenda={this.agenda} /></Row>}
          {view === 'month' && store.map((week, j) =>
              <Month  {...props}
                      week={week}
                      height={this.props.height}
                      width={this.props.width}
                      agenda={this.agenda} key={`row-${j}`} />)}
        </div>}
      </Motion>
    )
  }
}
