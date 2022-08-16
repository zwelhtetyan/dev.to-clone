import React from 'react';
import { Box } from '@chakra-ui/react';
import AllPostSkeletons from '../skeletons/AllPostSkeletons';
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
      <Box>
         <Box px={{ base: '.5rem', md: '1rem' }} maxW='650px' m='auto'>
            {!user && !err && (
               <Hero display={{ base: 'none', md: 'flex' }} isLogo={true} />
            )}

            <Box h={loading ? 'calc(100vh - 120px)' : 'auto'}>
               {err && <ErrorMessage offline={true} />}

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
                        currentUserProfile={getUserProfileData(
                           profileData,
                           postData.userId
                        )}
                     />
                  ))}
            </Box>
         </Box>
      </Box>
   );
};

export default AllPost;
