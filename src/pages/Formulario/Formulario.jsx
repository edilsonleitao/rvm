import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { TextField } from "@material-ui/core";
import { get } from "../../databases/formularios";
import Header from "../../components/Header";
import FormikDebugger from "../../components/FormikDebugger";

import {
  Container,
  StyledCard,
  CardTitle,
  ButtonContainer,
  Btn
} from "./styles";

const Formulario = () => {
  const { id } = useParams();

  const [tituloHeader, setTituloHeader] = useState();
  const [initialValues, setInitialValues] = useState({});
  const [agrupamentos, setAgrupamentos] = useState([]);
  const [agrupamentoAtual, setAgrupamentoAtual] = useState({});
  const [primeitoAgrupamento, setPrimeitoAgrupamento] = useState(false);
  const [ultimoAgrupamento, setUltimoAgrupamento] = useState(false);

  const buscaAgrupamentosDoForm = async id => {
    try {
      const { agrupamentos, beneficiario } = await get(id);
      setAgrupamentos(agrupamentos || []);
      defineAgrupamentoCorrente(1, agrupamentos);
      setTituloHeader(beneficiario);
    } catch (e) {
      console.error(e.stack);
    }
  };

  const defineAgrupamentoCorrente = (idAgrup, agrupamentos) => {
    let [agrupamento] = agrupamentos.filter(({ id }) => id == idAgrup);
    if (!agrupamento)
      throw new Error(
        `Ocorreu um erro ao buscar o agrupamento de perguntas de ID: ${idAgrup}!`
      );

    // substituir por identificadores do primeiro
    // e ultimo agrupamento conforme backend
    setPrimeitoAgrupamento(idAgrup == 1 ? true : false);
    setUltimoAgrupamento(idAgrup == 100 ? true : false);

    setAgrupamentoAtual(agrupamento);
  };

  /**
   * Define agrupamentos de perguntas por questionário
   */
  useEffect(() => {
    buscaAgrupamentosDoForm(id);
  }, []);

  /**
   * Define initial values do form por agrupamento
   * Sempre que o agrupamento atual for atualizado,
   * um novo initialValues deverá ser gerado
   */
  useEffect(() => {
    if (!agrupamentoAtual.perguntas) return;

    let initialValues = {};
    agrupamentoAtual.perguntas.map(({ nome, valor }) => {
      initialValues[nome] = valor;
    });
    setInitialValues(initialValues);
  }, [agrupamentoAtual]);

  /**
   * Será validado no requisito 4191508
   */
  const onValidate = values => {
    // const errors = {};
    // if (!values.nome) {
    //   errors.nome = "Required";
    // }
    // return errors;
  };

  const onSubmit = (values, { setSubmitting }) => {
    console.log(JSON.stringify(values, null, 2));
    setSubmitting(false);
  };

  return (
    <Container>
      <Header raised path="/formularios" title={tituloHeader} />
      <main>
        <Formik
          initialValues={initialValues}
          validate={onValidate}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ isSubmitting, getFieldProps, getFieldMeta }) => (
            <Form>
              <StyledCard>
                <CardTitle>{agrupamentoAtual.nome}</CardTitle>
                {agrupamentoAtual.perguntas &&
                  agrupamentoAtual.perguntas.map(
                    ({ id, tipo, valor, nome }) => (
                      <TextField
                        key={id}
                        label={
                          getFieldMeta(nome).touched && getFieldMeta(nome).error
                            ? `${nome} (${getFieldMeta(nome).error})`
                            : `${nome}`
                        }
                        id={nome}
                        margin="normal"
                        multiline
                        disabled={isSubmitting || tipo === "hrp"}
                        value={valor || getFieldProps(nome).valor}
                        InputLabelProps={{
                          shrink: true,
                          variant: "outlined"
                        }}
                        fullWidth
                        {...getFieldProps(nome)}
                        error={
                          getFieldMeta(nome).touched &&
                          !!getFieldMeta(nome).error
                        }
                      />
                    )
                  )}
              </StyledCard>
              <ButtonContainer>
                <Btn
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting || primeitoAgrupamento}
                >
                  Anterior
                </Btn>
                <Btn type="submit" variant="contained" disabled={isSubmitting}>
                  {ultimoAgrupamento ? "Enviar" : "Próximo"}
                </Btn>
              </ButtonContainer>
              {(!process.env.NODE_ENV ||
                process.env.NODE_ENV === "development") && <FormikDebugger />}
            </Form>
          )}
        </Formik>
      </main>
    </Container>
  );
};

export default Formulario;
