import styled from 'styled-components';

export const FormStyled = styled.form`
  margin-bottom: 32px;
  .upload-img-btn {
    position: absolute;
    opacity: 0;
    top: -10px;
    left: -13px;
  }
`;

export const WrapperStyle = styled.section`
  margin-bottom: 32px;
  border-radius: 4px;
  .img-style{
    height: 320px;
    object-fit: cover ;
    
    
  }
  
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
  && .art-info {
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
