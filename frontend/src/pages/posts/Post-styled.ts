import styled from 'styled-components';

export const FormStyled = styled.form``;

export const WrapperStyle = styled.section`
  margin-top: 32px;
  border-radius: 4px;
  background: #f4f4f499;
  padding: 18px 16px 0 16px;
  border: 1px solid #e3e3e3;
`;

export const TitleStyle = styled.h3``;
export const ParaStyle = styled.p`
  color: #60656f;
  font-size: 13px;
`;

export const FlexSB = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  && span {
    font-size: 12px;
    padding: 12px 0;
    color: #60656f;
    cursor: pointer;
    &:hover {
      color: blue;
    }
  }
`;


export const Flex2Column = styled.div`
  display: flex;
  justify-content:space-around;
  gap:10px;
`;
