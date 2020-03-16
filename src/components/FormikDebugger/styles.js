import styled from "styled-components";

const Container = styled.div`
  margin: 3rem 1rem;
  border-radius: 4;
  background: #f6f8fa;
  box-shadow: 0 0 1px #eee inset;
`;

const Title = styled.div`
  text-transform: uppercase;
  font-size: 11;
  font-weight: 500;
  padding: 0.5rem;
  background: #555;
  color: #fff;
  letter-spacing: 1px;
`;

const Body = styled.pre`
  font-size: 0.85rem;
  padding: 0.25rem 0.5rem;
  overflow-x: scroll;
`;

export { Container, Title, Body };
