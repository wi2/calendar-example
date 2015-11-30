"use strict";

import React, {Component} from 'react';
import _ from 'lodash';
import {RenderForm, Form, ChoiceField, MultipleChoiceField, CheckboxSelectMultiple, DateTimeField, BooleanField, IntegerField} from 'newforms'
import BootstrapForm, {Container, Row, Col, Field} from 'newforms-bootstrap'
import DatePicker from './date-picker'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startPicker: { show: false },
      endPicker: { show: false }
    }
    this.createForm()
  }

  createForm() {
    let now = new Date()
    let MyForm = Form.extend({
      room: MultipleChoiceField({
        widget: CheckboxSelectMultiple,
        choices: this.props.rooms.map(r => [r.id, r.name]),
        initial: this.props.rooms.map(r => r.id)
      }),
      limit: ChoiceField({
        choices: [50,100,200,500],
        initial: this.props.limit
      }),
      start: DateTimeField({
        required: false,
        initial: new Date(now.getFullYear(), now.getMonth()-1),
        widgetAttrs: { onClick: this._showDatePicker.bind(this) }
      }),
      end: DateTimeField({
        required: false,
        initial: new Date(now.getFullYear(), now.getMonth()+1),
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
      endPicker.except = []
      endPicker.except.push({
        start: new Date(new Date(date).setYear(2000)),
        end: date
      })

    } else {
      _.extend(endPicker, common)
      startPicker.except = []
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

  _onSubmit(e) {
    e.preventDefault();
    let form = this.mForm.getForm()
    if(form.validate()) {
      let cleanedData = _.clone(form.cleanedData)
      delete cleanedData.start
      delete cleanedData.end
      // TODO: filter by range date
      // if (cleanedData.start === null) delete cleanedData.start;
      // if (cleanedData.end === null) delete cleanedData.end;
      this.props.onChange(cleanedData)
    }
  }

  render() {
    return (
      <form encType="multipart/form-data" className="agenda-filter">
        <RenderForm form={this.form} ref={ref => this.mForm = ref}>
          <Container autoColumns="md">
            <h1>Filter</h1>
            <hr />
            <p className="text-right">
              <button className="btn btn-default" onClick={this._onSubmit.bind(this)}>Save</button>
            </p>
            <Row>
              <Field name="room" md="8"/>
              <Field name="limit"/>
            </Row>
            <Row>
              <Field name="start" md="6" />
              <Field name="end" />
            </Row>
            <Row>
              <Col md="6">
                {this.state.startPicker.show &&
                  <DatePicker view="month" {...this.state.startPicker} onSelect={this._onSelectStart.bind(this)}  />}
              </Col>
              <Col>
                {this.state.endPicker.show &&
                  <DatePicker view="month" {...this.state.endPicker} onSelect={this._onSelectEnd.bind(this)}  />}
              </Col>
            </Row>
          </Container>
        </RenderForm>
      </form>
    )
  }}
