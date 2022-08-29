import { Menu, MenuButton, MenuList } from '@chakra-ui/react';
import React from 'react';
import { RiMoreLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveToLocalStorage } from '../../helper/localStorage';
import {
   setcommentItem,
   setTransformedComments,
} from '../../store/comment/currentComments';
import CustomMenuItem from '../../utils/CustomMenuItem';

const ManageComment = ({ commentId, postId, comments }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const currentComments = useSelector(
      (state) => state.currentComments.currentComments
   );

   //helper funcs
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

   const transformedCommentsHandler = () => {
      const filteredComments = comments.filter(
         (comment) => comment.commentId !== commentId
      );

      const transformedCommennts = filteredComments.map((comment) => {
         const repliedComments = Object.values(comment.replies)
            .sort((a, b) => a.createdAt - b.createdAt)
            .filter((cmt) => cmt.commentId !== commentId);

         const commentIds = [
            comment.commentId,
            ...repliedComments.map((cmt) => cmt.commentId),
         ];

         repliedComments.forEach((cmt) => {
            if (!commentIds.includes(cmt.repliedCommentId)) {
               commentIds.splice(commentIds.indexOf(cmt.commentId), 1);
            }
         });

         const finalRepliedComments = repliedComments.filter((cmt) =>
            commentIds.includes(cmt.commentId)
         );

         return {
            ...comment,
            replies: { ...finalRepliedComments },
         };
      });

      dispatch(setTransformedComments(transformedCommennts));
      saveToLocalStorage(
         'transformedComments',
         JSON.stringify(transformedCommennts)
      );
   };

   const goToEdit = () => {
      setCurrentCommentItemHandler();
      navigate('/edit-comment');
   };

   const goToDelete = () => {
      setCurrentCommentItemHandler();
      transformedCommentsHandler();
      navigate('/delete-comment');
   };

   return (
      <Menu autoSelect={false} isLazy>
         <MenuButton
            bg='transparent'
            p='0 3px'
            h='24px'
            borderRadius='5px'
            _hover={{
               bg: 'rgb(59 73 223 / 10%)',
               color: 'rgb(47 58 178)',
            }}
         >
            <RiMoreLine size={20} color='#717171' className='more-icon' />
         </MenuButton>
         <MenuList minW='0' w='105px'>
            <CustomMenuItem onClick={goToEdit}>Edit</CustomMenuItem>
            <CustomMenuItem onClick={goToDelete}>Delete</CustomMenuItem>
         </MenuList>
      </Menu>
   );
};

export default ManageComment;
