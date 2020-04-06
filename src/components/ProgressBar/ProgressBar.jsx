import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import { Container } from "./styles.js";

export default ({ percent = 0 }) => {
  return (
    <Container>
      <ProgressBar percent={percent} filledBackground="#033c7c" />
    </Container>
  );
};
