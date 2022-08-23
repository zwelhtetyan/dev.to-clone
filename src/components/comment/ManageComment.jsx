import { Menu, MenuButton, MenuList } from '@chakra-ui/react';
import React from 'react';
import { RiMoreLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveToLocalStorage } from '../../helper/localStorage';
import { setcommentItem } from '../../store/comment/currentComments';
import CustomMenuItem from '../../utils/CustomMenuItem';

const ManageComment = ({ commentId, postId }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const currentComments = useSelector(
      (state) => state.currentComments.currentComments
   );

   //helper func
   const setCurrentCommentItemHandler = () => {
      let commentItem;

      currentComments.forEach((comment) => {
         if (comment.commentId === commentId) {
            commentItem = comment;
            return;
         }

         const innerComments = Object.values(comment.replies);
         if (innerComments.find((cmt) => cmt.commentId === commentId)) {
            commentItem = innerComments.find(
               (cmt) => cmt.commentId === commentId
            );
         }
      });

      dispatch(setcommentItem({ ...commentItem, postId }));

      saveToLocalStorage(
         'commentItemToManage',
         JSON.stringify({ ...commentItem, postId })
      );
   };

   const goToEdit = () => {
      setCurrentCommentItemHandler();
      navigate('/edit-comment');
   };

   const goToDelete = () => {
      setCurrentCommentItemHandler();
      navigate('/delete-confirm');
   };

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
            <CustomMenuItem onClick={goToEdit}>Edit</CustomMenuItem>
            <CustomMenuItem onClick={goToDelete}>Delete</CustomMenuItem>
         </MenuList>
      </Menu>
   );
};

export default ManageComment;
