import { Box, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setClickComment } from '../../store/scrollDiscussion';
import LangTag from '../../utils/LangTag';

const OtherPostItem = ({ title, tags, postId }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleNavigate = () => {
      dispatch(setClickComment(false));
      navigate(`/details/${postId}`);
   };

   return (
      <Box
         mb='.5rem'
         borderRadius='5px'
         p='.5rem'
         onClick={handleNavigate}
         cursor='pointer'
         _hover={{
            boxShadow: '0 0 0 1px rgb(23 23 23 / 10%)',
            bg: '#F5F5F5',
         }}
      >
         <Text
            fontWeight={600}
            _hover={{ color: 'rgb(47 58 178)' }}
            cursor='pointer'
            onClick={() => navigate(`/details/${postId}`)}
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
