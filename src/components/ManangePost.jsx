import { HStack } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deletePost } from '../lib/api';
import { SecondaryBtn } from '../utils/Buttons';

const ManangePost = ({ postId }) => {
   const navigate = useNavigate();

   const onDelete = () => deletePost(postId).then(navigate(-1));

   return (
      <HStack borderRadius='5px' border='1px solid #f5f5f5'>
         <SecondaryBtn size='sm'>Edit</SecondaryBtn>

         <SecondaryBtn
            size='sm'
            m='0 !important'
            color='red'
            onClick={onDelete}
         >
            Delete
         </SecondaryBtn>
      </HStack>
   );
};

export default ManangePost;
