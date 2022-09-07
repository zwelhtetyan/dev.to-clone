import React from 'react';
import { Box, HStack, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import IconBadge from '../../../utils/IconBadge';
import { useAuth } from '../../../context/auth';
import { useSelector } from 'react-redux';

const MenuItem = styled(NavLink)`
   padding: 0.5rem;
   display: block;
   cursor: pointer;
   border-radius: 5px;
   margin-bottom: 4px;

   &:hover {
      background: rgb(59 73 223 / 10%);
      color: rgb(47 58 178);
   }
`;

const activeLink = ({ isActive }) => {
   return isActive
      ? {
           background: 'rgb(59 73 223 / 10%)',
           color: 'rgb(47 58 178)',
        }
      : {};
};

const Layout = ({ title, count }) => {
   return (
      <HStack justify='space-between'>
         <Text>{title}</Text>
         {count && <IconBadge value={count} />}
      </HStack>
   );
};

const Left = ({ totalPublishedPosts, totalDraftPosts }) => {
   const user = useAuth();
   const { profileData } = useSelector((state) => state.profileData);

   const totalFollowingUsers = profileData.filter((userData) =>
      userData.followers?.includes(user.userId)
   ).length;

   const totalFollowers = profileData.find(
      (userData) => userData.id === user.userId
   ).followers?.length;

   return (
      <Box w='230px' display={{ base: 'none', md: 'block' }}>
         <MenuItem
            to='/dashboard/posts'
            style={(isActive) => activeLink(isActive)}
         >
            <Layout title='Posts' count={totalPublishedPosts} />
         </MenuItem>
         <MenuItem
            to='/dashboard/drafts'
            style={(isActive) => activeLink(isActive)}
         >
            <Layout title='Drafts' count={totalDraftPosts} />
         </MenuItem>
         <MenuItem
            to='/dashboard/followers'
            style={(isActive) => activeLink(isActive)}
         >
            <Layout title='Followers' count={totalFollowers} />
         </MenuItem>
         <MenuItem
            to='/dashboard/following_users'
            style={(isActive) => activeLink(isActive)}
         >
            <Layout title='Following users' count={totalFollowingUsers} />
         </MenuItem>
      </Box>
   );
};

export default Left;
