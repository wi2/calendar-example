"use strict";

import React, {Component} from 'react';
import _ from 'lodash';
import {RenderForm, Form, ChoiceField, MultipleChoiceField, CheckboxSelectMultiple, DateTimeField, BooleanField, IntegerField} from 'newforms'
import BootstrapForm, {Container, Row, Col, Field} from 'newforms-bootstrap'
import Agenda from '../lib/agenda'

export default class extends Component {
  constructor(props) {
    super(props)
    console.log(this.props)

    this.state = {
      startPicker: { show: false },
      endPicker: { show: false }
    }
    this.createForm()
    // this.agenda = new Agenda()
  }

  createForm() {
    let MyForm = Form.extend({
      room: MultipleChoiceField({
        widget: CheckboxSelectMultiple,
        choices: this.props.rooms.map(r => [r.id, r.name]),
        initial: this.props.rooms.map(r => r.id)
      }),
      limit: ChoiceField({
        choices: [10, 50,100,200,500],
        initial: this.props.limit
      }),
      start: DateTimeField({
        required: false,
        // initial: this.props.start.date ? this.props.start.date : new Date(this.props.start),
        // widgetAttrs: { onClick: this._showDatePicker.bind(this) }
      }),
      end: DateTimeField({
        required: false,
        // initial: this.props.end.date ? this.props.end.date : new Date(this.props.end),
        // widgetAttrs: { onClick: this._showDatePicker.bind(this) }
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

  _onSubmit(e) {
    e.preventDefault();
    let form = this.mForm.getForm()
    if(form.validate()) {
      let cleanedData = _.clone(form.cleanedData)
      if (cleanedData.start === null) delete cleanedData.start;
      if (cleanedData.end === null) delete cleanedData.end;
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
                  <DateTimePicker {...this.state.startPicker} onSelect={this._onSelectStart.bind(this)}  />}
              </Col>
              <Col>
                {this.state.endPicker.show &&
                  <DateTimePicker {...this.state.endPicker} onSelect={this._onSelectEnd.bind(this)}  />}
              </Col>
            </Row>
          </Container>
        </RenderForm>
      </form>
    )
  }}
