import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
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
import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';

const NavItem = styled.div`
   padding: 0.5rem 1rem;
   border-radius: 5px;
   font-size: 17px;
   cursor: pointer;

   &:hover {
      background-color: white;
      color: rgb(47 58 178);
   }
`;

const activeLink = (isActive) => {
   return isActive
      ? {
           color: '#090909',
           fontWeight: '600',
        }
      : {};
};

const AllPost = ({ transformedData, loading, err }) => {
   const user = useAuth();
   const navigate = useNavigate();
   const location = useLocation();

   const profileData = useSelector((state) => state.profileData.profileData);

   let allPostData = null;
   if (transformedData && !loading && !err) {
      allPostData = transformedData.filter((postData) => !postData.draft);
   }

   const handleClickNavItem = (value) => {
      navigate(`/?sort=${value}`);
   };

   const queryParam = new URLSearchParams(location.search);

   const sort = queryParam.get('sort');

   const followingUserIds = profileData
      ?.filter((userData) => userData.followers?.includes(user?.userId))
      .map((userData) => userData.id);

   switch (sort) {
      case null:
         allPostData = allPostData?.sort(
            (a, b) =>
               followingUserIds.includes(b.userId) -
               followingUserIds.includes(a.userId)
         );
         break;
      case 'latest':
         allPostData = allPostData?.sort((a, b) => b.createdAt - a.createdAt);
         break;
      case 'top':
         allPostData = allPostData?.sort(
            (a, b) =>
               calculateReaction(b.heart, b.unicorn, b.saved) -
               calculateReaction(a.heart, a.unicorn, a.saved)
         );
         break;
      default:
         return allPostData;
   }

   return (
      <Box flex='2' maxW={{ base: '100%', md: '650px' }}>
         {/* navbar */}
         <Flex mb='.5rem' ms={{ base: '.2rem', md: 0 }}>
            <NavItem
               onClick={() => navigate('/')}
               style={activeLink(sort === null)}
            >
               Relevant
            </NavItem>
            <NavItem
               onClick={() => handleClickNavItem('latest')}
               style={activeLink(sort === 'latest')}
            >
               Latest
            </NavItem>
            <NavItem
               onClick={() => handleClickNavItem('top')}
               style={activeLink(sort === 'top')}
            >
               Top
            </NavItem>
         </Flex>

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
                  <PostItemSkeleton />
                  <PostItemSkeleton />
                  <PostItemSkeleton />
                  <PostItemSkeleton />
                  <PostItemSkeleton />
               </>
            )}

            {allPostData &&
               allPostData.map((postData, idx) => (
                  <PostItem
                     isFirstItem={idx === 0}
                     key={postData.id}
                     name={postData.name}
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
