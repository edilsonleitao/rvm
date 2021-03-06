import React, { useState, useEffect } from "react";
import { Container, SearchContainer } from "./styles";
import Pullable from "react-pullable";
import Header from "../../components/Header";
import { List, ListItem, InputBase, IconButton } from "@material-ui/core";
import CardBeneficiario from "../../components/CardBeneficiario";
import { useHistory, useLocation } from "react-router-dom";
import fetchForms, {
  buscaFormularioPorPrestador,
} from "../../services/formularios";
import { Search as SearchIcon, Clear as ClearIcon } from "@material-ui/icons";

import { BASE_URL } from "../../constants";

const FormList = () => {
  const history = useHistory();
  const { state } = useLocation();

  const fetchRemote = state && state.fetchRemote;
  const token = state && state.token;

  const [formularios, setFormularios] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");

  async function fetchFormulario(remote) {
    const data = await fetchForms(remote);
    setFormularios(data);
  }

  useEffect(() => {
    fetchFormulario(fetchRemote);
  }, []);

  const handleClickCard = (item) => {
    const { id } = item;
    history.replace({
      pathname: `${BASE_URL}/formulario/${id}`,
      state: { token },
    });
  };

  const handlePull = () => {
    setSearchTxt("");
    fetchFormulario(true);
  };

  const handleChangheSearch = ({ target: fld }) => {
    setSearchTxt(fld.value);
  };

  const handleSearch = async (clear) => {
    if (!searchTxt || clear) {
      setSearchTxt("");
      await fetchFormulario();
      return;
    }

    const data = await buscaFormularioPorPrestador(searchTxt);
    setFormularios(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <header>
        <Header elevation={0} btnMenu title="Relatório de Visita Médica" />
      </header>
      <main>
        <SearchContainer onSubmit={handleSubmit}>
          <IconButton
            type="submit"
            aria-label="search"
            onClick={async () => handleSearch(false)}
          >
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder="Prestador"
            fullWidth
            onChange={handleChangheSearch}
            value={searchTxt}
          />
          {searchTxt && (
            <IconButton
              type="reset"
              aria-label="clear"
              onClick={async () => handleSearch(true)}
            >
              <ClearIcon />
            </IconButton>
          )}
        </SearchContainer>
        <Pullable onRefresh={handlePull}>
          <List>
            {formularios.map((item) => (
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
