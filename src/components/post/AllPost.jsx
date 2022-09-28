import React from 'react';
import { Box } from '@chakra-ui/react';
import PostItemSkeleton from '../skeletons/PostItemSkeleton';
import PostItem from './PostItem';
import { useSelector } from 'react-redux';
import ErrorMessage from '../../utils/ErrorMessage';
import { getUserProfileData } from '../../helper/getUserProfileData';
import { useAuth } from '../../context/auth';
import {
   calcTotalDiscussion,
   calculateReaction,
} from '../../helper/calculateTotal';
import { useLocation, useNavigate } from 'react-router-dom';
import SortNavbar from '../sortNavbar/SortNavbar';
import { sortPosts } from '../../helper/sortPosts';

const AllPost = ({ transformedData, loading, err }) => {
   const user = useAuth();
   const navigate = useNavigate();
   const location = useLocation();

   const profileData = useSelector((state) => state.profileData.profileData);

   let allPostData = [];
   if (transformedData && !loading && !err) {
      allPostData = transformedData.filter((postData) => !postData.draft);
   }

   const handleClickNavItem = (value) => {
      if (value === 'relevant') {
         navigate('/');
         return;
      }

      navigate(`/?sort=${value}`);
   };

   const queryParam = new URLSearchParams(location.search);
   const sort = queryParam.get('sort');
   const followingTags =
      profileData?.find((userData) => userData.id === user?.userId)
         ?.followingTags || [];

   // sorting posts =>  [relevant | latest | top]
   const currentPosts = sortPosts(sort, allPostData, followingTags);

   return (
      <Box flex='2' maxW={{ base: '100%', md: '650px' }}>
         {/* navbar */}
         <SortNavbar handleClickNavItem={handleClickNavItem} />

         {/* posts */}
         <Box>
            {err && <ErrorMessage offline={true} />}

            {loading && !err && (
               <>
                  <PostItemSkeleton firstItem={true} />
                  <PostItemSkeleton />
                  <PostItemSkeleton />
                  <PostItemSkeleton />
                  <PostItemSkeleton />
               </>
            )}

            {currentPosts.map((postData, idx) => (
               <PostItem
                  isFirstItem={idx === 0}
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

export default AllPost;
