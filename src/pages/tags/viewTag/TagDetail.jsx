import React from 'react';
import { Box } from '@chakra-ui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { isPrebuiltTag } from '../../../helper/isPrebuiltTag';
import { useEffect } from 'react';
import Header from './Header';
import { useSelector } from 'react-redux';
import PostItem from '../../../components/post/PostItem';
import { useAuth } from '../../../context/auth';
import { getUserProfileData } from '../../../helper/getUserProfileData';
import {
   calcTotalDiscussion,
   calculateReaction,
} from '../../../helper/calculateTotal';
import PostItemSkeleton from '../../../components/skeletons/PostItemSkeleton';
import ErrorMessage from '../../../utils/ErrorMessage';
import SortNavbar from '../../../components/sortNavbar/SortNavbar';
import { sortPosts } from '../../../helper/sortPosts';

const TagDetail = () => {
   const { tagName } = useParams();
   const user = useAuth();
   const navigate = useNavigate();
   const location = useLocation();

   //scroll top
   useEffect(() => window.scrollTo(0, 0), [tagName]);

   const tag = isPrebuiltTag(tagName) || {
      brandColor: '#3B49DF',
      tagName: tagName,
   };

   const { profileData, profileDataLoading } = useSelector(
      (state) => state.profileData
   );

   const {
      transformedData,
      transformedDataLoading: loading,
      transformedDataErr: err,
   } = useSelector((state) => state.transformedData);

   let allPostData = [];
   if (transformedData) {
      allPostData = transformedData.filter(
         (postData) =>
            !postData.draft &&
            postData.tags.length &&
            postData.tags.find((tag) => tag.tagName === tagName)
      );
   }

   const handleClickNavItem = (value) => {
      if (value === 'relevant') {
         navigate(`/tags/${tagName}`);
         return;
      }

      navigate(`/tags/${tagName}/?sort=${value}`);
   };

   const queryParam = new URLSearchParams(location.search);
   const sort = queryParam.get('sort');

   // sorting posts =>  [relevant | latest | top]
   const currentPosts = sortPosts(sort, allPostData);

   return (
      <Box
         flex='1'
         w='100%'
         maxW='1280px'
         px={{ md: '1rem' }}
         mt={{ base: '-.5rem', md: '0' }}
      >
         <Header
            {...tag}
            userId={user?.userId}
            profileData={profileData}
            loading={profileDataLoading}
         />

         <Box maxW={{ base: '100%', md: '650px' }} margin='auto' mt={5}>
            {/* navbar */}
            <SortNavbar handleClickNavItem={handleClickNavItem} />

            {loading && (
               <>
                  <PostItemSkeleton />
                  <PostItemSkeleton />
                  <PostItemSkeleton />
               </>
            )}

            {err && <ErrorMessage offline={true} />}

            {currentPosts.map((postData) => (
               <PostItem
                  key={postData.id}
                  name={postData.name}
                  username={postData.username}
                  profile={postData.profile}
                  coverImg={postData.cvImg}
                  id={postData.id}
                  createdAt={postData.createdAt}
                  title={postData.title}
                  tags={postData.tags}
                  readTime={postData.readTime}
                  isUpdated={postData?.updated}
                  userId={postData.userId}
                  currentUserId={user?.userId} // authenticated userId
                  showHover={true}
                  currentUserProfile={getUserProfileData(
                     profileData,
                     postData.userId
                  )}
                  totalDiscussion={calcTotalDiscussion(postData.comments)}
                  totalReaction={calculateReaction(
                     postData.heart,
                     postData.unicorn,
                     postData.saved
                  )}
                  saved={postData.saved}
                  alreadySaved={postData.saved?.includes(user?.userId)}
               />
            ))}
         </Box>
      </Box>
   );
};

export default TagDetail;
