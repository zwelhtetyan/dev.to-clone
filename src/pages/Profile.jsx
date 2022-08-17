import { Box, Button, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PostItem from '../components/post/PostItem';
import TopLayer from '../components/profile/TopLayer';
import ProfileLeftPart from '../components/profile/ProfileLeftPart';
import ErrorMessage from '../utils/ErrorMessage';
import ProfileSkeleton from '../components/skeletons/ProfileSkeleton';

const Profile = () => {
   //scroll top
   useEffect(() => window.scrollTo(0, 0), []);

   const { userIdToView } = useParams();

   const { profileData } = useSelector((state) => state.profileData);

   const [moreInfo, setMoreInfo] = useState(false);

   const {
      transformedData,
      transfromedDataLoading: loading,
      transformedDataErr: err,
   } = useSelector((state) => state.transformedData);

   if (err) {
      return <ErrorMessage offline={true} />;
   }

   if (loading && !transformedData && !err) {
      return <ProfileSkeleton />;
   }

   let currentUserProfile = null;
   if (profileData) {
      currentUserProfile = profileData.find((data) => data.id === userIdToView);
   }

   let publishedPosts = null;
   if (transformedData && !loading && !err) {
      publishedPosts = transformedData.filter(
         (postData) => postData.userId === userIdToView && !postData.draft
      );
   }

   if (transformedData && currentUserProfile === undefined) {
      return <ErrorMessage urlNotFound={true} />;
   }

   return (
      <Box mt='-.5rem !important'>
         <Box
            h={['7rem', '7rem', '9rem']}
            background={currentUserProfile?.background || '#000000'}
         />
         <Box mx={{ base: 'none', md: '.5rem' }}>
            <Box maxW='1000px' mx='auto'>
               <TopLayer profileData={currentUserProfile} />

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
                     display={{ base: !moreInfo && 'none', md: 'block' }}
                  />

                  {/* more info button */}
                  {publishedPosts && (
                     <Button
                        display={{
                           base: moreInfo ? 'none' : 'block',
                           md: 'none',
                        }}
                        onClick={() => setMoreInfo(true)}
                        w='97%'
                        mx='auto'
                        mb={3}
                        bg='white'
                        _active={{ bg: 'white' }}
                        boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
                        transition='.3s'
                        _hover={{
                           bg: 'rgb(0 0 0 / 4%)',
                        }}
                     >
                        More info about @{currentUserProfile?.name}
                     </Button>
                  )}

                  {/* right */}
                  <Box
                     flex={{ base: 'unset', md: '2' }}
                     borderRadius='5px'
                     w={{ base: '100%' }}
                     px={{ base: '.5rem', md: 'unset' }}
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
                              tags={postData.filteredTags}
                              readTime={postData.readTime}
                              isUpdated={postData?.isUpdated}
                              userId={postData.userId}
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
