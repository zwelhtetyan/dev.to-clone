import {
   Divider,
   Flex,
   Heading,
   Text,
   useColorModeValue,
   VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import SignUpButton from '../utils/SignUpButton';
import { signUpBtnDesigns } from '../utils/signUpBtnDesign';
import { signInWithPopup } from 'firebase/auth';
import { useAuth } from '../context/auth';
import { auth } from '../config/firebase';
import { createUser } from '../lib/api';
import { useState } from 'react';
import useGenerateUserName from '../hooks/useGenerateUserName';
import { useSelector } from 'react-redux';

const SignUp = ({ type }) => {
   //scroll top
   useEffect(() => window.scrollTo(0, 0), []);

   const navigate = useNavigate();
   const getUsername = useGenerateUserName();

   const [signingIn, setSigningIn] = useState(false);

   const { profileData } = useSelector((state) => state.profileData);

   const user = useAuth();

   const cardBg = useColorModeValue('light.cardBg', 'dark.cardBg');
   const color = useColorModeValue('light.primary', 'dark.primary');
   const dividerColor = useColorModeValue(
      'light.cardBorder',
      'dark.cardBorder'
   );

   if (!signingIn && user) {
      return <Navigate to='/' />;
   }

   const signin = (provider) => {
      setSigningIn(true);
      signInWithPopup(auth, provider)
         .then((res) => {
            const userId = res.user.uid;
            const authenticatedUser = profileData.find(
               (userData) => userData.id === userId
            );

            const username = authenticatedUser
               ? authenticatedUser.username
               : getUsername(res.user.displayName, userId);

            const userData = {
               name: res.user.displayName,
               username,
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
            bg={cardBg}
            className='shadow'
            p={{ base: '2rem 1rem', sm: '3rem' }}
            textAlign='center'
            borderRadius='5px'
         >
            <Heading fontSize='1.7rem'>Welcome to DEV Community</Heading>

            <Text mb='1rem !important'>
               <Text
                  as='span'
                  color={color}
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
                  <Divider flex={1} bg={dividerColor} h='1.5px' />
                  <Text fontSize='14px' mx='1rem'>
                     Already have an account?{' '}
                     <Text
                        as='span'
                        color={color}
                        cursor='pointer'
                        onClick={() => navigate('/login')}
                     >
                        Log in
                     </Text>
                     .
                  </Text>
                  <Divider flex={1} bg={dividerColor} h='1.5px' />
               </Flex>
            )}
         </VStack>
      </VStack>
   );
};

export default SignUp;
