import styled from "styled-components";
import { Card } from "@material-ui/core";

export const CardContainer = styled(Card)`
  width: 100%;
`;

export const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 15%;
  max-width: 100px;
`;

export const Status = styled.p`
  font-size: 10px;
  margin-top: 5px;
  color: #777;
  font-weight: bold;
`;

export const Beneficiario = styled.p`
  font-size: 20px;
`;
