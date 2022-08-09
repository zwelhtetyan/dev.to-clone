import { Heading, VStack } from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { removeFromLocalStorage } from '../helper/localStorage';
import { PrimaryBtn } from '../utils/Buttons';

const SignOutConfirm = () => {
   const navigate = useNavigate();

   const handleSignOut = () =>
      signOut(auth).then((_) => {
         navigate('/');
         removeFromLocalStorage('user');
         console.log('signed out');
      });
   return (
      <VStack
         h={{ base: '50vh', md: '85vh' }}
         justify='center'
         p='0 .5rem'
         textAlign='center'
      >
         <Heading fontSize={{ base: '1.5rem', md: '1.7rem' }}>
            Are you sure you want to sign out?
         </Heading>
         <PrimaryBtn bg='rgb(59 73 223)' onClick={handleSignOut}>
            Yes, sign out
         </PrimaryBtn>
      </VStack>
   );
};

export default SignOutConfirm;
