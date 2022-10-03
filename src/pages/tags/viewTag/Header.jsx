import React from 'react';
import {
   Box,
   Heading,
   HStack,
   Image,
   Text,
   useColorModeValue,
} from '@chakra-ui/react';
import { LightBtn, PrimaryBtn } from '../../../utils/Buttons';
import useFollowTag from '../../../hooks/useFollowTag';

const Header = ({
   logo,
   tagName,
   description,
   brandColor,
   userId,
   profileData,
   loading,
}) => {
   const { followTagHandler, loading: followLoading } =
      useFollowTag(profileData);

   const handleClickFollow = () => followTagHandler(tagName);

   const currentUserProfile = profileData?.find((data) => data.id === userId);
   const alreadyFollow = currentUserProfile?.followingTags?.includes(tagName);

   return (
      <Box
         borderRadius={{ base: 0, md: '5px' }}
         bg={useColorModeValue('light.cardBg', 'dark.cardBg')}
         className='shadow'
         borderTop={`1rem solid ${brandColor}`}
         p={{ base: '.7rem', md: '1.5rem' }}
      >
         <HStack align='flex-start'>
            {logo && (
               <Image
                  src={logo}
                  boxSize='64px'
                  transform='rotate(-25deg)'
                  alt='tag_logo'
               />
            )}

            <Box flex={1}>
               <HStack w='100%' justify='space-between'>
                  <Heading
                     textTransform='capitalize'
                     fontSize='1.5rem'
                     flex={1}
                     overflowWrap='anywhere'
                  >
                     {tagName}
                  </Heading>

                  {!loading && (
                     <>
                        {alreadyFollow ? (
                           <LightBtn
                              w='auto'
                              m='0'
                              disabled={followLoading}
                              onClick={handleClickFollow}
                           >
                              Following
                           </LightBtn>
                        ) : (
                           <PrimaryBtn
                              bg='light.primary'
                              disabled={followLoading}
                              onClick={handleClickFollow}
                           >
                              Follow
                           </PrimaryBtn>
                        )}
                     </>
                  )}
               </HStack>

               {description && (
                  <Text maxW={{ base: '100%', md: '75%' }} mt={2}>
                     {description}
                  </Text>
               )}
            </Box>
         </HStack>
      </Box>
   );
};

export default Header;
