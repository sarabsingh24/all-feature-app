import styled from 'styled-components';


export const WrapperStyle = styled.div`
  display: grid;
  justify-content: center;

  && .box-width {
    width: 400px;
    text-align: center;
    .center-box {
      margin: 8px;
    }
  }
`;