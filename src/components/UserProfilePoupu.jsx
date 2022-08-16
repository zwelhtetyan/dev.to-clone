import React from 'react';
import { Box, Text, Tooltip } from '@chakra-ui/react';
import { joinOnDate } from '../helper/joinOnDate';

const Content = ({ title, text }) => {
   return (
      <Box mb='.3rem'>
         <Text textTransform='uppercase' fontSize='15' fontWeight='600'>
            {title}
         </Text>
         <Text fontSize='15px' mt='-.3rem'>
            {text}
         </Text>
      </Box>
   );
};

export const TooltipWrapper = ({ children, currentUserProfile }) => {
   return (
      <Tooltip
         closeOnMouseDown={false}
         label={
            <UserProfilePoupu
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

const UserProfilePoupu = ({
   background,
   profile,
   name,
   bio,
   work,
   location,
   education,
   joined,
}) => {
   return (
      <Box w='300px' borderRadius='5px' overflow='hidden'>
         <Box bg={background} h='45px'></Box>
         <Box bg='white' pos='relative'>
            <Box
               bgImage={profile}
               pos='absolute'
               boxSize='55px'
               bgPos='center'
               bgSize='cover'
               rounded='full'
               bgRepeat='no-repeat'
               top='-27.5px'
               left='1rem'
            />
            <Box p='.5rem' pt='.2rem'>
               <Text ps='4.5rem' fontSize='1.3rem' fontWeight='600'>
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
               {work && <Content title='Work' text={work} />}
               {location && <Content title='Location' text={location} />}
               {education && <Content title='Education' text={education} />}
               {joined && <Content title='Joined' text={joinOnDate(joined)} />}
            </Box>
         </Box>
      </Box>
   );
};

export default UserProfilePoupu;
