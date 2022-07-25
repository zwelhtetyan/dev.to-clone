import React from 'react';
import { SpinnerCircularFixed } from 'spinners-react';
import styled from 'styled-components';

const Wrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;

   p {
      margin-left: 1rem;
      letter-spacing: 1px;
   }
`;

const Spinner = ({ msg }) => {
   return (
      <Wrapper>
         <SpinnerCircularFixed
            size={25}
            thickness={145}
            speed={200}
            color='rgb(59 73 223)'
            secondaryColor='transparent'
         />
         <p>{msg}...</p>
      </Wrapper>
   );
};

export default Spinner;
