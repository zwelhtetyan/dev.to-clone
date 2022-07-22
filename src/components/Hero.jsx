import React from 'react';
import { ContentWrapper, HeroCon } from '../styles/HeroStyles';
import logo from '../assets/logo/logo.png';
import BtnWrapper from '../utils/BtnWrapper';
import DividerElem from '../utils/Divider';

const Hero = () => {
   return (
      <HeroCon className='hero'>
         <ContentWrapper>
            <img src={logo} alt='' />
            <div>
               <h2>
                  <span>DEV Community</span> is a community of 878,258 amazing
                  developers
               </h2>
               <p>
                  We're a place where coders share, stay up-to-date and grow
                  their careers.
               </p>
            </div>
         </ContentWrapper>
         <BtnWrapper w='200px' />
         <DividerElem h='1px' bg='rgb(23 23 23 / 5%)' />
      </HeroCon>
   );
};

export default Hero;
