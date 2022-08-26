import React, { useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import DetailSkeleton from '../../components/skeletons/DetailSkeleton';
import SideReactionBar from './SideReactionBar';
import ErrorMessage from '../../utils/ErrorMessage';
import DetailRightContent from './DetailRightContent';
import MainContent from './MainContent';
import 'react-mde/lib/styles/css/react-mde-all.css';
import '../../styles/postdetail.scss';

const DetailElements = ({
   postDetail,
   currentUserProfile,
   loading,
   err,
   otherPosts,
}) => {
   //scroll top
   useEffect(() => window.scrollTo(0, 0), [postDetail?.id]);

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
            <Flex flex={2} align='flex-start'>
               {/* side bar */}
               <SideReactionBar postDetail={postDetail} />

               <Box flex='2' overflow='hidden' pb='1px'>
                  {/* main content */}
                  <MainContent postDetail={postDetail} />

                  {/* right content */}
                  <DetailRightContent
                     currentUserProfile={currentUserProfile}
                     otherPosts={otherPosts}
                     userId={postDetail.userId}
                     display={{ base: 'block', xl: 'none' }}
                     m={{ base: '1.5rem 0', md: '1.5rem 1px 0' }}
                     p='.5rem'
                     isDraft={postDetail.draft}
                  />
               </Box>

               {/* right content */}

               <DetailRightContent
                  currentUserProfile={currentUserProfile}
                  otherPosts={otherPosts}
                  userId={postDetail.userId}
                  display={{ base: 'none', xl: 'block' }}
                  isDraft={postDetail.draft}
               />
            </Flex>
         )}
      </Box>
   );
};

export default DetailElements;
