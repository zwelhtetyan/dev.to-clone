import React from 'react';
import {
   Box,
   Divider,
   HStack,
   Image,
   Text,
   useColorModeValue,
} from '@chakra-ui/react';
import { doc, commentLg, tag } from '../../assets/icons';

const ProfileLeftPart = ({
   publishedPosts,
   profileData,
   display,
   totalCommentWritten,
}) => {
   const cardBg = useColorModeValue(
      'light.cardSecondaryBg',
      'dark.cardSecondaryBg'
   );

   const cardColor = useColorModeValue(
      'light.cardSecondaryColor',
      'dark.cardSecondaryColor'
   );

   const ghostColor = useColorModeValue('light.ghostColor', 'dark.ghostColor');

   const TechStack = ({ title, text }) => {
      return (
         <Box
            bg={cardBg}
            color={cardColor}
            p={{ base: '1rem .5rem', md: '1rem' }}
            borderRadius='5px'
            mb={{ base: 1, md: 3 }}
            className='shadowSecondary'
         >
            <Text fontWeight={700} fontSize='18px' color={cardColor}>
               {title}
            </Text>
            <Divider mt={3} mb={5} />
            <Text color={ghostColor}>{text}</Text>
         </Box>
      );
   };

   const totalFollowingTags = profileData.followingTags?.length || 0;

   return (
      <Box
         m={{ base: '0 0 1rem 0', md: '0 1rem 0 0' }}
         flex={{ base: 'unset', md: '1' }}
         w={{ base: '100%' }}
         display={display}
      >
         {profileData.learning && (
            <TechStack title='Currently Learning' text={profileData.learning} />
         )}

         {profileData.skills && (
            <TechStack title='Skills/Languages' text={profileData.skills} />
         )}

         {profileData.hacking && (
            <TechStack
               title='Currently hacking on'
               text={profileData.hacking}
            />
         )}

         {profileData.avaliable && (
            <TechStack title='Available for' text={profileData.avaliable} />
         )}

         <Box
            className='shadowSecondary'
            bg={cardBg}
            color={cardColor}
            p={{ base: '1.5rem .5rem', md: '1.5rem 1rem' }}
            borderRadius='5px'
         >
            <HStack mb='.7rem'>
               <Image src={doc} alt='doc_icon' />
               <Text>
                  {publishedPosts} {publishedPosts > 1 ? 'posts' : 'post'}{' '}
                  published
               </Text>
            </HStack>

            <HStack mb='.7rem'>
               <Image src={commentLg} alt='comment_icon' />
               <Text>
                  {totalCommentWritten}{' '}
                  {totalCommentWritten > 1 ? 'comments' : 'comment'} written
               </Text>
            </HStack>

            <HStack>
               <Image src={tag} alt='tag_icon' />
               <Text>
                  {totalFollowingTags} {totalFollowingTags > 1 ? 'tags' : 'tag'}{' '}
                  followed
               </Text>
            </HStack>
         </Box>
      </Box>
   );
};

export default ProfileLeftPart;
