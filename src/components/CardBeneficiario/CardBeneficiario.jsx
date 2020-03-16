import React from "react";
import { CardContent, Typography } from "@material-ui/core";

import { CardContainer } from "./styles";

const CardBeneficiario = ({ questionario }) => {
  const { nome, beneficiario, sexo, idade, hospital } = questionario;

  return (
    <CardContainer raised>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {nome}
        </Typography>
        <Typography variant="h5" component="h2">
          {beneficiario}
        </Typography>
        <Typography color="textSecondary">
          Idade: {idade} | Sexo: {sexo}
        </Typography>
        <Typography variant="body2" component="p">
          {hospital}
        </Typography>
      </CardContent>
    </CardContainer>
  );
};

export default CardBeneficiario;
