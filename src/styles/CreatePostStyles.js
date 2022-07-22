import styled from 'styled-components';

export const Header = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;

   div {
      display: flex;
      align-items: center;
      img {
         width: 58px;
         height: 40px;
         margin-right: 0.5rem;
      }

      h3 {
         font-size: 1.3rem;
      }
   }
`;

export const Edior = styled.div`
   border-radius: 5px;
   margin-top: 1rem;
   padding: 2rem;
   display: flex;
   flex-direction: column;
   max-height: 85vh;
   position: relative;

   background-color: ${({ theme }) => theme.foreBg};

   @media screen and (max-width: 768px) {
      padding: 1.5rem 0.5rem;
   }

   @media screen and (max-width: 480px) {
      height: auto;
      max-height: unset;
   }
`;

export const ImgUpload = styled.label`
   max-width: 150px;
   padding: 10px 0;
   text-align: center;
   border-radius: 5px;
   margin-bottom: 1rem;
   cursor: pointer;
   border: 2px solid #d6d6d7;

   &:hover {
      background-color: #d6d6d77a;
   }

   input[type='file'] {
      display: none;
   }
`;

export const Title = styled.input`
   font-size: 1.7rem;
   outline: none;
   border: none;
   width: 100%;
   height: 42px;
   padding: 0 0.5rem;
   margin-bottom: 1rem;
   border-radius: 5px;
   font-weight: 500;

   &::placeholder {
      color: #525252;
   }
`;

export const Footer = styled.div`
   margin-top: 1.5rem;
   display: flex;
   justify-content: flex-end;
   align-items: center;
`;
