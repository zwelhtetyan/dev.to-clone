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
import { useAuth } from '../context/auth';
import CustomAvatar from '../utils/CustomAvatar';
import CustomMenuItem from '../utils/CustomMenuItem';

const MainMenu = () => {
   const navigate = useNavigate();
   const user = useAuth();

   const profileData = useSelector((state) => state.profileData.profileData);

   let currentUserProfile = null;
   if (profileData) {
      currentUserProfile = profileData.find((data) => data.id === user?.userId);
   }

   return (
      <>
         {currentUserProfile && (
            <Menu autoSelect={false} isLazy>
               <MenuButton
                  _hover={{
                     filter: 'drop-shadow(0px 0px 2px rgb(59 73 223))',
                  }}
                  transition='.3s'
               >
                  <CustomAvatar
                     profile={currentUserProfile.profile}
                     size='40px'
                  />
               </MenuButton>

               <MenuList
                  p='.5rem'
                  minW={{ base: '0 !important' }}
                  w='250px'
                  // boxShadow='0 0 0 1px rgb(23 23 23 / 5%)'
                  boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.1);'
                  bg='white'
               >
                  <CustomMenuItem
                     onClick={() =>
                        navigate(`/profile/${currentUserProfile.id}`)
                     }
                  >
                     <VStack>
                        <Text>{currentUserProfile.name}</Text>
                     </VStack>
                  </CustomMenuItem>

                  <MenuDivider h='.5px' bg='#b5b5b5' borderBottom='none' />

                  <CustomMenuItem
                     onClick={() => navigate('/dashboard/?category=post')}
                  >
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
         )}
      </>
   );
};

export default MainMenu;
