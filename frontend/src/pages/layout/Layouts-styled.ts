import styled from 'styled-components';

export const WrapperStyle = styled.div`
  display: grid;
  grid-template-columns:1fr 2fr 1fr;
  justify-content: space-between;
  gap: 20px;
  margin: 16px;
  .column {
  
    border-radius: 6px;
  }
`;

export const CenterStyle = styled.div``;
export const SideBoxStyle = styled.div`
  .info-box {
    border-radius: 4px;
    background: #f4f4f499;
    padding: 18px 16px 0 16px;
    border: 1px solid #e3e3e3;
  }
`;

export const InfoBoxStyle = styled.div`
 
    border-radius: 4px;
    background: #f4f4f499;
    padding:  16px ;
    border: 1px solid #e3e3e3;
 
`;
