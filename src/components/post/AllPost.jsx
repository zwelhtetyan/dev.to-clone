import React from 'react';
import { Box } from '@chakra-ui/react';
import AllPostSkeletons from '../skeletons/AllPostSkeletons';
import PostItem from './PostItem';
import { useSelector } from 'react-redux';
import ErrorMessage from '../../utils/ErrorMessage';

const AllPost = () => {
   const { allPostData, postStatus } = useSelector(
      (state) => state.allPostData
   );

   const { userData, userStatus } = useSelector((state) => state.userData);

   const loading = postStatus.loading || userStatus.loading;
   const err = postStatus.err || userStatus.err;

   // modified data logic start
   let modifiedPostData = null;

   if (userData && allPostData && !loading && !err) {
      const changedPostData = allPostData.map((postData) => {
         const userInfo = userData.find((data) => data.id === postData.userId);

         return {
            ...postData,
            name: userInfo.name,
            profile: userInfo.porfile,
         };
      });

      modifiedPostData = changedPostData;
   }
   //modified data logic end

   return (
      <Box h={err ? '50vh' : 'auto'}>
         {err && <ErrorMessage />}

         {loading && !err && (
            <>
               <AllPostSkeletons />
               <AllPostSkeletons />
               <AllPostSkeletons />
            </>
         )}

         {modifiedPostData &&
            !loading &&
            !err &&
            modifiedPostData.map((postData) => (
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
               />
            ))}
      </Box>
   );
};

export default AllPost;
