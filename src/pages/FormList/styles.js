import styled from "styled-components";

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
    padding-top: 50px;
  }
`;

export { Container };
