import {
   Box,
   Menu,
   MenuButton,
   MenuDivider,
   MenuList,
   Text,
   useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomAvatar from '../../utils/CustomAvatar';
import CustomMenuItem from '../../utils/CustomMenuItem';

const MainMenu = ({ currentUserProfile }) => {
   const navigate = useNavigate();

   const linkColor = useColorModeValue('light.linkColor', 'dark.linkColor');
   const dividerColor = useColorModeValue(
      'rgb(23 23 23 / 24%)',
      'rgb(255 255 255 / 45%)'
   );
   const headingHover = useColorModeValue(
      'light.headingHover',
      'dark.headingHover'
   );

   return (
      <Menu autoSelect={false} isLazy>
         <MenuButton
            transition='.3s'
            rounded='full'
            _hover={{
               boxShadow: useColorModeValue(
                  '0 0 0 1px #E2E8F0',
                  '0 0 0 1px #2a2a2a'
               ),
            }}
         >
            <CustomAvatar profile={currentUserProfile.profile} size='40px' />
         </MenuButton>

         <MenuList
            p='.5rem'
            minW={{ base: '0 !important' }}
            w='250px'
            bg={useColorModeValue('light.cardBg', 'dark.cardBg')}
         >
            <CustomMenuItem
               onClick={() => navigate(`/${currentUserProfile.username}`)}
            >
               <Box w='100%' color={linkColor} _hover={{ color: headingHover }}>
                  <Text>{currentUserProfile.name}</Text>
                  <Text lineHeight={1} fontSize='15px'>
                     @{currentUserProfile.username}
                  </Text>
               </Box>
            </CustomMenuItem>

            <MenuDivider h='.5px' bg={dividerColor} borderBottom='none' />

            <CustomMenuItem onClick={() => navigate('/dashboard')}>
               Dashboard
            </CustomMenuItem>
            <CustomMenuItem onClick={() => navigate('/create-post')}>
               Create Post
            </CustomMenuItem>
            <CustomMenuItem onClick={() => navigate('/readinglist')}>
               Reading List
            </CustomMenuItem>
            <CustomMenuItem onClick={() => navigate('/apperance')}>
               Apperance
            </CustomMenuItem>

            <MenuDivider h='.5px' bg={dividerColor} borderBottom='none' />

            <CustomMenuItem onClick={() => navigate('/signout-confirm')}>
               Sign Out
            </CustomMenuItem>
         </MenuList>
      </Menu>
   );
};

export default MainMenu;
