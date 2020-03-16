import styled from "styled-components";
import { TextField, Button } from "@material-ui/core";

const Container = styled.div`
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
  background: linear-gradient(135deg, #5581b5 0%, #033c7c 100%);
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 280px;
  height: 230px;
  border-radius: 5%;
  padding: 40px;
  background: linear-gradient(
    135deg,
    #f6f8f9 0%,
    #e5ebee 50%,
    #d7dee3 51%,
    #f5f7f9 100%
  );
`;

const Input = styled(TextField)`
  display: flex;
  flex: 1;
  margin: 10px;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const Btn = styled(Button)``;

export { Container, LoginBox, Input, Btn, ButtonContainer };
