import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { Formik, Form } from "formik";
import { TextField } from "@material-ui/core";
import Header from "../../components/Header";
import FormikDebugger from "../../components/FormikDebugger";
import { buscaFormulario } from "../../services/formularios";
import ProgressBar from "../../components/ProgressBar";

import { BASE_URL, FORM_NAVEG } from "../../constants";

import {
  Container,
  StyledCard,
  CardTitle,
  ButtonContainer,
  Btn,
} from "./styles";

const Formulario = () => {
  const history = useHistory();
  const { state } = useLocation();

  const token = state && state.token;

  const { id } = useParams();

  const [tituloHeader, setTituloHeader] = useState();
  const [acaoNavegacaoForm, setAcaoNavegacaoForm] = useState();
  const [initialValues, setInitialValues] = useState({});
  const [agrupamentos, setAgrupamentos] = useState([]);
  const [agrupamentoAtual, setAgrupamentoAtual] = useState({});
  const [indexAgrupamentoAtual, setIndexAgrupamentoAtual] = useState(0);
  const [primeiroAgrupamento, setPrimeiroAgrupamento] = useState(false);
  const [ultimoAgrupamento, setUltimoAgrupamento] = useState(false);
  const [percentual, setPercentual] = useState(0);

  const buscaAgrupamentosDoForm = async (id) => {
    try {
      const { agrupamentos, beneficiario } = await buscaFormulario(id);
      setAgrupamentos(agrupamentos || []);
      defineAgrupamentoCorrente(agrupamentos);
      setTituloHeader(beneficiario);
    } catch (e) {
      console.error(e.stack);
    }
  };

  const defineAgrupamentoCorrente = (agrupamentos, index = 0) => {
    let agrupamento = agrupamentos[index];

    if (!agrupamento)
      throw new Error(
        `Ocorreu um erro ao buscar o agrupamento de perguntas. Índice: ${index}!`
      );

    setIndexAgrupamentoAtual(index);
    setPrimeiroAgrupamento(index === 0 ? true : false);
    setUltimoAgrupamento(index === agrupamentos.length - 1 ? true : false);
    setAgrupamentoAtual(agrupamento);
    setPercentual((100 / agrupamentos.length) * index);
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
      initialValues[nome] = valor || "";
      return null;
    });
    setInitialValues(initialValues);
    window.scrollTo(0, 0);
  }, [agrupamentoAtual]);

  /**
   * Será validado no requisito 4191508
   */
  const onValidate = (values) => {
    // const errors = {};
    // if (!values.nome) {
    //   errors.nome = "Required";
    // }
    // return errors;
  };

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    console.log(JSON.stringify(values, null, 2));

    //TODO: Gravar alterações no banco

    //Volta para a Lista
    if (!ultimoAgrupamento || acaoNavegacaoForm === FORM_NAVEG.BACK) {
      let sentidoNavegacao = acaoNavegacaoForm === FORM_NAVEG.NEXT ? 1 : -1;

      defineAgrupamentoCorrente(
        agrupamentos,
        indexAgrupamentoAtual + sentidoNavegacao
      );
    }

    resetForm();
    setSubmitting(false);

    if (ultimoAgrupamento && acaoNavegacaoForm === FORM_NAVEG.NEXT) {
      history.replace({
        pathname: `${BASE_URL}/formularios`,
        state: { fetchRemote: true, token },
      });
    }
  };

  return (
    <Container>
      <Header raised path="/formularios" title={tituloHeader} token={token} />
      <main>
        <ProgressBar percent={percentual} />
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
                          variant: "outlined",
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
                  disabled={isSubmitting || primeiroAgrupamento}
                  onClick={() => {
                    setAcaoNavegacaoForm(FORM_NAVEG.BACK);
                  }}
                >
                  Anterior
                </Btn>
                <Btn
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  onClick={() => {
                    setAcaoNavegacaoForm(FORM_NAVEG.NEXT);
                  }}
                >
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
