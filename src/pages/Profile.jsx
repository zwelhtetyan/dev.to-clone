import { Box, Button, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/auth';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PostItem from '../components/post/PostItem';
import AllPostSkeletons from '../components/skeletons/AllPostSkeletons';

import TopLayer from '../components/profile/TopLayer';
import ProfileLeftPart from '../components/profile/ProfileLeftPart';

const Profile = () => {
   //scroll top
   useEffect(() => window.scrollTo(0, 0), []);

   const profileData = useSelector((state) => state.profileData.profileData);

   const [moreInfo, setMoreInfo] = useState(false);

   const {
      transformedData,
      transfromedDataLoading: loading,
      transformedDataErr: err,
   } = useSelector((state) => state.transformedData);

   const user = useAuth();

   if (!user) {
      return <Navigate to='/login' />;
   }

   let publishedPosts = null;
   if (transformedData && !loading && !err) {
      publishedPosts = transformedData.filter(
         (postData) => postData.userId === user.userId
      );
   }

   return (
      <Box mt='-.5rem !important'>
         <Box
            h={['7rem', '7rem', '9rem']}
            background={profileData?.background || '#000000'}
         />
         <Box mx={{ base: 'none', md: '.5rem' }}>
            <Box maxW='1000px' mx='auto'>
               <TopLayer profileData={profileData} />

               <Flex
                  mt='1rem'
                  color='rgb(64 64 64)'
                  align='flex-start'
                  flexDir={{ base: 'column', md: 'row' }}
               >
                  {/* left */}
                  <ProfileLeftPart
                     publishedPosts={publishedPosts}
                     profileData={profileData}
                     display={{ base: !moreInfo && 'none', md: 'block' }}
                  />

                  {/* more info button */}
                  <Button
                     display={{ base: moreInfo ? 'none' : 'block', md: 'none' }}
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
                     More info about @{profileData?.name}
                  </Button>

                  {/* right */}
                  <Box
                     flex={{ base: 'unset', md: '2' }}
                     borderRadius='5px'
                     w={{ base: '100%' }}
                     px={{ base: '.5rem', md: 'unset' }}
                  >
                     <>
                        {loading && <AllPostSkeletons />}
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
                              />
                           ))}
                     </>
                  </Box>
               </Flex>
            </Box>
         </Box>
      </Box>
   );
};

export default Profile;
