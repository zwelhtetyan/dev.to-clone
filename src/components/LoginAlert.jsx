import {
   Image,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalOverlay,
   Text,
   useDisclosure,
   VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { PrimaryBtn, SecondaryBtn } from '../utils/Buttons';
import Logo from '../assets/images/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginAlert } from '../store/loginAlert';

const LoginAlert = () => {
   const { onClose } = useDisclosure();
   const dispatch = useDispatch();
   const loginAlert = useSelector((state) => state.loginAlert.showLoginAlert);

   const navigate = useNavigate();
   const location = useLocation();

   const handleClose = () => {
      dispatch(setLoginAlert(false));
   };

   const handleClick = (pathname) => {
      handleClose();
      navigate(`/${pathname}`);
   };

   useEffect(() => {
      dispatch(setLoginAlert(false));
   }, [location, dispatch]); // close modal when route change

   return (
      <>
         <Modal
            isCentered
            onClose={onClose}
            isOpen={loginAlert}
            motionPreset='none'
            closeOnOverlayClick={false}
            size={{ base: 'full', md: '2xl' }}
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader
                  borderBottom='1px solid rgb(23 23 23 / 10%)'
                  p='1rem'
               >
                  Log in to continue
               </ModalHeader>
               <ModalCloseButton onClick={handleClose} />
               <ModalBody px='1rem'>
                  <Image
                     src={Logo}
                     transform='rotate(-10deg)'
                     mt={2}
                     w={{ base: '60px', md: '90px' }}
                     alt='logo'
                  />
                  <Text mt={3}>
                     We're a place where coders share, stay up-to-date and grow
                     their careers.
                  </Text>
                  <VStack mt={5} mb={7}>
                     <PrimaryBtn
                        w='90%'
                        bg='rgb(59 73 223)'
                        onClick={() => handleClick('login')}
                     >
                        Log in
                     </PrimaryBtn>
                     <SecondaryBtn
                        w='90%'
                        onClick={() => handleClick('create-account')}
                     >
                        Create account
                     </SecondaryBtn>
                  </VStack>
               </ModalBody>
            </ModalContent>
         </Modal>
      </>
   );
};

export default LoginAlert;
