import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListSubheader,
  Paper,
  TextField,
} from '@material-ui/core';
import formularioAPI from '../services/formulario';

const Formulario = () => {

  const [agrupamentos, setAgrupamentos] = useState([]);

  useEffect(() => {
    async function fetchForm() {
      await formularioAPI.get('/questionario/1')
        .then(res => {
          setAgrupamentos(res.data.agrupamentos);
        })
        .catch(err => {
          console.log(err);
        })
    }
    fetchForm();

  }, []);

  return (
    <List >
    {agrupamentos.map(agrupamento => (
      <li key={agrupamento.id}>
        <ul>
          <Paper variant='outlined'>
            <ListSubheader disableSticky={true}>{agrupamento.nome}</ListSubheader>
          </Paper>
          {agrupamento.perguntas.map(item => (
              <ListItem key={item.id}>
                <TextField
                  id={item.id}
                  label={item.nome}
                  variant={"outlined"}
                  defaultValue={item.valor ? item.valor : " "}
                  fullWidth
                  size='small'
                  disabled={item.tipo === "hrp" || item.desabilitado ? true : false}
                  multiline={item.tipo === "memo" || item.tipo === "texto" ? true : false}
                />
              </ListItem>
          ))}
        </ul>
      </li>
    ))}
    </List>
  );
}

export default Formulario;
