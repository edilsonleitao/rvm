import React from "react";
import { CardContent, Avatar, Divider, Typography } from "@material-ui/core";
import pendenteIcon from "../../assets/pendentev2.png";
import iniciadoIcon from "../../assets/iniciadov2.png";
import finalizadoIcon from "../../assets/finalizadov2.png";

import { STATUS_FORM } from "../../constants";

import { CardContainer, StatusContainer, Status, Beneficiario } from "./styles";

const CardBeneficiario = ({ questionario }) => {
  const { nome, beneficiario, sexo, idade, hospital, status } = questionario;

  const pegaStatusImg = (status) => {
    const {
      FILL: { PENDENTE, INICIADO, FINALIZADO },
    } = STATUS_FORM;

    switch (status) {
      case PENDENTE.nome:
        return pendenteIcon;
      case INICIADO.nome:
        return iniciadoIcon;
      case FINALIZADO.nome:
        return finalizadoIcon;
    }
  };

  return (
    <CardContainer raised>
      <CardContent style={{ display: "flex", flexDirection: "row" }}>
        <StatusContainer>
          <Avatar src={pegaStatusImg(status)} />
          <Status>{status}</Status>
        </StatusContainer>
        <Divider orientation="vertical" flexItem variant="middle" />
        <div>
          <Typography color="textSecondary" gutterBottom>
            {nome}
          </Typography>
          <Beneficiario>{beneficiario}</Beneficiario>
          <Typography color="textSecondary">
            Idade: {idade} | Sexo: {sexo}
          </Typography>
          <Typography variant="body2" component="p">
            {hospital}
          </Typography>
        </div>
      </CardContent>
    </CardContainer>
  );
};

export default CardBeneficiario;
