"use strict";

import React, {Component, cloneElement} from 'react';
import {RenderForm, Form, Textarea, SplitDateTimeWidget, CharField, RegexField, SlugField, EmailField, URLField, FilePathField, GenericIPAddressField, ChoiceField, DateField, DateTimeField, BooleanField, IntegerField, FloatField, FileField, MultipleFileField, ImageField} from 'newforms'
import BootstrapForm, {Container, Row, Field} from 'newforms-bootstrap'

export default class extends Component {
  constructor(props) {
    super(props)
    this.form = Form.extend({
      title: CharField(),
      content: CharField({widget: Textarea}),
      room: ChoiceField({choices: this.props.rooms.map((r) => [r.id, r.name])}),
      start: DateTimeField({
        widget: SplitDateTimeWidget,
        initial: this.props.start.date
      }),
      end: DateTimeField({
        widget: SplitDateTimeWidget,
        initial: this.props.end.date
      })
    })
  }

  _onSubmit(e) {
    e.preventDefault();
    let form = this.mForm.getForm()
    if(form.validate()) {
      this.props.onSubmit(form.cleanedData)
    }
  }
  _onCancel(e) {
    e.preventDefault();
    this.props.onCancel()
  }
  render() {
    return (
      <form encType="multipart/form-data">
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
          </Container>
        </RenderForm>
      </form>
    )
  }
}

