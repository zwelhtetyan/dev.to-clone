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

const Profile = () => {
   const [alreadyInProfile, setAlreadyInProfile] = useState(false);
   const location = useLocation();

   //scroll top
   useEffect(() => window.scrollTo(0, 0), [alreadyInProfile, location]);

   const { userIdToView } = useParams();
   const [moreInfo, setMoreInfo] = useState(false);

   const { profileData, profileDataLoading, profileDataErr } = useSelector(
      (state) => state.profileData
   );

   const { transformedData, transfromedDataLoading, transformedDataErr } =
      useSelector((state) => state.transformedData);

   const loading = profileDataLoading || transfromedDataLoading;
   const err = profileDataErr || transformedDataErr;

   if (err) {
      return <ErrorMessage offline={true} />;
   }

   if (loading) {
      return <ProfileSkeleton />;
   }

   let currentUserProfile = null;
   if (profileData) {
      currentUserProfile = profileData.find((data) => data.id === userIdToView);
   }

   let pinnedPosts = null;
   let otherPosts = null;
   let totalCommentWritten = 0;

   if (transformedData && !loading && !err) {
      otherPosts = transformedData
         .filter(
            (postData) =>
               postData.userId === userIdToView &&
               !postData.draft &&
               !postData.pinned
         )
         .sort((a, b) => b.createdAt - a.createdAt);

      pinnedPosts = transformedData
         .filter(
            (postData) => postData.userId === userIdToView && postData.pinned
         )
         .sort((a, b) => b.createdAt - a.createdAt);

      totalCommentWritten = transformedData.reduce(
         (count, postItem) =>
            count + claculateWrittenComments(postItem.comments, userIdToView),
         0
      );
   }

   if (transformedData && currentUserProfile === undefined) {
      return <ErrorMessage urlNotFound={true} />;
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
                  color='rgb(64 64 64)'
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
                     setAlreadyInProfile={setAlreadyInProfile}
                  />
               </Flex>
            </Box>
         </Box>
      </Box>
   );
};

export default Profile;
