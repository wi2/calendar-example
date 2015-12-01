"use strict";

import React, {Component} from 'react';
import _ from 'lodash';
import {RenderForm, Form, ChoiceField, MultipleChoiceField, CheckboxSelectMultiple, DateTimeField, BooleanField, IntegerField} from 'newforms'
import BootstrapForm, {Container, Row, Col, Field} from 'newforms-bootstrap'
import DatePicker from './date-picker'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.createForm()
  }

  createForm() {
    let MyForm = Form.extend({
      room: MultipleChoiceField({
        widget: CheckboxSelectMultiple,
        choices: this.props.rooms.map(r => [r.id, r.name]),
        initial: this.props.rooms.map(r => r.id)
      }),
      limit: ChoiceField({
        choices: [10, 50, 100, 200, 500],
        initial: this.props.limit
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
          </Container>
        </RenderForm>
      </form>
    )
  }}
