import React from 'react';
import { Box, Divider, HStack, Image, Text } from '@chakra-ui/react';
import doc from '../../assets/logo/doc.svg';
import commentLg from '../../assets/logo/commentLg.svg';

const TechStack = ({ title, text }) => {
   return (
      <Box
         boxShadow='0 0 0 1px rgb(23 23 23 / 5%)'
         bg='#FAFAFA'
         p={{ base: '1rem .5rem', md: '1rem' }}
         borderRadius='5px'
         mb={{ base: 1, md: 3 }}
      >
         <Text fontWeight={700} fontSize='18px'>
            {title}
         </Text>
         <Divider mt={3} mb={5} />
         <Text>{text}</Text>
      </Box>
   );
};

const ProfileLeftPart = ({ publishedPosts, profileData, display }) => {
   if (!profileData) return;

   return (
      <Box
         m={{ base: '0 0 1rem 0', md: '0 1rem 0 0' }}
         flex={{ base: 'unset', md: '1' }}
         w={{ base: '100%' }}
         display={display}
      >
         <TechStack title='Currently Learning' text={profileData.learning} />

         <TechStack title='Skills/Languages' text={profileData.skills} />

         <TechStack title='Currently hacking on' text={profileData.hacking} />

         <TechStack title='Available for' text={profileData.avaliable} />

         <Box
            boxShadow='0 0 0 1px rgb(23 23 23 / 5%)'
            bg='#FAFAFA'
            p={{ base: '1.5rem .5rem', md: '1.5rem 1rem' }}
            borderRadius='5px'
         >
            <HStack mb='.7rem'>
               <Image src={doc} alt='doc_logo' />
               <Text>{publishedPosts?.length || 0} post published</Text>
            </HStack>
            <HStack>
               <Image src={commentLg} alt='comment_logo' />
               <Text>0 comment written</Text>
            </HStack>
         </Box>
      </Box>
   );
};

export default ProfileLeftPart;
