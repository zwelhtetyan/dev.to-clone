import { Box, Text, useColorModeValue, Wrap, WrapItem } from '@chakra-ui/react';
import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { titleRoute } from '../../helper/titleRoute';
import useClickTag from '../../hooks/useClickTag';
import { setClickComment } from '../../store/scrollDiscussion';
import LangTag from '../../utils/LangTag';

const OtherPostItem = ({ username, title, tags, postId }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleNavigate = (e) => {
      e.stopPropagation();

      navigate(`/${titleRoute(username, title, postId)}`);
      dispatch(setClickComment(false));
   };

   const handleClickTag = useClickTag();

   return (
      <Box
         mb='.5rem'
         py='.5rem'
         px='1rem'
         onClick={handleNavigate}
         cursor='pointer'
         _hover={{
            bg: useColorModeValue('light.cardBg', 'dark.cardBg'),
         }}
      >
         <Text
            fontWeight={600}
            _hover={{
               color: useColorModeValue(
                  'light.headingHover',
                  'dark.headingHover'
               ),
            }}
            cursor='pointer'
            onClick={handleNavigate}
         >
            {title}
         </Text>

         <Wrap spacing='.3rem' pt='.3rem'>
            {tags?.map((tag) => (
               <WrapItem
                  key={nanoid()}
                  onClick={(e) => handleClickTag(e, tag.tagName)}
               >
                  <LangTag tag={tag} />
               </WrapItem>
            ))}
         </Wrap>
      </Box>
   );
};

export default OtherPostItem;
