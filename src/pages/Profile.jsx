import { Box, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TopLayer from '../components/profile/TopLayer';
import ProfileLeftPart from '../components/profile/ProfileLeftPart';
import ErrorMessage from '../utils/ErrorMessage';
import ProfileSkeleton from '../components/skeletons/ProfileSkeleton';
import { claculateWrittenComments } from '../helper/calculateTotal';
import ProfileRightPart from '../components/profile/ProfileRightPart';
import Error from './Error';

const Profile = () => {
   // scroll top
   const location = useLocation();

   useEffect(() => window.scrollTo(0, 0), [location]);

   const { username } = useParams();
   const [moreInfo, setMoreInfo] = useState(false);

   const { profileData, profileDataLoading, profileDataErr } = useSelector(
      (state) => state.profileData
   );

   const { transformedData } = useSelector((state) => state.transformedData);

   let currentUserProfile = null;
   let userId;
   if (profileData) {
      currentUserProfile = profileData.find(
         (data) => data.username === username
      );

      userId = currentUserProfile?.id;
   }

   if (profileDataErr) {
      return <ErrorMessage offline={true} />;
   }

   if (!currentUserProfile && !profileDataLoading) {
      return <Error />;
   }

   if (profileDataLoading) {
      return <ProfileSkeleton />;
   }

   let pinnedPosts = null;
   let otherPosts = null;
   let totalCommentWritten = 0;

   if (transformedData) {
      otherPosts = transformedData
         .filter(
            (postData) =>
               postData.userId === userId && !postData.draft && !postData.pinned
         )
         .sort((a, b) => b.createdAt - a.createdAt);

      pinnedPosts = transformedData
         .filter((postData) => postData.userId === userId && postData.pinned)
         .sort((a, b) => b.createdAt - a.createdAt);

      totalCommentWritten = transformedData.reduce(
         (count, postItem) =>
            count + claculateWrittenComments(postItem.comments, userId),
         0
      );
   }

   const totalPublishPosts =
      (pinnedPosts?.length || 0) + (otherPosts?.length || 0);

   return (
      <Box mt='-.5rem !important' w='100%' flex='1'>
         <Box
            h={['7rem', '7rem', '9rem']}
            background={currentUserProfile?.background || '#000000'}
         />
         <Box mx={{ base: 'none', md: '.5rem' }}>
            <Box maxW='1000px' mx='auto'>
               <TopLayer
                  profileData={currentUserProfile}
                  moreInfo={moreInfo}
                  setMoreInfo={setMoreInfo}
               />

               {/* bottom layer */}
               <Flex
                  mt='1rem'
                  align='flex-start'
                  flexDir={{ base: 'column', md: 'row' }}
               >
                  {/* left */}
                  <ProfileLeftPart
                     publishedPosts={totalPublishPosts}
                     profileData={currentUserProfile}
                     totalCommentWritten={totalCommentWritten}
                     display={{
                        base: !moreInfo && 'none',
                        md: 'block',
                     }}
                  />

                  {/* right */}
                  <ProfileRightPart
                     pinnedPosts={pinnedPosts}
                     otherPosts={otherPosts}
                  />
               </Flex>
            </Box>
         </Box>
      </Box>
   );
};

export default Profile;
