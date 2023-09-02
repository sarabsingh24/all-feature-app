import styled from 'styled-components';

export const NavbarStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0b3c60;
  padding: 0 16px;
  line-height: 64px;
  color: #ffffff;
  position: relative;
  z-index: 2;
`;
export const LogoArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .img-style {
    height: 42px;
    width: 42px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
    margin-right: 16px;
  }
  .name-sty {
    font-size: 13px;
  }
`;
 export const OtherLinks = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   gap: 12px;

   .link-style {
     color: #ffffff;
     font-size: 13px;
     text-decoration: none;
     cursor: pointer;
     position: relative;
     .notefication {
       background: red;
       display: flex;
       align-items: center;
       justify-content: center;
       font-weight:bold;
       width: 24px;
       height: 24px;
       border-radius: 50%;
       position: absolute;
       position: absolute;
       top: 6px;
       right: -11px;
     }
     &:hover {
       color: cyan;
     }
   }
 `;