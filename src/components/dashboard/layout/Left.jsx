import React from 'react';
import { Box, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import IconBadge from '../../../utils/IconBadge';
import { useAuth } from '../../../context/auth';
import { useSelector } from 'react-redux';

const MenuText = ({ title, count }) => {
   return (
      <HStack justify='space-between'>
         <Text>{title}</Text>
         <IconBadge value={count} />
      </HStack>
   );
};

const Left = ({ totalPublishedPosts, totalDraftPosts }) => {
   const user = useAuth();
   const location = useLocation();

   const { profileData } = useSelector((state) => state.profileData);

   const totalFollowingUsers = profileData?.filter((userData) =>
      userData.followers?.includes(user.userId)
   ).length;

   const totalFollowers =
      profileData.find((userData) => userData.id === user.userId).followers
         ?.length || 0;

   const totalFollowingTags =
      profileData.find((userData) => userData.id === user.userId).followingTags
         ?.length || 0;

   const bgColor = useColorModeValue(
      'rgb(59 73 223 / 10%)',
      'rgb(49 46 129 / 75%)'
   );

   const hoverColor = useColorModeValue('rgb(47 58 178)', 'rgb(165, 180, 252)');
   const color = useColorModeValue('rgb(64, 64, 64)', 'rgb(212, 212, 212)');

   const MenuItem = styled(NavLink)`
      padding: 0.5rem;
      display: block;
      cursor: pointer;
      border-radius: 5px;
      margin-bottom: 4px;
      color: ${color};

      &:hover {
         background: ${bgColor};
         color: ${hoverColor};
      }
   `;

   const activeLink = (isActive) => {
      return isActive
         ? {
              background: bgColor,
              color: hoverColor,
           }
         : {};
   };

   return (
      <Box w='230px' display={{ base: 'none', md: 'block' }}>
         <MenuItem
            to='/dashboard'
            style={() => activeLink(location.pathname === '/dashboard')}
         >
            <MenuText title='Posts' count={totalPublishedPosts} />
         </MenuItem>

         <MenuItem
            to='/dashboard/drafts'
            style={({ isActive }) => activeLink(isActive)}
         >
            <MenuText title='Drafts' count={totalDraftPosts} />
         </MenuItem>

         <MenuItem
            to='/dashboard/following_tags'
            style={({ isActive }) => activeLink(isActive)}
         >
            <MenuText title='Following tags' count={totalFollowingTags} />
         </MenuItem>

         <MenuItem
            to='/dashboard/followers'
            style={({ isActive }) => activeLink(isActive)}
         >
            <MenuText title='Followers' count={totalFollowers} />
         </MenuItem>

         <MenuItem
            to='/dashboard/following_users'
            style={({ isActive }) => activeLink(isActive)}
         >
            <MenuText title='Following users' count={totalFollowingUsers} />
         </MenuItem>
      </Box>
   );
};

export default Left;
