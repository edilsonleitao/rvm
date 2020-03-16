import styled from "styled-components";
import { Toolbar, Typography } from "@material-ui/core";
import { Menu, Send, ArrowBackIos } from "@material-ui/icons";

const Container = styled(Toolbar)`
  div {
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const MenuIcon = styled(Menu)`
  color: #fff;
`;

const LeftIcon = styled(ArrowBackIos)`
  color: #fff;
`;

const SendIcon = styled(Send)`
  color: #fff;
`;

const Title = styled(Typography)`
  color: #fff;
  font-weight: bold;
`;

const TextButton = styled.p`
  color: #fff;
`;

export { Container, MenuIcon, LeftIcon, Title, TextButton, SendIcon };
