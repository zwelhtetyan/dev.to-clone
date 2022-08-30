import {
   Box,
   Heading,
   HStack,
   Tab,
   TabList,
   TabPanel,
   TabPanels,
   Tabs,
   Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import DraftPostItem from '../components/post/DraftPostItem';
import PostItem from '../components/post/PostItem';
import DashboardSkeleton from '../components/skeletons/DashboardSkeleton';
import { useAuth } from '../context/auth';
import {
   calcTotalDiscussion,
   calculateReaction,
} from '../helper/calculateTotal';
import ErrorMessage from '../utils/ErrorMessage';

const ReactionBox = ({ count, title }) => {
   return (
      <Box
         flex='1'
         textAlign='center'
         bg='rgb(250 250 250)'
         boxShadow='0 0 0 1px rgb(23 23 23 / 5%)'
         p='1rem'
         borderRadius='5px'
      >
         <Heading>{count}</Heading>
         <Text>{title}</Text>
      </Box>
   );
};

const Dashboard = () => {
   //scroll top
   useEffect(() => window.scrollTo(0, 0), []);
   const location = useLocation();
   const navigate = useNavigate();

   const queryParam = new URLSearchParams(location.search);

   const defaultIndex = queryParam.get('category') === 'post' ? 0 : 1;

   const handleChangeTabs = (type) => {
      navigate(`/dashboard/?category=${type}`);
   };

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
   let draftPosts = null;
   if (transformedData && !loading && !err) {
      publishedPosts = transformedData.filter(
         (postData) => postData.userId === user.userId && !postData.draft
      );

      draftPosts = transformedData.filter(
         (postData) => postData.userId === user.userId && postData.draft
      );
   }

   if (loading && (!publishedPosts || !publishedPosts)) {
      return <DashboardSkeleton />;
   }

   if (!loading && err) {
      return <ErrorMessage offline={true} />;
   }

   const totalPost = publishedPosts?.length + draftPosts?.length || 0;
   const totalPublishedPost = publishedPosts?.length;
   const totalDraftPost = draftPosts?.length;
   const totalPostReaction = publishedPosts?.reduce(
      (count, postItem) =>
         count +
         calculateReaction(postItem.heart, postItem.unicorn, postItem.saved),
      0
   );

   const hasPublishPost = publishedPosts && publishedPosts.length !== 0;
   const hasDraftPost = draftPosts && draftPosts.length !== 0;

   return (
      <Box maxW='650px' mx='auto' minH='50vh' w='100%' flex='1'>
         <Box mt={2} px='.5rem'>
            <Heading mb={5} fontSize={{ base: '1.5rem', md: '2rem' }}>
               Dashboard 👻
            </Heading>

            <HStack spacing={[2, 3, 5]} mb={6}>
               <ReactionBox count={totalPost} title='Total Posts' />
               <ReactionBox count={totalPostReaction} title='Total Reactions' />
            </HStack>
         </Box>

         {(hasPublishPost || hasDraftPost) && (
            <Tabs isLazy defaultIndex={defaultIndex}>
               <TabList>
                  <Tab
                     fontSize={['1.1rem', '1.2rem']}
                     onClick={() => handleChangeTabs('post')}
                  >
                     Post {totalPublishedPost ? `(${totalPublishedPost})` : ''}
                  </Tab>

                  <Tab
                     fontSize={['1.1rem', '1.2rem']}
                     onClick={() => handleChangeTabs('draft')}
                  >
                     Draft {totalDraftPost ? `(${totalDraftPost})` : ''}
                  </Tab>
               </TabList>

               <TabPanels>
                  <TabPanel px='0'>
                     {hasPublishPost ? (
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
                              fromDashboard={true}
                              userId={postData.userId}
                              totalDiscussion={calcTotalDiscussion(
                                 postData.comments
                              )}
                              totalReaction={calculateReaction(
                                 postData.heart,
                                 postData.unicorn,
                                 postData.saved
                              )}
                           />
                        ))
                     ) : (
                        <Text ps='.5rem'>No published post here 👻</Text>
                     )}
                  </TabPanel>

                  <TabPanel px='0'>
                     {hasDraftPost ? (
                        draftPosts.map((postData) => (
                           <DraftPostItem
                              key={postData.id}
                              title={postData.title}
                              postId={postData.id}
                           />
                        ))
                     ) : (
                        <Text ps='.5rem'>No drafted post here 👻</Text>
                     )}
                  </TabPanel>
               </TabPanels>
            </Tabs>
         )}
      </Box>
   );
};

export default Dashboard;
