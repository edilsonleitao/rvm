import React from "react";
import { Drawer, IconButton, Divider, Button } from "@material-ui/core";
import { MenuOpen, PowerSettingsNew } from "@material-ui/icons";
import { DrawerContainer, DrawerHeader, DrawerMenu } from "./styles";
import { useHistory } from "react-router-dom";

import { BASE_URL } from "../../constants";

import { logoff } from "../../services/auth";

const Menu = props => {
  const { open, handleDrawerClose } = props;

  const history = useHistory();

  const handleClickSair = async () => {
    await logoff();
    history.replace(`${BASE_URL}/`);
  };

  return (
    <Drawer variant="persistent" anchor="left" open={open}>
      <DrawerContainer>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <MenuOpen color="primary" />
          </IconButton>
          <Divider />
        </DrawerHeader>
        <DrawerMenu>
          <Button
            size="small"
            color="primary"
            startIcon={<PowerSettingsNew color="primary" />}
            onClick={handleClickSair}
          >
            Sair
          </Button>
        </DrawerMenu>
      </DrawerContainer>
    </Drawer>
  );
};

export default Menu;
