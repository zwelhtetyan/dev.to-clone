import {
   Menu,
   MenuButton,
   MenuDivider,
   MenuList,
   Text,
   VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomAvatar from '../utils/CustomAvatar';
import CustomMenuItem from '../utils/CustomMenuItem';

const MainMenu = ({ currentUserProfile }) => {
   const navigate = useNavigate();

   return (
      <Menu autoSelect={false} isLazy>
         <MenuButton
            _hover={{
               filter: 'drop-shadow(0px 0px 2px rgb(59 73 223))',
            }}
            transition='.3s'
         >
            <CustomAvatar profile={currentUserProfile.profile} size='40px' />
         </MenuButton>

         <MenuList
            p='.5rem'
            minW={{ base: '0 !important' }}
            w='250px'
            bg='white'
         >
            <CustomMenuItem
               onClick={() => navigate(`/profile/${currentUserProfile.id}`)}
            >
               <VStack>
                  <Text>{currentUserProfile.name}</Text>
               </VStack>
            </CustomMenuItem>

            <MenuDivider h='.5px' bg='#b5b5b5' borderBottom='none' />

            <CustomMenuItem onClick={() => navigate('/dashboard')}>
               Dashboard
            </CustomMenuItem>
            <CustomMenuItem onClick={() => navigate('/create-post')}>
               Create Post
            </CustomMenuItem>
            <CustomMenuItem onClick={() => navigate('/reading')}>
               Reading List
            </CustomMenuItem>
            <CustomMenuItem onClick={() => navigate('/apperance')}>
               Apperance
            </CustomMenuItem>

            <MenuDivider h='.5px' bg='#b5b5b5' borderBottom='none' />

            <CustomMenuItem onClick={() => navigate('/signout-confirm')}>
               Sign Out
            </CustomMenuItem>
         </MenuList>
      </Menu>
   );
};

export default MainMenu;
