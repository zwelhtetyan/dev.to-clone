import { HStack } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SecondaryBtn } from '../utils/Buttons';

const ManangePost = () => {
   const navigate = useNavigate();

   return (
      <HStack borderRadius='5px' border='1px solid #f5f5f5'>
         <SecondaryBtn size='sm' onClick={() => navigate('/edit-post')}>
            Edit
         </SecondaryBtn>

         <SecondaryBtn
            size='sm'
            m='0 !important'
            color='red'
            onClick={() => navigate(`/delete_confirm`)}
         >
            Delete
         </SecondaryBtn>
      </HStack>
   );
};

export default ManangePost;
