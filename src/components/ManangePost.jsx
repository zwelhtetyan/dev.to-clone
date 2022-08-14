import { Menu, MenuButton, MenuList } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentPostData } from '../store/post/currentPost';
import CustomMenuItem from '../utils/CustomMenuItem';

const ManangePost = ({ postId, m }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { transformedData } = useSelector((state) => state.transformedData);

   //helper func
   const setCurrentPostDataHandler = () => {
      const postDetail = transformedData.find(
         (postData) => postData.id === postId
      );

      dispatch(
         setCurrentPostData({
            cvImg: postDetail.cvImg,
            title: postDetail.title,
            filteredTags: postDetail.filteredTags,
            MDEValue: postDetail.MDEValue,
            id: postId,
            draft: postDetail.draft,
         })
      );
   };

   const goToEdit = (e) => {
      e.stopPropagation();

      setCurrentPostDataHandler();
      navigate('/edit-post');
   };

   const goToDelete = (e) => {
      e.stopPropagation();

      setCurrentPostDataHandler();
      navigate('/delete-confirm');
   };

   return (
      <Menu autoSelect={false}>
         <MenuButton
            m={m}
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
            onClick={(e) => e.stopPropagation()}
         >
            Manage
         </MenuButton>
         <MenuList minW='0' w='105px'>
            <CustomMenuItem onClick={goToEdit}>Edit</CustomMenuItem>
            <CustomMenuItem onClick={goToDelete}>Delete</CustomMenuItem>
         </MenuList>
      </Menu>
   );
};

export default ManangePost;
