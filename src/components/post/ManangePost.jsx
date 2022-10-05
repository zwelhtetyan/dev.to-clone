import {
   HStack,
   Menu,
   MenuButton,
   MenuList,
   Text,
   useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveToLocalStorage } from '../../helper/localStorage';
import { setCurrentPostData } from '../../store/post/currentPost';
import CustomMenuItem from '../../utils/CustomMenuItem';
import { AiFillPushpin } from 'react-icons/ai';
import { pinPost } from '../../lib/api';

// I save all transformedData in localStorage because it navigate next page, so when reload the next page, I take them back from localStorage

const ManangePost = ({ postId, m }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [pinning, setPinning] = useState(false);

   const { transformedData } = useSelector((state) => state.transformedData);

   const currentPostItem = transformedData.find(
      (postData) => postData.id === postId
   );

   const alreadyPinned = currentPostItem.pinned;

   // to edit || delete
   const setCurrentPostDataHandler = () => {
      const postData = {
         cvImg: currentPostItem.cvImg,
         title: currentPostItem.title,
         tags: currentPostItem.tags,
         MDEValue: currentPostItem.MDEValue,
         id: postId,
         draft: currentPostItem.draft ? true : false,
      };

      dispatch(setCurrentPostData(postData));

      saveToLocalStorage('postDataToManage', JSON.stringify(postData));
   };

   const goToEdit = (e) => {
      e.stopPropagation();

      setCurrentPostDataHandler();
      navigate('/edit-post');
   };

   const goToDelete = (e) => {
      e.stopPropagation();

      setCurrentPostDataHandler();
      navigate('/delete-post');
   };

   const handlePinPost = (e) => {
      e.stopPropagation();

      setPinning(true);

      const isPinned = currentPostItem.pinned ? false : true;

      pinPost(postId, isPinned)
         .then((_) => {
            // console.log('pinned post successfully');

            setPinning(false);
         })
         .catch((err) => {
            console.log(err);
            setPinning(false);
         });
   };

   return (
      <Menu autoSelect={false} isLazy>
         <MenuButton
            m={m}
            p='0 5px'
            h='30px'
            borderRadius='5px'
            fontWeight='normal'
            fontSize='13px'
            border='1px solid'
            borderColor={useColorModeValue('light.primary', 'dark.primary')}
            color={useColorModeValue('light.primary', 'dark.primary')}
            _hover={{
               bg: 'light.primary',
               color: 'white',
            }}
            onClick={(e) => e.stopPropagation()}
            disabled={pinning}
         >
            {pinning ? 'Loading' : 'Manage'}
         </MenuButton>
         <MenuList
            minW='0'
            w='180px'
            p='.5rem'
            bg={useColorModeValue('light.cardBg', 'dark.cardBg')}
         >
            {!currentPostItem.draft && (
               <CustomMenuItem onClick={handlePinPost}>
                  <HStack w='100%'>
                     <Text>{alreadyPinned ? 'Unpin' : 'Pin to profile'}</Text>{' '}
                     <AiFillPushpin size={18} />
                  </HStack>
               </CustomMenuItem>
            )}
            <CustomMenuItem onClick={goToEdit}>Edit</CustomMenuItem>
            <CustomMenuItem onClick={goToDelete}>Delete</CustomMenuItem>
         </MenuList>
      </Menu>
   );
};

export default ManangePost;
