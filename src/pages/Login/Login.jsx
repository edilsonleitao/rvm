import React from "react";
import { Formik, Form } from "formik";
import { FormControlLabel, Checkbox } from "@material-ui/core";

import { Main, Componentes, Logo, Input, Copyrigths, Entrar } from "./styles";

export default () => {
  const initialValues = { usuario: "", senha: "", manterSessao: false };

  const onValidate = values => {
    const errors = {};
    if (!values.usuario) {
      errors.usuario = "Obrigatório";
    }
    if (!values.senha) {
      errors.senha = "Obrigatória";
    }
    return errors;
  };

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("onSubmit -> values", values);
    setSubmitting(false);
  };

  return (
    <Main>
      <Componentes>
        <Logo />

        <Formik
          initialValues={initialValues}
          validate={onValidate}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ isSubmitting, getFieldProps, getFieldMeta }) => (
            <Form style={{ width: "100%" }}>
              <Input
                id="usuario"
                label={
                  getFieldMeta("usuario").touched &&
                  getFieldMeta("usuario").error
                    ? `Usuário (${getFieldMeta("usuario").error})`
                    : `Usuário`
                }
                {...getFieldProps("usuario")}
                error={
                  getFieldMeta("usuario").touched &&
                  !!getFieldMeta("usuario").error
                }
                disabled={isSubmitting}
              />
              <Input
                id="senha"
                label={
                  getFieldMeta("senha").touched && getFieldMeta("senha").error
                    ? `Senha (${getFieldMeta("senha").error})`
                    : `Senha`
                }
                type="password"
                {...getFieldProps("senha")}
                error={
                  getFieldMeta("senha").touched && !!getFieldMeta("senha").error
                }
                disabled={isSubmitting}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    id="manterSessao"
                    color="primary"
                    {...getFieldProps("manterSessao")}
                  />
                }
                label="Manter-me logado"
              />
              <Entrar disabled={isSubmitting}>Entrar</Entrar>
            </Form>
          )}
        </Formik>

        <Copyrigths>
          {`Copyright © Salutis Tecnologia ${new Date().getFullYear()}.`}
        </Copyrigths>
      </Componentes>
    </Main>
  );
};
