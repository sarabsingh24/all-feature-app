import styled from 'styled-components';

export const WrapperStyle = styled.div`
  display: grid;
  grid-template-columns:1fr 2fr 1fr;
  justify-content: space-between;
  gap: 20px;
  margin: 16px;
  .column {
  
    border-radius: 6px;
    position:relative;
    z-index:1;
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
  padding: 16px;
  border: 1px solid #e3e3e3;
  
`;

export const BoxRow = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  gap: 18px;
  line-height: 3;
  div:nth-of-type(1) {
  }
  div:nth-of-type(2) {
    flex-grow: 2;
  }
  div:nth-of-type(3) {
    flex-grow: 2;
    text-align: end;
    font-size: 12px;
    .num-box {
      color: green;
      border: 1px solid green;
      padding:2px 4px;
      border-radius: 4px;
    }
  }
  .item {
    display: flex;
    width: 42px;
    justify-content: center;
  }

  .img-style {
    height: 42px;
    width: 42px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
  }
`;
