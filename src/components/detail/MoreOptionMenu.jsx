import {
   HStack,
   IconButton,
   Menu,
   MenuButton,
   MenuList,
   Text,
   useClipboard,
   useToast,
} from '@chakra-ui/react';
import React from 'react';
import { RiFileCopy2Fill } from 'react-icons/ri';
import Option from '../../assets/logo/Option';
import { isTouchDevice } from '../../helper/isTouchDevice';
import CustomMenuItem from '../../utils/CustomMenuItem';

const MoreOptionMenu = ({ iconStyles, postTitle }) => {
   const toast = useToast();
   const postURL = window.location.href;

   const { onCopy } = useClipboard(postURL);

   const handleCopyLink = () => {
      onCopy(); // copy to clipboard

      const id = 'toast';

      if (!toast.isActive(id)) {
         toast({
            title: 'Copied to Clipboard',
            position: 'top-right',
            duration: 1000,
            status: 'success',
            isClosable: true,
            variant: 'subtle',
            id,
         });
      }
   };

   const handleShareVia = (via) => {
      let url = '';
      switch (via) {
         case 'twitter':
            url = `https://twitter.com/share?url=${postURL}&text=${postTitle}`;
            break;
         case 'linkedin':
            url = `https://www.linkedin.com/shareArticle?url=${postURL}&title=${postTitle}`;
            break;
         case 'facebook':
            url = `https://www.facebook.com/sharer.php?u=${postURL}`;
            break;
         default:
            return;
      }

      window.open(url, '_blank'); // open link in new tab
   };

   const nativeShareVia = async () => {
      try {
         await navigator.share({ title: postTitle, url: postURL });
         console.log('successfully share url');
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <Menu autoSelect={false} isLazy>
         <MenuButton _hover={{ '.moreBtn': { bg: 'gray.200' } }}>
            <IconButton
               as='div'
               icon={<Option />}
               {...iconStyles}
               className='moreBtn'
            />
         </MenuButton>

         <MenuList
            p='.5rem'
            minW={{ base: '0 !important' }}
            w='250px'
            bg='white'
         >
            <CustomMenuItem onClick={handleCopyLink}>
               <HStack justify='space-between' w='100%'>
                  <Text>Copy Link</Text> <RiFileCopy2Fill size={20} />
               </HStack>
            </CustomMenuItem>

            {!isTouchDevice() && (
               <>
                  <CustomMenuItem onClick={() => handleShareVia('twitter')}>
                     Share to Twitter
                  </CustomMenuItem>

                  <CustomMenuItem onClick={() => handleShareVia('linkedin')}>
                     Share to Linkedin
                  </CustomMenuItem>

                  <CustomMenuItem onClick={() => handleShareVia('facebook')}>
                     Share to Facebook
                  </CustomMenuItem>
               </>
            )}

            {isTouchDevice() && (
               <CustomMenuItem onClick={nativeShareVia}>
                  Share post via...
               </CustomMenuItem>
            )}
         </MenuList>
      </Menu>
   );
};

export default MoreOptionMenu;