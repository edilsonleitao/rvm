import React, { useState, useEffect } from "react";
import { Container } from "./styles";
import Pullable from "react-pullable";
import Header from "../../components/Header";
import { List, ListItem } from "@material-ui/core";
import CardBeneficiario from "../../components/CardBeneficiario";
import { useHistory, useLocation } from "react-router-dom";
import fetchForms from "../../services/formularios";

import { BASE_URL } from "../../constants";

const FormList = () => {
  const history = useHistory();
  const { state } = useLocation();
  const fetchRemote = state && state.fetchRemote;

  const [formularios, setFormularios] = useState([]);

  async function fetchFormulario(remote) {
    const data = await fetchForms(remote);
    setFormularios(data);
  }

  useEffect(() => {
    fetchFormulario(fetchRemote);
  }, []);

  const handleClickCard = item => {
    const { id } = item;
    history.replace(`${BASE_URL}/formulario/${id}`);
  };

  const handlePull = () => {
    fetchFormulario(true);
  };

  return (
    <Container>
      <header>
        <Header elevation={0} btnMenu title="Relatório de Visita Médica" />
      </header>
      <main>
        <Pullable onRefresh={handlePull}>
          <List>
            {formularios.map(item => (
              <div key={item.id}>
                <ListItem
                  button
                  onClick={() => {
                    handleClickCard(item);
                  }}
                >
                  <CardBeneficiario questionario={item} />
                </ListItem>
              </div>
            ))}
          </List>
        </Pullable>
      </main>
    </Container>
  );
};

export default FormList;
