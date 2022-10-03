import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { calcTotalDiscussion } from '../../helper/calculateTotal';
import { titleRoute } from '../../helper/titleRoute';
import { setClickComment } from '../../store/scrollDiscussion';

const HomeRightCard = ({ tagName, topPosts }) => {
   const dispatch = useDispatch();

   const Item = styled(Link)`
      display: block;
      padding: 0.5rem 1rem;
      color: ${useColorModeValue('rgb(64, 64, 64)', 'rgb(212, 212, 212)')};

      &:hover {
         background: ${useColorModeValue('rgb(255 255 255)', 'rgb(23 23 23)')};
         p:first-of-type {
            color: ${useColorModeValue(
               'rgb(47, 58, 178)',
               'rgb(165, 180, 252)'
            )};
         }
      }
   `;

   const TopPostItem = ({ route, title, commentCount }) => {
      return (
         <Item to={route} onClick={() => dispatch(setClickComment(false))}>
            <Box>
               <Text mb={1}>{title}</Text>
               <Text fontSize='14px'>{commentCount} comments</Text>
            </Box>
         </Item>
      );
   };

   return (
      <Box
         className='shadowSecondary'
         bg={useColorModeValue('light.cardSecondaryBg', 'dark.cardSecondaryBg')}
         borderRadius='5px'
         mb={3}
         overflow='hidden'
      >
         <Text
            fontSize='19px'
            fontWeight={700}
            mb={3}
            padding='1rem 1rem 0'
            color={useColorModeValue('light.linkColor', 'dark.linkColor')}
         >
            #{tagName}
         </Text>

         <Box>
            {topPosts.map((topPost) => (
               <TopPostItem
                  key={nanoid()}
                  route={`/${titleRoute(
                     topPost.username,
                     topPost.title,
                     topPost.id
                  )}`}
                  title={topPost.title}
                  commentCount={calcTotalDiscussion(topPost.comments)}
               />
            ))}
         </Box>
      </Box>
   );
};

export default HomeRightCard;
