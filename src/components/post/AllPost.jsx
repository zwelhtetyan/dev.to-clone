import React from 'react';
import { Box } from '@chakra-ui/react';
import AllPostSkeletons from '../skeletons/AllPostSkeletons';
import PostItem from './PostItem';
import { useSelector } from 'react-redux';
import ErrorMessage from '../../utils/ErrorMessage';

const AllPost = () => {
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

   const getUserProfileData = (userId) => {
      return profileData.find((data) => data.userId === userId);
   };

   return (
      <Box h={err ? '63vh' : 'auto'}>
         {err && <ErrorMessage />}

         {loading && !err && (
            <>
               <AllPostSkeletons />
               <AllPostSkeletons />
               <AllPostSkeletons />
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
                  tags={postData.filteredTags}
                  readTime={postData.readTime}
                  isUpdated={postData?.isUpdated}
                  userId={postData.userId}
                  currentUserProfile={getUserProfileData(postData.userId)}
               />
            ))}
      </Box>
   );
};

export default AllPost;
