import { Box, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LangTag from '../../utils/LangTag';

const OtherPost = ({ title, tags, postId }) => {
   const navigate = useNavigate();

   return (
      <Box
         mb='.5rem'
         borderRadius='5px'
         p='.5rem'
         onClick={() => navigate(`/details/${postId}`)}
         cursor='pointer'
         _hover={{
            boxShadow: '0 0 0 1px rgb(23 23 23 / 10%)',
            bg: '#F5F5F5',
            p: { color: 'rgb(47 58 178)' },
         }}
      >
         <Text
            fontWeight={600}
            fontSize={['17px', '18px']}
            _hover={{ color: 'rgb(47 58 178)' }}
            cursor='pointer'
            onClick={() => navigate(`/details/${postId}`)}
         >
            {title}
         </Text>
         <Wrap spacing='.3rem' pt='.3rem'>
            {tags?.map((tag) => (
               <WrapItem key={nanoid()} onClick={(e) => e.stopPropagation()}>
                  <LangTag tag={tag} />
               </WrapItem>
            ))}
         </Wrap>
      </Box>
   );
};

export default OtherPost;
