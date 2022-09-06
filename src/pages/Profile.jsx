import { Box, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PostItem from '../components/post/PostItem';
import TopLayer from '../components/profile/TopLayer';
import ProfileLeftPart from '../components/profile/ProfileLeftPart';
import ErrorMessage from '../utils/ErrorMessage';
import ProfileSkeleton from '../components/skeletons/ProfileSkeleton';
import {
   calcTotalDiscussion,
   calculateReaction,
   claculateWrittenComments,
} from '../helper/calculateTotal';
import { useAuth } from '../context/auth';

const Profile = () => {
   const user = useAuth();
   const userId = user?.userId;
   const [alreadyInProfile, setAlreadyInProfile] = useState(false);

   //scroll top
   useEffect(() => window.scrollTo(0, 0), [alreadyInProfile]);

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

   let publishedPosts = null;
   let totalCommentWritten = 0;

   if (transformedData && !loading && !err) {
      publishedPosts = transformedData.filter(
         (postData) => postData.userId === userIdToView && !postData.draft
      );

      totalCommentWritten = transformedData.reduce(
         (count, postItem) =>
            count + claculateWrittenComments(postItem.comments, userIdToView),
         0
      );
   }

   if (transformedData && currentUserProfile === undefined) {
      return <ErrorMessage urlNotFound={true} />;
   }

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
                     publishedPosts={publishedPosts}
                     profileData={currentUserProfile}
                     totalCommentWritten={totalCommentWritten}
                     display={{
                        base: !moreInfo && 'none',
                        md: 'block',
                     }}
                  />

                  {/* right */}
                  <Box
                     flex={{ base: 'unset', md: '2' }}
                     borderRadius='5px'
                     w={{ base: '100%' }}
                  >
                     {publishedPosts &&
                        publishedPosts.map((postData) => (
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
                              currentUserId={userId} // authenticated userId
                              setAlreadyInProfile={setAlreadyInProfile}
                              totalDiscussion={calcTotalDiscussion(
                                 postData.comments
                              )}
                              totalReaction={calculateReaction(
                                 postData.heart,
                                 postData.unicorn,
                                 postData.saved
                              )}
                           />
                        ))}
                  </Box>
               </Flex>
            </Box>
         </Box>
      </Box>
   );
};

export default Profile;
