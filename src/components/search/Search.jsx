import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../context/auth';
import {
   calcTotalDiscussion,
   calculateReaction,
} from '../../helper/calculateTotal';
import { getUserProfileData } from '../../helper/getUserProfileData';
import useGetQuerySearchTerm from '../../hooks/useGetQuerySearchTerm';
import ErrorMessage from '../../utils/ErrorMessage';
import PostItem from '../post/PostItem';
import PostItemSkeleton from '../skeletons/PostItemSkeleton';
import SearchInput from './SearchInput';

const Search = () => {
   const user = useAuth();
   const searchInputRef = useRef();

   const querySearchTerm = useGetQuerySearchTerm('spq') || '';

   // scroll top
   useEffect(() => window.scrollTo(0, 0), [querySearchTerm]);

   const {
      transformedData,
      transformedDataLoading: loading,
      transformedDataErr: err,
   } = useSelector((state) => state.transformedData);

   const profileData = useSelector((state) => state.profileData.profileData);

   let allPostData = null;
   if (transformedData && !loading && !err) {
      allPostData = transformedData.filter((postData) => !postData.draft);
   }

   const searchedPostData = allPostData?.filter(
      (postData) =>
         postData.title.toLowerCase().includes(querySearchTerm.toLowerCase()) ||
         postData.name.toLowerCase().includes(querySearchTerm.toLowerCase())
   );

   const searchTermColor = useColorModeValue(
      'light.headingHover',
      'dark.headingHover'
   );
   const cardBg = useColorModeValue('light.cardBg', 'dark.cardBg');

   if (loading) {
      return (
         <Box flex='1' w='100%' maxW='650px'>
            <PostItemSkeleton />
            <PostItemSkeleton />
            <PostItemSkeleton />
         </Box>
      );
   }

   if (err) {
      return <ErrorMessage offline={true} />;
   }

   return (
      <Box flex={1} maxW={{ base: '100%', md: '650px' }} w='100%'>
         <SearchInput
            ref={searchInputRef}
            querySearchTerm={querySearchTerm}
            display={{ base: 'block', md: 'none' }}
            mb={5}
            route='search'
         />

         {searchedPostData && searchedPostData.length !== 0 ? (
            <>
               {querySearchTerm && (
                  <Heading
                     fontSize={{ base: '1.3rem', md: '1.5rem' }}
                     mb={4}
                     display={{ base: 'none', md: 'block' }}
                  >
                     Search results for '{' '}
                     <Text as='span' color={searchTermColor}>
                        {querySearchTerm}
                     </Text>{' '}
                     '
                  </Heading>
               )}

               {searchedPostData.map((postData) => (
                  <PostItem
                     key={postData.id}
                     name={postData.name}
                     username={postData.username}
                     profile={postData.profile}
                     coverImg={postData.cvImg}
                     id={postData.id}
                     createdAt={postData.createdAt}
                     title={postData.title}
                     tags={postData.tags}
                     readTime={postData.readTime}
                     isUpdated={postData?.updated}
                     userId={postData.userId}
                     currentUserId={user?.userId} // authenticated userId
                     showHover={true}
                     currentUserProfile={getUserProfileData(
                        profileData,
                        postData.userId
                     )}
                     totalDiscussion={calcTotalDiscussion(postData.comments)}
                     totalReaction={calculateReaction(
                        postData.heart,
                        postData.unicorn,
                        postData.saved
                     )}
                     saved={postData.saved}
                     alreadySaved={postData.saved?.includes(user?.userId)}
                  />
               ))}
            </>
         ) : (
            <Box
               mt={5}
               p='5rem 1rem'
               textAlign='center'
               borderRadius='5px'
               bg={cardBg}
               className='shadow'
            >
               No results match that query 🤔
            </Box>
         )}
      </Box>
   );
};

export default Search;
