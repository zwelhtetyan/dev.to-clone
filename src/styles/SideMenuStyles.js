import styled from 'styled-components';

export const SideMenuCon = styled.aside`
   width: 100%;
   max-width: 270px;
   height: 100vh;
   position: fixed;
   top: 0;
   left: 0;
   z-index: 90;
   padding: 66px 0.5rem 0;

   background-color: ${({ theme }) => theme.foreBg};
`;

export const Heading = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin-bottom: 1rem;
`;

export const ContentWrapper = styled.div`
   background-color: #fafafa;
   box-shadow: 0 0 0 1px rgb(23 23 23 / 5%);
   padding: 0.5rem;
   border-radius: 5px;

   h2 {
      font-size: 1.2rem;

      span {
         color: rgb(59 73 223);
      }
   }

   p {
      color: rgb(64 64 64);
      font-weight: 300;
      font-size: 15px;
      margin-top: 5px;
   }
`;
