import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import UserProfilePopup from '../UserProfilePopup';
import OtherPost from './OtherPost';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';

const DetailRightContent = ({
   currentUserProfile,
   otherPosts,
   userId,
   display,
   mt,
   p,
}) => {
   const navigate = useNavigate();

   return (
      <Box
         mt={mt}
         flex='1'
         ms={{ xl: '1rem' }}
         pos='sticky'
         top='4rem'
         display={display}
      >
         <Box
            borderRadius='5px'
            boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
            overflow='hidden'
         >
            <UserProfilePopup
               w='100%'
               p='1rem'
               contentMb='1rem'
               backgroundHeight='55px'
               background={currentUserProfile.background}
               profile={currentUserProfile.profile}
               name={currentUserProfile.name}
               bio={currentUserProfile.bio}
               work={currentUserProfile.work}
               location={currentUserProfile.location}
               education={currentUserProfile.education}
               joined={currentUserProfile.createdAt}
               userId={userId}
            />
         </Box>

         <Box
            borderRadius='5px'
            boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
            mt='1rem'
            overflow='hidden'
            p={p || '1rem'}
            bg='white'
         >
            <Text fontSize='1.3rem' mb='1rem' fontWeight={600}>
               More from{' '}
               <Text
                  as='span'
                  color='rgb(47 58 178)'
                  cursor='pointer'
                  onClick={() => navigate(`/profile/${userId}`)}
               >
                  {currentUserProfile.name}
               </Text>
            </Text>
            {otherPosts.map((postData) => (
               <OtherPost
                  key={nanoid()}
                  title={postData.title}
                  tags={postData.filteredTags}
                  postId={postData.id}
               />
            ))}
         </Box>
      </Box>
   );
};

export default DetailRightContent;
