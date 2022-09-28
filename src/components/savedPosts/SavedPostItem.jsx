import React from 'react';
import { Box, Flex, HStack, Text, WrapItem } from '@chakra-ui/react';
import CustomAvatar from '../../utils/CustomAvatar';
import { useNavigate } from 'react-router-dom';
import { dateFormat } from '../../helper/calcTimestamp';
import { nanoid } from '@reduxjs/toolkit';
import LangTag from '../../utils/LangTag';
import { SecondaryBtn } from '../../utils/Buttons';
import { saveArchive } from '../../lib/api';
import { useAuth } from '../../context/auth';
import { useState } from 'react';
import { titleRoute } from '../../helper/titleRoute';
import useClickTag from '../../hooks/useClickTag';
import { useDispatch } from 'react-redux';
import { setClickComment } from '../../store/scrollDiscussion';

const SavedPostItem = ({ postData, isArchive }) => {
   const navigate = useNavigate();
   const user = useAuth();
   const { userId } = user;
   const dispatch = useDispatch();

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

   const handleNavigate = () => {
      navigate(
         `/${titleRoute(postData.username, postData.title, postData.id)}`
      );
      dispatch(setClickComment(false));
   };

   const handleClickTag = useClickTag();

   return (
      <HStack as='article' justify='space-between'>
         <Flex mb='1.5rem' align='flex-start' flex='1'>
            <CustomAvatar
               profile={postData.profile}
               size='40px'
               onClick={() => navigate(`/${postData.username}`)}
            />
            <Box ms='.5rem' flex='1'>
               <Text
                  fontWeight={600}
                  _hover={{ color: 'rgb(47 58 178)' }}
                  cursor='pointer'
                  onClick={handleNavigate}
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
                     onClick={() => navigate(`/${postData.username}`)}
                  >
                     {postData.name}
                  </Text>
                  <Text>• {dateFormat(postData.createdAt)}</Text>
                  <Text>• {postData.readTime} min read</Text>
                  {postData.tags.length !== 0 && (
                     <>
                        <Text ps='2px'>•</Text>
                        {postData.tags?.map((tag) => (
                           <WrapItem
                              key={nanoid()}
                              color='rgb(64 64 64)'
                              onClick={(e) => handleClickTag(e, tag.tagName)}
                           >
                              <LangTag tag={tag} />
                           </WrapItem>
                        ))}
                     </>
                  )}
               </HStack>
            </Box>
         </Flex>

         <SecondaryBtn
            onClick={handleClickArchive}
            disabled={loading}
            p='0 .7rem'
         >
            {isArchive
               ? loading
                  ? 'Unarchiving'
                  : 'Unarchive'
               : loading
               ? 'Archiving'
               : 'Archive'}
         </SecondaryBtn>
      </HStack>
   );
};

export default SavedPostItem;
