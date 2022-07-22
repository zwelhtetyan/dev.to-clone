import React from 'react';
import { FooterCon } from '../styles/FooterStyles';
import footerLogo from '../assets/logo/footerLogo.svg';

const Footer = () => {
   return (
      <FooterCon>
         <p>
            <span>DEV Community</span> — A constructive and inclusive social
            network for software developers. With you every step of your
            journey.
         </p>
         <p>
            Built on <span>Forem</span> — the <span>open source</span> software
            that powers <span>DEV</span> and other inclusive communities.
         </p>
         <p>
            Made with love and <span>Ruby on Rails</span>. DEV Community © 2016
            - 2022.
         </p>
         <img src={footerLogo} alt='logo' />
      </FooterCon>
   );
};

export default Footer;
