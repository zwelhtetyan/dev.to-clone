import React from 'react';
import styled from 'styled-components';
import { PrimaryBtn, SecondaryBtn } from './Buttons';

export const Wrapper = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   margin: 1rem 0;
`;

const BtnWrapper = ({ w }) => {
   return (
      <Wrapper>
         <PrimaryBtn w={w} bg='rgb(59 73 223)' color='#fff'>
            Create account
         </PrimaryBtn>
         <SecondaryBtn w={w} margin='.5rem 0 0 0'>
            Log in
         </SecondaryBtn>
      </Wrapper>
   );
};

export default BtnWrapper;
