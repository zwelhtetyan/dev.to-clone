import React from 'react';
import { Box } from '@chakra-ui/react';
import PostItemSkeleton from '../skeletons/PostItemSkeleton';
import PostItem from './PostItem';
import { useSelector } from 'react-redux';
import ErrorMessage from '../../utils/ErrorMessage';
import { getUserProfileData } from '../../helper/getUserProfileData';
import { useAuth } from '../../context/auth';
import Hero from '../Hero';
import {
   calcTotalDiscussion,
   calculateReaction,
} from '../../helper/calculateTotal';

const AllPost = ({ transformedData, loading, err }) => {
   const user = useAuth();

   const profileData = useSelector((state) => state.profileData.profileData);

   let allPostData = null;
   if (transformedData && !loading && !err) {
      allPostData = transformedData.filter((postData) => !postData.draft);
   }

   return (
      <Box flex='2' maxW={{ base: '100%', md: '650px' }}>
         {!user && !err && (
            <Hero
               display={{ base: 'none', md: 'flex' }}
               isLogo={true}
               onClose={() => {}}
            />
         )}

         <Box>
            {err && <ErrorMessage offline={true} />}

            {loading && !err && (
               <>
                  <PostItemSkeleton />
                  <PostItemSkeleton />
                  <PostItemSkeleton />
                  <PostItemSkeleton />
                  <PostItemSkeleton />
                  <PostItemSkeleton />
                  <PostItemSkeleton />
                  <PostItemSkeleton />
                  <PostItemSkeleton />
                  <PostItemSkeleton />
               </>
            )}

            {allPostData &&
               allPostData.map((postData) => (
                  <PostItem
                     key={postData.id}
                     name={postData.name}
                     profile={postData.profile}
                     id={postData.id}
                     createdAt={postData.createdAt}
                     title={postData.title}
                     tags={postData.tags}
                     readTime={postData.readTime}
                     isUpdated={postData?.updated}
                     userId={postData.userId}
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
                  />
               ))}
         </Box>
      </Box>
   );
};

export default AllPost;
