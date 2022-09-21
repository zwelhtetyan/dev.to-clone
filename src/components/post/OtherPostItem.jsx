import { Box, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { titleRoute } from '../../helper/titleRoute';
import { setClickComment } from '../../store/scrollDiscussion';
import LangTag from '../../utils/LangTag';

const OtherPostItem = ({ name, title, tags, postId }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleNavigate = (e) => {
      e.stopPropagation();

      navigate(`/${titleRoute(name, title, postId)}`);
      dispatch(setClickComment(false));
   };

   return (
      <Box
         mb='.5rem'
         py='.5rem'
         px='1rem'
         onClick={handleNavigate}
         cursor='pointer'
         _hover={{ bg: 'white' }}
      >
         <Text
            fontWeight={600}
            _hover={{ color: 'rgb(47 58 178)' }}
            cursor='pointer'
            onClick={handleNavigate}
            color='rgb(23 23 23)'
         >
            {title}
         </Text>

         <Wrap spacing='.3rem' pt='.3rem'>
            {tags?.map((langtag) => (
               <WrapItem key={nanoid()} onClick={(e) => e.stopPropagation()}>
                  <LangTag tag={langtag} />
               </WrapItem>
            ))}
         </Wrap>
      </Box>
   );
};

export default OtherPostItem;
