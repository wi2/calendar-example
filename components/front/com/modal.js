"use strict";

import React, {Component} from 'react';
import _ from 'lodash'
import {RenderForm, Form, Textarea, CharField, RegexField, SlugField, EmailField, URLField, FilePathField, GenericIPAddressField, ChoiceField, DateField, DateTimeField, BooleanField, IntegerField, FloatField, FileField, MultipleFileField, ImageField} from 'newforms'
import BootstrapForm, {Container, Row, Col, Field} from 'newforms-bootstrap'
import DateTimePicker from './date-time-picker'

export default class extends Component {
  constructor(props) {
    super(props)
    let startDate = this.props.start.date ? this.props.start.date : new Date(this.props.start)
      , endDate = this.props.end.date ? this.props.end.date : new Date(this.props.end)
      , startExcept = [...this.props.except]
      , endExcept = [...this.props.except]

    startExcept.push({
      start: endDate,
      end: new Date(new Date(endDate).setYear(2020))
    })
    endExcept.push({
      start: new Date(new Date(startDate).setYear(2000)),
      end: startDate
    })

    this.state = {
      startPicker: { show: false, date: startDate, except: startExcept },
      endPicker: { show: false, date: endDate, except: endExcept }
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
  onFormChange() {
    this.forceUpdate()
  }

  _showDatePicker(e) {
    e.preventDefault()
    this.changeDate(new Date(e.target.value), e.target.name)
  }

  changeDate(date, name, toggle=true) {
    let common = {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      name: name,
    }
      , startPicker = this.state.startPicker
      , endPicker = this.state.endPicker

    if (name === "start") {
      _.extend(startPicker, common)
      endPicker.except = [...this.props.except]
      endPicker.except.push({
        start: new Date(new Date(date).setYear(2000)),
        end: date
      })

    } else {
      _.extend(endPicker, common)
      startPicker.except = [...this.props.except]
      startPicker.except.push({
        start: date,
        end: new Date(new Date(date).setYear(2020))
      })
    }

    if (toggle) {
      if (name === "start") startPicker.show = !this.state.startPicker.show
      else if (name === "end") endPicker.show = !this.state.endPicker.show
    }
    this.setState({startPicker, endPicker})

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
   _onDelete(e) {
    e.preventDefault();
    let form = this.mForm.getForm()
    this.props.onDelete(this.props.id)
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
            <h1>
              Add event
              <span className="float-right">
                <button className="btn btn-default" onClick={this._onSubmit.bind(this)}>Save</button>
                <button className="btn btn-default" onClick={this._onCancel.bind(this)}>Cancel</button>
                <button className="btn btn-default" onClick={this._onDelete.bind(this)}>Delete</button>
              </span>
            </h1>
            <hr />
            <Row>
              <Field name="title" md="8"/>
              <Field name="room"/>
            </Row>
            <Row>
              <Field name="content"/>
            </Row>
            <Row>
              <Col md="6">
                {this.state.startPicker.show &&
                  <DateTimePicker {...this.state.startPicker} onSelect={this._onSelectStart.bind(this)}  />}
              </Col>
              <Col>
                {this.state.endPicker.show &&
                  <DateTimePicker {...this.state.endPicker} onSelect={this._onSelectEnd.bind(this)}  />}
              </Col>
            </Row>
            <Row>
              <Field name="start" md="6" />
              <Field name="end" />
            </Row>
          </Container>
        </RenderForm>
      </form>
    )
  }
}
