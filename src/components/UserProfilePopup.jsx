import React from 'react';
import { Box, Text } from '@chakra-ui/react';
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
   pos,
   display,
   zIndex,
   boxShadow,
   borderRadius,
}) => {
   const navigate = useNavigate();

   return (
      <Box
         w={w || '300px'}
         borderRadius={borderRadius}
         pos={pos}
         zIndex={zIndex}
         display={display}
         className='profilePopup'
         bg='#fafafa'
         boxShadow={boxShadow}
         overflow='hidden'
         onClick={(e) => e.stopPropagation()}
      >
         <Box bg={background || '#000000'} h={backgroundHeight || '45px'} />
         <Box pos='relative'>
            <Box
               bgImage={profile}
               bgColor={background || '#000000'}
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
