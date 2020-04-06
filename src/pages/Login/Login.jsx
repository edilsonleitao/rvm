import React from "react";
import { Formik, Form } from "formik";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { Main, Componentes, Logo, Input, Copyrigths, Entrar } from "./styles";

import { BASE_URL } from "../../constants";

import { login } from "../../services/auth";

export default () => {
  const history = useHistory();

  const initialValues = { usuario: "", senha: "", manterSessao: false };

  const onValidate = (values) => {
    const errors = {};
    if (!values.usuario) {
      errors.usuario = "Obrigatório";
    }
    if (!values.senha) {
      errors.senha = "Obrigatória";
    }
    return errors;
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const { usuario, senha, manterSessao } = values;

    const { token, error } = await login({ usuario, senha, manterSessao });

    if (error) alert(`Código: ${error.status} - Mensagem: ${error.error}`);

    setSubmitting(false);
    if (token) {
      history.replace({
        pathname: `${BASE_URL}/formularios`,
        state: { fetchRemote: true, token },
      });
    }
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
                    disabled={isSubmitting}
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
