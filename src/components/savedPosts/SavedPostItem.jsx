import React from 'react';
import { Box, Flex, HStack, Text, WrapItem } from '@chakra-ui/react';
import CustomAvatar from '../../utils/CustomAvatar';
import { useNavigate } from 'react-router-dom';
import { dateFormat } from '../../helper/calcTimestamp';
import { nanoid } from 'nanoid';
import LangTag from '../../utils/LangTag';
import { SecondaryBtn } from '../../utils/Buttons';
import { saveArchive } from '../../lib/api';
import { useAuth } from '../../context/auth';
import { useState } from 'react';

const SavedPostItem = ({ postData, isArchive }) => {
   const navigate = useNavigate();
   const user = useAuth();
   const { userId } = user;

   const [loading, setLoading] = useState(false);

   const handleClickArchive = () => {
      setLoading(true);
      const archivedPosts = postData.archived || [];

      const transformedArchivedPosts = archivedPosts.includes(userId)
         ? archivedPosts.filter((id) => id !== userId)
         : [...archivedPosts, userId];

      saveArchive({ archived: transformedArchivedPosts }, postData.id)
         .then((_) => {
            setLoading(false);
            console.log('archived');
         })
         .catch((err) => {
            setLoading(false);
            console.log(err);
         });
   };

   return (
      <HStack as='article' justify='space-between'>
         <Flex mb='1.5rem' align='flex-start' flex='1'>
            <CustomAvatar
               profile={postData.profile}
               size={{ base: '32px', md: '35px' }}
               onClick={() => navigate(`/profile/${postData.userId}`)}
            />
            <Box ms='.5rem' flex='1'>
               <Text
                  fontWeight={600}
                  _hover={{ color: 'rgb(47 58 178)' }}
                  cursor='pointer'
                  onClick={() => navigate(`/details/${postData.id}`)}
               >
                  {postData.title}
               </Text>
               <HStack
                  fontSize='13px'
                  color='#717171'
                  spacing='2px'
                  wrap='wrap'
               >
                  <Text
                     _hover={{ color: 'rgb(47 58 178)' }}
                     cursor='pointer'
                     onClick={() => navigate(`/profile/${postData.userId}`)}
                  >
                     {postData.name}
                  </Text>
                  <Text>• {dateFormat(postData.createdAt)}</Text>
                  <Text>• {postData.readTime} min read</Text>
                  {postData.tags.length !== 0 && (
                     <>
                        <Text ps='2px'>•</Text>
                        {postData.tags?.map((tag) => (
                           <WrapItem key={nanoid()} color='rgb(64 64 64)'>
                              <LangTag tag={tag} />
                           </WrapItem>
                        ))}
                     </>
                  )}
               </HStack>
            </Box>
         </Flex>

         <SecondaryBtn onClick={handleClickArchive} disabled={loading}>
            {isArchive ? 'Unarchive' : 'Archive'}
         </SecondaryBtn>
      </HStack>
   );
};

export default SavedPostItem;
