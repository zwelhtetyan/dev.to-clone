import { Menu, MenuButton, MenuList } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomMenuItem from '../utils/CustomMenuItem';

const ManangePost = () => {
   const navigate = useNavigate();

   return (
      <Menu autoSelect={false}>
         <MenuButton
            p='0 5px'
            h='30px'
            borderRadius='5px'
            fontWeight='normal'
            fontSize='13px'
            border='1px solid rgb(59 73 223)'
            color='rgb(59 73 223)'
            _hover={{
               bg: 'rgb(59 73 223)',
               color: 'white',
            }}
         >
            Manage
         </MenuButton>
         <MenuList minW='0' w='105px'>
            <CustomMenuItem onClick={() => navigate('/edit-post')}>
               Edit
            </CustomMenuItem>
            <CustomMenuItem onClick={() => navigate(`/delete_confirm`)}>
               Delete
            </CustomMenuItem>
         </MenuList>
      </Menu>
   );
};

export default ManangePost;
