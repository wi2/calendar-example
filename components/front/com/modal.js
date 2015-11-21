"use strict";

import React, {Component} from 'react';
import _ from 'lodash'
import {RenderForm, Form, Textarea, CharField, RegexField, SlugField, EmailField, URLField, FilePathField, GenericIPAddressField, ChoiceField, DateField, DateTimeField, BooleanField, IntegerField, FloatField, FileField, MultipleFileField, ImageField} from 'newforms'
import BootstrapForm, {Container, Row, Col, Field} from 'newforms-bootstrap'
import Agenda from '../lib/agenda'
import Calendar from './calendar'
import {DatePicker} from './date-picker'


export default class extends Component {
  constructor(props) {
    super(props)
    let now;
    this.state = {
      startPicker: { show: false, date: now },
      endPicker: { show: false, date: now }
    }
    this.createForm()
  }

  createForm() {
    let MyForm = Form.extend({
      title: CharField({initial: this.props.title||''}),
      content: CharField({
        required: false,
        widget: Textarea,
        initial: this.props.content||''
      }),
      room: ChoiceField({
        choices: this.props.rooms.map(r => [r.id, r.name]),
        initial: this.props.room ? this.props.room.id : this.props.rooms[0].id
      }),
      start: DateTimeField({
        initial: this.props.start.date ? this.props.start.date : new Date(this.props.start),
        widgetAttrs: { onClick: this._showDatePicker.bind(this) }
      }),
      end: DateTimeField({
        initial: this.props.end.date ? this.props.end.date : new Date(this.props.end),
        widgetAttrs: { onClick: this._showDatePicker.bind(this) }
      })
    })
    this.form = new MyForm({
      controlled: true,
      onChange: this.onFormChange.bind(this),
      validation: 'auto'
    })
  }
  onFormChange(e) {
    this.forceUpdate()
  }

  _showDatePicker(e) {
    e.preventDefault()
    let date = new Date(e.target.value)
    this.changeDate(date, e.target.name)
  }

  changeDate(date, name, toggle=true) {
    let common = {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      hour: date.getHours(),
      name: name,
      except: this.props.except||[]
    }
    this.setState(
      name === 'start' ?
      {startPicker: _.extend({
        show: toggle ? !this.state.startPicker.show : this.state.startPicker.show,
        view: "month"
      }, common)}
      :
      {endPicker: _.extend({
        show: toggle ? !this.state.endPicker.show : this.state.startPicker.show,
        view: "week"
      }, common)})
  }
  _onSelectStart(val) {
    let form = this.mForm.getForm()
      , start = new Date(val.date)
    form.updateData({ start })
    this.changeDate(start, "start")
  }

  _onSelectEnd(val) {
    let form = this.mForm.getForm()
      , end = new Date(val.date)
    form.updateData({ end })
    this.changeDate(end, "end")
  }

  _onSubmit(e) {
    e.preventDefault();
    let form = this.mForm.getForm()
    if(form.validate())
      this.props.onSubmit(form.cleanedData, this.props.id)
  }
  _onCancel(e) {
    e.preventDefault();
    this.props.onCancel()
  }
  render() {
    return (
      <form encType="multipart/form-data" className="agenda-modal">
        <RenderForm form={this.form} ref={(ref) => this.mForm = ref}>
          <Container autoColumns="md">
            <h1>Event</h1>
            <hr />
            <p className="text-right">
              <button className="btn btn-default" onClick={this._onSubmit.bind(this)}>Save</button>
              <button className="btn btn-default" onClick={this._onCancel.bind(this)}>Cancel</button>
            </p>
            <Row>
              <Field name="title" md="8"/>
              <Field name="room"/>
            </Row>
            <Row>
              <Field name="content"/>
            </Row>
            <Row>
              <Field name="start" md="6" />
              <Field name="end" />
            </Row>
            <Row>
              <Col md="6">
                {this.state.startPicker.show &&
                  <DatePicker {...this.state.startPicker} onSelect={this._onSelectStart.bind(this)}  />}
              </Col>
              <Col>
                {this.state.endPicker.show &&
                  <DatePicker {...this.state.endPicker} onSelect={this._onSelectEnd.bind(this)}  />}
              </Col>
            </Row>
          </Container>
        </RenderForm>
      </form>
    )
  }
}
