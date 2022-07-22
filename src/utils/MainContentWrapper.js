import styled from 'styled-components';

const Wrapper = styled.section`
   width: 100%;
   max-width: 768px;
   margin: auto;
   padding-top: ${({ pt }) => pt};

   @media screen and (max-width: 768px) {
      .hero {
         display: none;
      }
   }
`;

const MainContentWrapper = ({ children, ...props }) => {
   return <Wrapper {...props}>{children}</Wrapper>;
};

export default MainContentWrapper;
