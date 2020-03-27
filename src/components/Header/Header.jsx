import React, { useState } from "react";
import {
  Container,
  MenuIcon,
  LeftIcon,
  TextButton,
  Title,
  SendIcon
} from "./styles";
import { AppBar, IconButton, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Menu from "../../components/Menu";

import { BASE_URL } from "../../constants";

const Header = props => {
  const { title, elevation = 0, btnMenu, path, enviar, token } = props;

  const [open, setOpen] = useState(false);

  const history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    if (!path)
      throw new Error("Não foi informado um path para o botão de retornar.");

    history.replace({
      pathname: BASE_URL + path,
      state: { token }
    });
  };

  //TODO: Remove
  const handleEnviar = () => {
    // history.replace({
    //   pathname: `${BASE_URL}/formularios`,
    //   state: { fetchRemote: true }
    // });
  };

  return (
    <>
      <AppBar position="absolute" elevation={elevation} color="transparent">
        <Container>
          <IconButton
            edge="start"
            color="inherit"
            onClick={btnMenu ? handleDrawerOpen : handleBack}
          >
            {btnMenu ? <MenuIcon /> : <LeftIcon />}
          </IconButton>
          <div>
            <Title>{title}</Title>
            {enviar && (
              <Button onClick={handleEnviar} endIcon={<SendIcon />}>
                <TextButton>Enviar</TextButton>
              </Button>
            )}
          </div>
        </Container>
      </AppBar>
      <Menu
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
    </>
  );
};

export default Header;
