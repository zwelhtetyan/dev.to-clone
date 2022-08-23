import { Menu, MenuButton, MenuList } from '@chakra-ui/react';
import React from 'react';
import { RiMoreLine } from 'react-icons/ri';
import CustomMenuItem from '../../utils/CustomMenuItem';

const ManageComment = () => {
   return (
      <Menu autoSelect={false} isLazy>
         <MenuButton
            bg='transparent'
            p='0 3px'
            borderRadius='5px'
            _hover={{
               bg: 'rgb(59 73 223 / 10%)',
               color: 'rgb(47 58 178)',
            }}
         >
            <RiMoreLine size={20} color='gray' />
         </MenuButton>
         <MenuList minW='0' w='105px'>
            <CustomMenuItem>Edit</CustomMenuItem>
            <CustomMenuItem>Delete</CustomMenuItem>
         </MenuList>
      </Menu>
   );
};

export default ManageComment;
