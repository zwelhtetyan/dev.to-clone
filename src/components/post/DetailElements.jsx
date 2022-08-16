import React, { useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import DetailSkeleton from '../../components/skeletons/DetailSkeleton';
import SideReactionBar from './SideReactionBar';
import ErrorMessage from '../../utils/ErrorMessage';
import 'react-mde/lib/styles/css/react-mde-all.css';
import DetailRightContent from './DetailRightContent';
import MainContent from './MainContent';
import '../../styles/postdetail.scss';

const DetailElements = ({
   postDetail,
   currentUserProfile,
   loading,
   err,
   postId,
   otherPosts,
}) => {
   //scroll top
   useEffect(() => window.scrollTo(0, 0), [postId]);

   return (
      <Box
         maxW='1200px'
         mx='auto'
         py='0'
         px={{ base: '0', md: '1rem' }}
         mt={{ base: '-.5rem !important', md: '0 !important' }}
      >
         {!postDetail && loading && <DetailSkeleton />}

         {!postDetail && !loading && !err && (
            <ErrorMessage urlNotFound={true} />
         )}

         {!postDetail && !loading && err && <ErrorMessage offline={true} />}

         {postDetail && (
            <Flex align='flex-start'>
               {/* side bar */}
               <SideReactionBar />

               <Box flex='2'>
                  {/* main content */}
                  <MainContent postDetail={postDetail} postId={postId} />

                  {/* right content */}
                  <DetailRightContent
                     currentUserProfile={currentUserProfile}
                     otherPosts={otherPosts}
                     userId={postDetail.userId}
                     display={{ base: 'block', xl: 'none' }}
                     mt={{ base: '1.5rem', md: '2rem' }}
                     p='.5rem'
                  />
               </Box>

               {/* right content */}
               <DetailRightContent
                  currentUserProfile={currentUserProfile}
                  otherPosts={otherPosts}
                  userId={postDetail.userId}
                  display={{ base: 'none', xl: 'block' }}
               />
            </Flex>
         )}
      </Box>
   );
};

export default DetailElements;
