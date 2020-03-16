import styled from "styled-components";
import { Card, Button } from "@material-ui/core";

const Container = styled.div`
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #5581b5 0%, #033c7c 100%);

  main {
    flex-grow: 1;
    margin-top: 64px;
    margin-left: 16px;
    margin-right: 16px;
  }
`;

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px;
  align-items: center;
`;

const CardTitle = styled.h3`
  padding-bottom: 10px;
  color: #033c7c;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  width: 100%;
`;

const Btn = styled(Button)`
  width: 48%;
  height: 40px;
`;

export { Container, StyledCard, CardTitle, ButtonContainer, Btn };
