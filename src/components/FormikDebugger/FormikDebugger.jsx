import React from "react";
import { FormikConsumer } from "formik";
import { Container, Title, Body } from "./styles";

export default () => (
  <Container>
    <Title>Formik Debugger</Title>
    <FormikConsumer>
      {({ validationSchema, validate, onSubmit, ...rest }) => (
        <Body>{JSON.stringify(rest, null, 2)}</Body>
      )}
    </FormikConsumer>
  </Container>
);
