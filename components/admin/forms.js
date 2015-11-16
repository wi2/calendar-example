"use strict";

import React from 'react'
import {Container, Row, Field} from 'newforms-bootstrap'

export const room = (
  <Container autoColumns="md">
    <h1>Room</h1>
    <hr />
    <p className="text-right">
      <button className="btn btn-default">Save</button>
    </p>
    <Row>
      <Field name="name" md="8"/>
      <Field name="color"/>
    </Row>
    <Row>
      <Field name="description"/>
    </Row>
  </Container>
);

export const event = (
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

export const image = (
  <Container autoColumns="md">
    <h1>special Image</h1>
    <hr />
    <p className="text-right">
      <button className="btn btn-default">Save</button>
    </p>
    <Row>
      <Field name="title" />
    </Row>
    <Row>
      <Field name="small" md="4" />
      <Field name="medium" md="4" />
      <Field name="big"/>
    </Row>
  </Container>
);