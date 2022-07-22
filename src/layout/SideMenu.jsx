import React from 'react';
import { VscClose } from 'react-icons/vsc';
import Overlay from '../components/Overlay';
import { ContentWrapper, Heading, SideMenuCon } from '../styles/SideMenuStyles';
import BtnWrapper from '../utils/BtnWrapper';
import { SecondaryBtn } from '../utils/Buttons';
import ReactDOM from 'react-dom';

const SideMenuConntent = ({ onClose }) => (
   <SideMenuCon>
      <Heading>
         <h3>DEV Community</h3>
         <SecondaryBtn className='search-icon' onClick={onClose}>
            <VscClose size={23} />
         </SecondaryBtn>
      </Heading>
      <ContentWrapper>
         <h2>
            <span>DEV Community</span> is a community of 878,258 amazing
            developers
         </h2>
         <p>
            We're a place where coders share, stay up-to-date and grow their
            careers.
         </p>
         <BtnWrapper w='150px' />
      </ContentWrapper>
   </SideMenuCon>
);

const overlays = document.getElementById('overlays');

const SideMenu = ({ onClose }) => {
   return (
      <>
         {ReactDOM.createPortal(<Overlay onClose={onClose} />, overlays)}
         {ReactDOM.createPortal(
            <SideMenuConntent onClose={onClose} />,
            overlays
         )}
      </>
   );
};

export default SideMenu;
