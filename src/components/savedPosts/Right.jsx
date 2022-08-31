import { Box, Flex, HStack, Text, WrapItem } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { dateFormat } from '../../helper/calcTimestamp';
import { SecondaryBtn } from '../../utils/Buttons';
import CustomAvatar from '../../utils/CustomAvatar';
import LangTag from '../../utils/LangTag';

const Right = ({ savedPosts, selectedTopic, searchTerm }) => {
   const navigate = useNavigate();

   let transformedSavedPosts = [];

   savedPosts.forEach((postData) => {
      const tags = postData.tags;

      if (selectedTopic === 'All tags') {
         transformedSavedPosts = savedPosts;
         return;
      }

      if (
         tags.length !== 0 &&
         tags.find((item) => item.topic === selectedTopic)
      ) {
         transformedSavedPosts.push(postData);
      }
   });

   const filteredPosts = transformedSavedPosts.filter((postData) =>
      postData.title.toLowerCase().includes(searchTerm.toLowerCase())
   );

   return (
      <Box
         flex='1'
         borderRadius='5px'
         p={['.5rem', '.5rem', '1rem']}
         bg='white'
         boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
         ms={{ base: '0 !important', md: '.5rem !important' }}
      >
         {filteredPosts.map((postData) => (
            <HStack key={postData.id} as='article' justify='space-between'>
               <Flex mb='1.5rem' align='flex-start' flex='1'>
                  <CustomAvatar
                     profile={postData.profile}
                     size='35px'
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
                           onClick={() =>
                              navigate(`/profile/${postData.userId}`)
                           }
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

               <SecondaryBtn>Archive</SecondaryBtn>
            </HStack>
         ))}
      </Box>
   );
};

export default Right;
