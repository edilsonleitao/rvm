import styled from "styled-components";
import { Container, TextField, Typography, Button } from "@material-ui/core";
import logo from "../../assets/logologin.png";

export const Main = styled.div`
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ffffff 0%, #5581b5 100%);
`;

export const Componentes = styled(Container).attrs({
  component: "main",
  maxWidth: "xs"
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.img.attrs({ src: logo })`
  width: 75%;
  height: 75%;
  max-width: 100%;
  max-height: 100%;
  margin-bottom: 50px;
`;

export const Input = styled(TextField).attrs({
  variant: "outlined",
  margin: "dense",
  fullWidth: true,
  inputProps: { style: { backgroundColor: "#d1d1d1", borderRadius: 5 } }
})``;

export const Entrar = styled(Button).attrs({
  type: "submit",
  fullWidth: true,
  variant: "contained",
  color: "primary"
})``;

export const Copyrigths = styled(Typography).attrs({
  variant: "body2",
  color: "textSecondary",
  align: "center"
})`
  padding-top: 40px;
`;
