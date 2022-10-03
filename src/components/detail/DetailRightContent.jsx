import React from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import UserProfilePopup from '../profile/UserProfilePopup';
import { nanoid } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import OtherPostItem from '../post/OtherPostItem';
import { useAuth } from '../../context/auth';

const DetailRightContent = ({
   currentUserProfile,
   otherPosts,
   userId,
   display,
   isDraft,
   m,
}) => {
   const navigate = useNavigate();
   const user = useAuth();

   const cardColor = useColorModeValue(
      'light.cardSecondaryBg',
      'dark.cardSecondaryBg'
   );

   const nameColor = useColorModeValue(
      'light.headingHover',
      'dark.headingHover'
   );

   return (
      <Box
         m={m}
         flex='1'
         ms={{ xl: '1rem' }}
         pos='sticky'
         top='4rem'
         display={display}
      >
         <UserProfilePopup
            w='100%'
            p='1rem'
            m={{ base: '0', md: '1px' }}
            borderRadius={{ base: '0', md: '5px' }}
            boxShadow={useColorModeValue(
               '0 0 0 1px rgb(23 23 23 / 10%)',
               '0 0 0 1px rgb(255 255 255 / 15%)'
            )}
            backgroundHeight='50px'
            background={currentUserProfile.background}
            profile={currentUserProfile.profile}
            name={currentUserProfile.name}
            username={currentUserProfile.username}
            bio={currentUserProfile.bio}
            work={currentUserProfile.work}
            location={currentUserProfile.location}
            education={currentUserProfile.education}
            joined={currentUserProfile.createdAt}
            id={userId}
            currentUserId={user?.userId}
            followers={currentUserProfile.followers || []}
         />

         {otherPosts.length !== 0 && !isDraft && (
            <Box
               borderRadius={{ base: '0', md: '5px' }}
               className='shadow'
               mt='1rem'
               overflow='hidden'
               bg={cardColor}
               py='.5rem'
            >
               <Text fontSize='1.3rem' mb='1rem' fontWeight={600} ms='1rem'>
                  More from{' '}
                  <Text
                     as='span'
                     color={nameColor}
                     cursor='pointer'
                     onClick={() => navigate(`/${currentUserProfile.username}`)}
                  >
                     {currentUserProfile.name}
                  </Text>
               </Text>

               {otherPosts.map((postData) => (
                  <OtherPostItem
                     key={nanoid()}
                     username={postData.username}
                     title={postData.title}
                     tags={postData.tags}
                     postId={postData.id}
                  />
               ))}
            </Box>
         )}
      </Box>
   );
};

export default DetailRightContent;
