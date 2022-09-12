import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import {
   calcTotalDiscussion,
   calculateReaction,
} from '../../helper/calculateTotal';
import { getUserProfileData } from '../../helper/getUserProfileData';
import ErrorMessage from '../../utils/ErrorMessage';
import PostItem from '../post/PostItem';
import PostItemSkeleton from '../skeletons/PostItemSkeleton';
import SearchInput from './SearchInput';

const Search = () => {
   const location = useLocation();
   const user = useAuth();

   const queryParam = new URLSearchParams(location.search);
   const querySearchTerm = queryParam.get('q') || '';

   // scroll top
   useEffect(() => window.scrollTo(0, 0), [querySearchTerm]);

   const {
      transformedData,
      transfromedDataLoading: loading,
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
         <SearchInput display={{ base: 'block', md: 'none' }} mb={5} />

         {searchedPostData && searchedPostData.length !== 0 ? (
            <>
               {querySearchTerm && (
                  <Heading
                     fontSize={{ base: '1.3rem', md: '1.5rem' }}
                     mb={4}
                     display={{ base: 'none', md: 'block' }}
                  >
                     Search results for '{' '}
                     <Text as='span' color='rgb(47 58 178)'>
                        {querySearchTerm}
                     </Text>{' '}
                     '
                  </Heading>
               )}

               {searchedPostData.map((postData) => (
                  <PostItem
                     key={postData.id}
                     name={postData.name}
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
               bg='white'
               boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
            >
               No results match that query 🤔
            </Box>
         )}
      </Box>
   );
};

export default Search;
