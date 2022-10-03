import React from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { joinOnDate } from '../../helper/calcTimestamp';
import { useNavigate } from 'react-router-dom';
import { LightBtn, PrimaryBtn } from '../../utils/Buttons';
import useClickFollow from '../../hooks/useFollowUser';
import defaultProfile from '../../assets/images/default_profile.webp';

const UserProfilePopup = ({
   background,
   profile,
   name,
   username,
   bio,
   work,
   location,
   education,
   joined,
   id,
   currentUserId,
   followers,
   w,
   p,
   m,
   backgroundHeight,
   pos,
   display,
   zIndex,
   borderRadius,
   boxShadow,
}) => {
   const navigate = useNavigate();

   const { handleClickFollow, loading } = useClickFollow(
      { id, followers },
      currentUserId
   );

   const alreadyFollow = followers.includes(currentUserId);

   const ghostColor = useColorModeValue('light.ghostColor', 'dark.ghostColor');
   const base70 = useColorModeValue('light.base70', 'dark.base70');
   const colorTertiary = useColorModeValue(
      'light.colorTertiary',
      'dark.colorTertiary'
   );

   const Content = ({ title, text }) => {
      return (
         <Box mb='.5rem'>
            <Text
               textTransform='uppercase'
               fontSize='14px'
               fontWeight='600'
               color={colorTertiary}
            >
               {title}
            </Text>
            <Text fontSize='15px' color={ghostColor}>
               {text}
            </Text>
         </Box>
      );
   };

   return (
      <Box
         w={w || '300px'}
         borderRadius={borderRadius}
         m={m}
         pos={pos}
         zIndex={zIndex}
         display={display}
         className='profilePopup'
         bg={useColorModeValue('light.cardSecondaryBg', 'dark.cardSecondaryBg')}
         boxShadow={boxShadow}
         overflow='hidden'
         transitionDelay='.5s'
         onClick={(e) => e.stopPropagation()}
      >
         <Box bg={background || '#000000'} h={backgroundHeight || '45px'} />
         <Box pos='relative'>
            <Box
               bgImage={profile || defaultProfile}
               bgColor={background || '#000000'}
               borderWidth='4px'
               borderColor={background || '#000000'}
               pos='absolute'
               boxSize='55px'
               bgPos='center'
               bgSize='cover'
               rounded='full'
               bgRepeat='no-repeat'
               top='-23px'
               left='1rem'
               cursor='pointer'
               onClick={() => navigate(`/${username}`)}
            />
            <Box p={p || '.5rem .7rem'} pt='.2rem'>
               <Text
                  ps='4.2rem'
                  fontSize='1.3rem'
                  fontWeight='600'
                  cursor='pointer'
                  color={ghostColor}
                  _hover={{
                     color: useColorModeValue(
                        'light.headingHover',
                        'dark.headingHover'
                     ),
                  }}
                  onClick={() => navigate(`/${username}`)}
               >
                  {name}
               </Text>

               {!alreadyFollow && (
                  <PrimaryBtn
                     w='100%'
                     m='.5rem 0'
                     bg='light.primary'
                     onClick={handleClickFollow}
                     disabled={loading}
                  >
                     {id === currentUserId ? 'Edit Profile' : 'Follow'}
                  </PrimaryBtn>
               )}

               {alreadyFollow && (
                  <LightBtn onClick={handleClickFollow} disabled={loading}>
                     Following
                  </LightBtn>
               )}

               <Text
                  color={base70}
                  letterSpacing='.3px'
                  mb='.7rem'
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

export default UserProfilePopup;
