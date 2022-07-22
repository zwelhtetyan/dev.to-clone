import styled from 'styled-components';

const MainCon = styled.main`
   padding: 1rem 2rem 3rem;

   @media screen and (max-width: 480px) {
      padding: 1rem 0.5rem 2rem;
   }
`;

const MainContainer = ({ children }) => {
   return <MainCon>{children}</MainCon>;
};

export default MainContainer;
