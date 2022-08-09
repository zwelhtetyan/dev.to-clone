import { Box, Flex, Heading, HStack, Image, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAuth } from '../context/auth';
import { PrimaryBtn } from '../utils/Buttons';
import joinOn from '../assets/logo/joinOn.svg';
import doc from '../assets/logo/doc.svg';
import commentLg from '../assets/logo/commentLg.svg';
import { Navigate } from 'react-router-dom';

const Profile = () => {
   //scroll top
   useEffect(() => window.scrollTo(0, 0), []);

   const user = useAuth();

   if (!user) {
      return <Navigate to='/login' />;
   }

   const date = new Date(+user.createdAt).toDateString().split(' ').slice(1, 4);
   const joinOnDate = [date[0], +date[1] + ',', date[2]].join(' ');

   return (
      <Box mt='-.5rem !important' h={{ xl: '60vh' }}>
         <Box h={['7rem', '7rem', '9rem']} background='black' />
         <Box mx={{ base: 'none', md: '.5rem' }}>
            <Box maxW='1000px' mx='auto'>
               <Box
                  boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
                  bg='white'
                  mt='-3.5rem'
                  borderRadius='5px'
                  pos='relative'
                  p={{ base: '.5rem .5rem 2rem', md: '1rem 1rem 2rem' }}
                  textAlign={{ base: 'start', md: 'center' }}
               >
                  <Image
                     src={user?.photoURL}
                     alt='user_profile'
                     boxSize={{ base: '60px', md: '120px' }}
                     pos='absolute'
                     top={{ base: '-30px', md: '-60px' }}
                     left={{ base: '2.5rem', md: '50%' }}
                     transform='translateX(-50%)'
                     border={{ base: '4px solid black', md: '7px solid black' }}
                     rounded='full'
                  />

                  <HStack justify='flex-end' mb={['1rem', '1rem', '2rem']}>
                     <PrimaryBtn bg='rgb(59 73 223)'>Edit Profile</PrimaryBtn>
                  </HStack>

                  <Heading fontSize={['1.5rem', '2rem']}>{user?.name}</Heading>

                  <Text
                     fontSize='1.1rem'
                     letterSpacing='.5px'
                     color='#717171'
                     mt='.3rem'
                  >
                     404 bio not found
                  </Text>

                  <HStack
                     justifyContent={{ base: 'flex-start', md: 'center' }}
                     mt='1rem'
                     color='#717171'
                     fontSize='15px'
                  >
                     <Image src={joinOn} />
                     <Text>Joined on {joinOnDate}</Text>
                  </HStack>
               </Box>

               <Flex
                  mt='1rem'
                  color='rgb(64 64 64)'
                  align='flex-start'
                  flexDir={{ base: 'column', md: 'row' }}
               >
                  <Box
                     boxShadow='0 0 0 1px rgb(23 23 23 / 5%)'
                     bg='#FAFAFA'
                     p={{ base: '1.5rem .5rem', md: '1.5rem 1rem' }}
                     flex={{ base: 'unset', md: '1' }}
                     borderRadius='5px'
                     m={{ base: '0 0 1rem 0', md: '0 1rem 0 0' }}
                     w={{ base: '100%' }}
                  >
                     <HStack mb='.7rem'>
                        <Image src={doc} alt='doc_logo' />
                        <Text>0 post published</Text>
                     </HStack>
                     <HStack>
                        <Image src={commentLg} alt='comment_logo' />
                        <Text>0 comment written</Text>
                     </HStack>
                  </Box>

                  <Box
                     flex={{ base: 'unset', md: '2' }}
                     borderRadius='5px'
                     w={{ base: '100%' }}
                  >
                     <Box>{/* published post here */}</Box>
                  </Box>
               </Flex>
            </Box>
         </Box>
      </Box>
   );
};

export default Profile;
