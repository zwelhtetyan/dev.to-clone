import React from 'react';
import {
   Box,
   Flex,
   Heading,
   HStack,
   Select,
   Text,
   useColorModeValue,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Left from '../components/dashboard/layout/Left';
import Right from '../components/dashboard/layout/Right';
import DashboardSkeleton from '../components/skeletons/DashboardSkeleton';
import { useAuth } from '../context/auth';
import { calculateReaction } from '../helper/calculateTotal';
import ErrorMessage from '../utils/ErrorMessage';

const ReactionBox = ({ count, title, m }) => {
   return (
      <Box
         flex='1'
         textAlign='center'
         bg={useColorModeValue('light.cardSecondaryBg', 'dark.cardSecondaryBg')}
         className='shadowSecondary'
         p='1rem'
         m={m}
         borderRadius='5px'
      >
         <Heading>{count}</Heading>
         <Text>{title}</Text>
      </Box>
   );
};

const Dashboard = () => {
   //scroll top
   // useEffect(() => window.scrollTo(0, 0), []);

   const user = useAuth();
   const location = useLocation();
   const navigate = useNavigate();

   const selectedMenu = location.pathname.split('/').slice(2, 3).join('');

   const {
      transformedData,
      transformedDataLoading: loading,
      transformedDataErr: err,
   } = useSelector((state) => state.transformedData);

   if (!user) {
      return <Navigate to='/create-account' replace />;
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

   if (loading) {
      return <DashboardSkeleton />;
   }

   if (!loading && err) {
      return <ErrorMessage offline={true} />;
   }

   const totalPost = publishedPosts?.length + draftPosts?.length || 0;
   const totalPublishedPosts = publishedPosts?.length;
   const totalDraftPosts = draftPosts?.length;
   const totalPostReaction = publishedPosts?.reduce(
      (count, postItem) =>
         count +
         calculateReaction(postItem.heart, postItem.unicorn, postItem.saved),
      0
   );

   const showReactionBox =
      location.pathname === '/dashboard' ||
      location.pathname === '/dashboard/drafts';

   const handleSelect = ({ target }) => {
      const pathname = target.value.toLowerCase();
      if (pathname === 'posts') {
         navigate('/dashboard');
         return;
      }

      if (pathname === 'following users') {
         navigate('/dashboard/following_users');
         return;
      }

      navigate(`/dashboard/${pathname}`);
   };

   return (
      <Box w='100%' maxW='1280px' flex={1} p={{ md: '.5rem', xl: '1rem' }}>
         <Box px={['.5rem', '.5rem', '0']} mb={3}>
            <Heading fontSize={{ base: '1.5rem', md: '1.8rem' }} mb='.5rem'>
               Dashboard 👻
            </Heading>

            <Select
               display={['block', 'block', 'none']}
               mt='.5rem'
               onChange={handleSelect}
               value={selectedMenu}
            >
               <option value='posts'>Posts</option>
               <option value='drafts'>Drafts</option>
               <option value='following_tags'>Following Tags</option>
               <option value='followers'>Followers</option>
               <option value='following_users'>Following users</option>
            </Select>
         </Box>

         {showReactionBox && (
            <Flex
               mb='1rem'
               px={['.5rem', '.5rem', '0']}
               direction={['column', 'row']}
            >
               <ReactionBox
                  count={totalPost}
                  title='Total Posts'
                  m={{ base: '0 0 .5rem 0', sm: '0 .5rem 0 0' }}
               />
               <ReactionBox
                  count={totalPostReaction}
                  title='Total post reactions'
               />
            </Flex>
         )}

         <HStack align='flex-start'>
            <Left
               totalPublishedPosts={totalPublishedPosts}
               totalDraftPosts={totalDraftPosts}
            />
            <Right />
         </HStack>
      </Box>
   );
};

export default Dashboard;
