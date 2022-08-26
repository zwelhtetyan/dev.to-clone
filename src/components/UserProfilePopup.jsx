import React from 'react';
import { Box, Text, Tooltip } from '@chakra-ui/react';
import { joinOnDate } from '../helper/calcTimestamp';
import { useNavigate } from 'react-router-dom';

const Content = ({ title, text, contentMb }) => {
   return (
      <Box mb={contentMb || '.3rem'}>
         <Text textTransform='uppercase' fontSize='15' fontWeight='600'>
            {title}
         </Text>
         <Text fontSize='15px'>{text}</Text>
      </Box>
   );
};

export const TooltipWrapper = ({ children, currentUserProfile }) => {
   return (
      <Tooltip
         label={
            <UserProfilePopup
               background={currentUserProfile?.background}
               profile={currentUserProfile?.profile}
               name={currentUserProfile?.name}
               bio={currentUserProfile?.bio}
               work={currentUserProfile?.work}
               location={currentUserProfile?.location}
               education={currentUserProfile?.education}
               joined={currentUserProfile?.createdAt}
            />
         }
         bg='rgb(255 255 255)'
         color='black'
         border='1px solid rgb(23 23 23 / 18%)'
         borderRadius='5px'
         overflow='hidden'
         placement='bottom-start'
         p='0'
      >
         {children}
      </Tooltip>
   );
};

const UserProfilePopup = ({
   background,
   profile,
   name,
   bio,
   work,
   location,
   education,
   joined,
   w,
   p,
   contentMb,
   backgroundHeight,
   userId,
}) => {
   const navigate = useNavigate();

   return (
      <Box w={w || '300px'} borderRadius='5px'>
         <Box bg={background || '#000000'} h={backgroundHeight || '45px'} />
         <Box bg='white' pos='relative'>
            <Box
               bgImage={profile}
               borderWidth='4px'
               borderColor={background || '#000000'}
               pos='absolute'
               boxSize='55px'
               bgPos='center'
               bgSize='cover'
               rounded='full'
               bgRepeat='no-repeat'
               top='-27.5px'
               left='1rem'
               cursor='pointer'
               onClick={() => navigate(`/profile/${userId}`)}
               transition='.3s'
               _hover={{ filter: 'drop-shadow(0px 0px 2px rgb(59 73 223))' }}
            />
            <Box p={p || '.5rem'} pt='.2rem'>
               <Text
                  ps='4.5rem'
                  fontSize='1.3rem'
                  fontWeight='600'
                  cursor='pointer'
                  _hover={{ color: 'rgb(47 58 178)' }}
                  onClick={() => navigate(`/profile/${userId}`)}
               >
                  {name}
               </Text>
               <Text
                  color='#575757'
                  letterSpacing='.3px'
                  mb='.5rem'
                  fontSize='16px'
               >
                  {bio}
               </Text>
               {work && (
                  <Content contentMb={contentMb} title='Work' text={work} />
               )}
               {location && (
                  <Content
                     contentMb={contentMb}
                     title='Location'
                     text={location}
                  />
               )}
               {education && (
                  <Content
                     contentMb={contentMb}
                     title='Education'
                     text={education}
                  />
               )}
               {joined && (
                  <Content
                     contentMb={contentMb}
                     title='Joined'
                     text={joinOnDate(joined)}
                  />
               )}
            </Box>
         </Box>
      </Box>
   );
};

export default UserProfilePopup;
