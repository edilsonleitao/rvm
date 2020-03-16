import styled from "styled-components";

const DrawerContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 170px;
`;

const DrawerHeader = styled.div`
  width: 100%;
`;

const DrawerMenu = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

export { DrawerContainer, DrawerHeader, DrawerMenu };
