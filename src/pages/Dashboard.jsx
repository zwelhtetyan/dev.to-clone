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
import { Navigate } from 'react-router-dom';
import PostItem from '../components/post/PostItem';
import AllPostSkeletons from '../components/skeletons/AllPostSkeletons';
import { useAuth } from '../context/auth';

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

   return (
      <Box maxW='650px' mx='auto' p='.5rem' minH='50vh'>
         <Heading mb={5} fontSize={{ base: '1.5rem', md: '2rem' }}>
            Dashboard 👻
         </Heading>

         <HStack spacing={[2, 3, 5]} mb={6}>
            <ReactionBox count={publishedPosts?.length} title='Total Posts' />
            <ReactionBox count={11} title='Total Reactions' />
         </HStack>

         <Tabs>
            <TabList>
               <Tab fontSize={['1.1rem', '1.2rem']}>Posts</Tab>
               <Tab fontSize={['1.1rem', '1.2rem']}>
                  Draft {draftPosts.length ? `(${draftPosts.length})` : ''}
               </Tab>
            </TabList>

            <TabPanels>
               <TabPanel px='0'>
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
                           fromDashboard={true}
                        />
                     ))}
               </TabPanel>
               <TabPanel px='0'>
                  {loading && <AllPostSkeletons />}
                  {draftPosts &&
                     draftPosts.map((postData) => (
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
                           fromDashboard={true}
                           draftPost={true}
                        />
                     ))}
               </TabPanel>
            </TabPanels>
         </Tabs>
      </Box>
   );
};

export default Dashboard;
