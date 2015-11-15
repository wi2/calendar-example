"use strict";

import React, {Component, cloneElement} from 'react';
import {RenderForm, Form, Textarea, CharField, RegexField, SlugField, EmailField, URLField, FilePathField, GenericIPAddressField, ChoiceField, DateField, DateTimeField, BooleanField, IntegerField, FloatField, FileField, MultipleFileField, ImageField} from 'newforms'
import BootstrapForm, {Container, Row, Field} from 'newforms-bootstrap'

export default class extends Component {
  constructor(props) {
    super(props)
    this.form = Form.extend({
      title: CharField(),
      content: CharField({widget: Textarea}),
      room: ChoiceField(),
      start: DateTimeField(),
      end: DateTimeField()
    })
  }

  _onSubmit(e) {
    e.preventDefault();
    let form = this.mForm.getForm()
    if(form.validate())
      console.log("Saving", form.cleanedData)
  }
  render() {
    return (
      <form onSubmit={this._onSubmit.bind(this)} encType="multipart/form-data">
        <RenderForm form={this.form} ref={(ref) => this.mForm = ref}>
          {cloneElement(mView)}
        </RenderForm>
      </form>
    )
  }
}


const mView = (
  <Container autoColumns="md">
    <h1>Event</h1>
    <hr />
    <p className="text-right">
      <button className="btn btn-default">Save</button>
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
);
