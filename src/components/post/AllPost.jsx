import React from 'react';
import { Box } from '@chakra-ui/react';
import PostItemSkeleton from '../skeletons/PostItemSkeleton';
import PostItem from './PostItem';
import { useSelector } from 'react-redux';
import ErrorMessage from '../../utils/ErrorMessage';
import { getUserProfileData } from '../../helper/getUserProfileData';
import { useAuth } from '../../context/auth';
import Hero from '../Hero';

const AllPost = () => {
   const user = useAuth();

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

   return (
      <Box flex='2' maxW={{ base: '100%', md: '650px' }}>
         {!user && !err && (
            <Hero
               display={{ base: 'none', md: 'flex' }}
               isLogo={true}
               onClose={() => {}}
            />
         )}

         <Box h={loading ? 'calc(100vh - 120px)' : 'auto'}>
            {err && <ErrorMessage offline={true} />}

            {loading && !err && (
               <>
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
                  />
               ))}
         </Box>
      </Box>
   );
};

export default AllPost;
