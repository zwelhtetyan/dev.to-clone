import { Box, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setClickComment } from '../../store/scrollDiscussion';
import LangTag from '../../utils/LangTag';

const OtherPostItem = ({ title, tags, postId }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleNavigate = () => {
      navigate(`/details/${postId}`, { replace: true });
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
            onClick={() => navigate(`/details/${postId}`)}
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
