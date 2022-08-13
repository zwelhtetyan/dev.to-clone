import {
   Menu,
   MenuButton,
   MenuDivider,
   MenuList,
   Text,
   VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomAvatar from '../utils/Avatar';
import CustomMenuItem from '../utils/CustomMenuItem';

const MainMenu = () => {
   const navigate = useNavigate();

   const profileData = useSelector((state) => state.profileData.profileData);

   return (
      <Menu autoSelect={false}>
         <MenuButton
            _hover={{
               filter: 'drop-shadow(0px 0px 2px rgb(59 73 223))',
            }}
            transition='.3s'
         >
            <CustomAvatar profile={profileData?.profile} size='40px' />
         </MenuButton>

         <MenuList
            p='.5rem'
            minW={{ base: '0 !important' }}
            w='270px'
            boxShadow='0 0 0 1px rgb(23 23 23 / 5%)'
            bg='white'
         >
            <CustomMenuItem onClick={() => navigate('/profile')}>
               <VStack>
                  <Text>{profileData?.name}</Text>
               </VStack>
            </CustomMenuItem>

            <MenuDivider h='1px' bg='#d6d6d7' />
            <CustomMenuItem>Dashboard</CustomMenuItem>
            <CustomMenuItem onClick={() => navigate('/create-post')}>
               Create Post
            </CustomMenuItem>
            <CustomMenuItem>Reading List</CustomMenuItem>
            <CustomMenuItem onClick={() => navigate('/apperance')}>
               Apperance
            </CustomMenuItem>
            <MenuDivider h='1px' bg='#d6d6d7' />

            <CustomMenuItem onClick={() => navigate('/signout-confirm')}>
               Sign Out
            </CustomMenuItem>
         </MenuList>
      </Menu>
   );
};

export default MainMenu;
