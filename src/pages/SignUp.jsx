import { Box, Divider, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import SignUpButton from '../utils/SignUpButton';
import { signUpBtnDesigns } from '../components/signUpBtnDesign';
import { signInWithPopup } from 'firebase/auth';
import { useAuth } from '../context/auth';
import { auth } from '../config/firebase';
import { createUser } from '../lib/api';

const SignUp = ({ type }) => {
   //scroll top
   useEffect(() => window.scrollTo(0, 0), []);

   const navigate = useNavigate();

   const user = useAuth();

   if (user) {
      return <Navigate to='/' />;
   }

   const signin = (provider) =>
      signInWithPopup(auth, provider)
         .then((res) => {
            const userId = res.user.uid;
            const userData = {
               name: res.user.displayName,
               porfile: res.user.photoURL,
            };

            createUser(userId, userData).then((_) => {
               navigate('/');
               console.log('created user successfully');
            });
         })
         .catch((err) => console.log(err.message));

   return (
      <Box
         h={{ xl: '65vh' }}
         mx='auto'
         mt={{ base: '3rem', md: '4rem' }}
         maxW='640px'
      >
         <VStack
            boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
            bg='rgb(255 255 255)'
            p={{ base: '2rem 1rem', sm: '3rem' }}
            textAlign='center'
            borderRadius='5px'
         >
            <Heading fontSize='1.7rem'>Welcome to DEV Community</Heading>

            <Text mb='1rem !important'>
               <Text
                  as='span'
                  color='rgb(59 73 223)'
                  cursor='pointer'
                  onClick={() => navigate('/')}
               >
                  DEV Community
               </Text>{' '}
               is a community of 890,178 amazing developers
            </Text>

            {signUpBtnDesigns.map((obj) => (
               <SignUpButton
                  {...obj}
                  onClick={() => signin(obj.signInMethod)}
                  key={obj.logo}
                  type={type === 'login' ? 'Continue with' : 'Sign up with'}
               />
            ))}

            {type !== 'login' && (
               <Flex w='100%' align='center' mt='1.5rem !important'>
                  <Divider flex={1} bg='#7a7a7a' h='1.5px' />
                  <Text fontSize='14px' mx='1rem'>
                     Already have an account?{' '}
                     <Text
                        as='span'
                        color='rgb(59 73 223)'
                        cursor='pointer'
                        onClick={() => navigate('/login')}
                     >
                        Log in
                     </Text>
                     .
                  </Text>
                  <Divider flex={1} bg='#7a7a7a' h='1.5px' />
               </Flex>
            )}
         </VStack>
      </Box>
   );
};

export default SignUp;
