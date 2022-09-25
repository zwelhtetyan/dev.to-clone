import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import SavedPostItem from './SavedPostItem';
import { BsBookmark } from 'react-icons/bs';
import SavedPostItemSkeleton from '../skeletons/SavedPostItemSkeleton';
import { useLocation } from 'react-router-dom';

const Container = ({ children }) => {
   return (
      <Box
         flex='1'
         p={['.5rem', '.5rem', '1rem']}
         borderRadius='5px'
         bg='white'
         boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
         ms={{ base: '0 !important', md: '.5rem !important' }}
      >
         {children}
      </Box>
   );
};

const NoFilteredPostMessage = () => {
   return (
      <Box px='1rem' py={{ base: '3rem', sm: '7rem' }}>
         <Text textAlign='center' fontWeight={600} fontSize='1.1rem'>
            Nothing with this filter 🤔
         </Text>
      </Box>
   );
};

const Right = ({
   savedPosts,
   archivedPosts,
   selectedTagName,
   searchTerm,
   loading,
}) => {
   const location = useLocation();

   const queryParam = new URLSearchParams(location.search);
   const query = queryParam.get('');

   let transformedSavedPosts = [];

   const currentPosts = query ? archivedPosts : savedPosts;

   currentPosts.forEach((postData) => {
      const tags = postData.tags;

      if (selectedTagName === 'All tags') {
         transformedSavedPosts = currentPosts;
         return;
      }

      if (
         tags.length !== 0 &&
         tags.find((item) => item.tagName === selectedTagName)
      ) {
         transformedSavedPosts.push(postData);
      }
   });

   const filteredPosts = transformedSavedPosts.filter((postData) =>
      postData.title.toLowerCase().includes(searchTerm.toLowerCase())
   );

   if (!loading && currentPosts.length === 0) {
      return (
         <Container>
            <Box px='1rem' py={{ base: '3rem', sm: '7rem' }}>
               <Text textAlign='center' fontWeight={600} fontSize='1.1rem'>
                  Your {query ? 'archive' : 'reading'} list is empty
               </Text>

               {!query && (
                  <Text
                     color='#717171'
                     justifyContent='center'
                     display='flex'
                     alignItems='center'
                     flexWrap='wrap'
                     mt='.2rem'
                     textAlign='center'
                  >
                     Click the
                     <Text
                        as='span'
                        fontWeight={600}
                        display='inline-block'
                        ms='.3rem'
                     >
                        bookmark reaction
                     </Text>{' '}
                     <BsBookmark
                        style={{ display: 'inline-block', margin: '0 .3rem' }}
                        size={20}
                     />{' '}
                     when viewing a post to add it to your reading list.
                  </Text>
               )}
            </Box>
         </Container>
      );
   }

   return (
      <Container>
         {loading && <SavedPostItemSkeleton />}
         {!loading && filteredPosts.length === 0 && <NoFilteredPostMessage />}
         {filteredPosts.map((postData) => (
            <SavedPostItem
               key={postData.id}
               postData={postData}
               isArchive={query}
            />
         ))}
      </Container>
   );
};

export default Right;
