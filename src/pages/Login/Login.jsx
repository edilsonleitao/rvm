import React from "react";
import { useHistory } from "react-router-dom";
import { Container, LoginBox, Input, Btn, ButtonContainer } from "./styles";
import { InputAdornment, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import { BASE_URL } from "../../constants";

const Login = () => {
  const history = useHistory();

  const [values, setValues] = React.useState({
    usuario: "",
    senha: "",
    mostraSenha: false
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickmostraSenha = () => {
    setValues({ ...values, mostraSenha: !values.mostraSenha });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleClickEntrar = () =>
    history.replace({
      pathname: `${BASE_URL}/formularios`,
      state: { fetchRemote: true }
    });

  return (
    <>
      <Container>
        <LoginBox>
          <Input
            color="primary"
            size="small"
            id="usuario"
            margin="dense"
            label="Usuário"
            InputLabelProps={{ shrink: true }}
            onChange={handleChange("usuario")}
            fullWidth
          />
          <Input
            color="primary"
            margin="dense"
            id="senha"
            size="small"
            label="Senha"
            type={values.mostraSenha ? "text" : "password"}
            onChange={handleChange("senha")}
            InputLabelProps={{ shrink: true }}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickmostraSenha}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.mostraSenha ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <ButtonContainer>
            <Btn
              color="primary"
              variant="contained"
              onClick={handleClickEntrar}
            >
              Entrar
            </Btn>
          </ButtonContainer>
        </LoginBox>
      </Container>
    </>
  );
};

export default Login;
