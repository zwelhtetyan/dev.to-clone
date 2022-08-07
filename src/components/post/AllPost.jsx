import React from 'react';
import { Box } from '@chakra-ui/react';
import AllPostSkeletons from '../skeletons/AllPostSkeletons';
import PostItem from './PostItem';
import { useSelector } from 'react-redux';
import ErrorMessage from '../../utils/ErrorMessage';

const AllPost = () => {
   const { allPostData, loading, err } = useSelector(
      (state) => state.allPostData
   );

   return (
      <Box mt={{ base: '0', md: '2rem' }}>
         {err && <ErrorMessage />}

         {loading && !err && (
            <>
               <AllPostSkeletons />
               <AllPostSkeletons />
               <AllPostSkeletons />
            </>
         )}

         {allPostData &&
            !loading &&
            !err &&
            allPostData.map((postData) => (
               <PostItem
                  key={postData.id}
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
