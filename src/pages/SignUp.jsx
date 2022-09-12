import { Divider, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import SignUpButton from '../utils/SignUpButton';
import { signUpBtnDesigns } from '../components/signUpBtnDesign';
import { signInWithPopup } from 'firebase/auth';
import { useAuth } from '../context/auth';
import { auth } from '../config/firebase';
import { createUser } from '../lib/api';
import { useState } from 'react';

const SignUp = ({ type }) => {
   //scroll top
   useEffect(() => window.scrollTo(0, 0), []);

   const navigate = useNavigate();

   const [signingIn, setSigningIn] = useState(false);

   const user = useAuth();

   if (!signingIn && user) {
      return <Navigate to={`/profile/${user.userId}`} />;
   }

   const signin = (provider) => {
      setSigningIn(true);
      signInWithPopup(auth, provider)
         .then((res) => {
            const userId = res.user.uid;

            const userData = {
               name: res.user.displayName,
               profile: res.user.photoURL,
               createdAt: res.user.metadata.createdAt,
            };

            createUser(userId, userData).then((_) => {
               navigate(-1);
               // setSigningIn(false);  cause this component render again after creating user
               console.log('created user successfully');
            });
         })
         .catch((err) => {
            setSigningIn(false);
            console.log(err.message);
         });
   };

   return (
      <VStack mx='auto' justify='center' maxW='640px' flex='1'>
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
                  DEV Community 👩‍💻👨‍💻
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
      </VStack>
   );
};

export default SignUp;
