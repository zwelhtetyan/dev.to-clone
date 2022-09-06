import React from 'react';
import { Box, HStack, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import IconBadge from '../../../utils/IconBadge';

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

const Left = ({ totalPublishedPosts, totalDraftPosts }) => {
   return (
      <Box w='230px' display={{ base: 'none', md: 'block' }}>
         <MenuItem
            to='/dashboard/posts'
            style={(isActive) => activeLink(isActive)}
         >
            <HStack justify='space-between'>
               <Text>Posts</Text>
               {totalPublishedPosts && (
                  <IconBadge value={totalPublishedPosts} />
               )}
            </HStack>
         </MenuItem>
         <MenuItem
            to='/dashboard/drafts'
            style={(isActive) => activeLink(isActive)}
         >
            <HStack justify='space-between'>
               <Text>Drafts</Text>
               {totalDraftPosts && <IconBadge value={totalDraftPosts} />}
            </HStack>
         </MenuItem>
         <MenuItem
            to='/dashboard/followers'
            style={(isActive) => activeLink(isActive)}
         >
            Followers
         </MenuItem>
         <MenuItem
            to='/dashboard/following_users'
            style={(isActive) => activeLink(isActive)}
         >
            Following users
         </MenuItem>
      </Box>
   );
};

export default Left;
