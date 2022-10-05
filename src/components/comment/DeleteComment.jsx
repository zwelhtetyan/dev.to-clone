import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import converter from '../../helper/converter';
import { removeFromLocalStorage } from '../../helper/localStorage';
import { updateComment } from '../../lib/api';
import DeleteConfirm from '../../utils/DeleteConfirm';

const DeleteComment = () => {
   // scroll top
   useEffect(() => window.scrollTo(0, 0), []);

   const navigate = useNavigate();

   const [deleting, setDeleting] = useState(false);

   const transformedComments = useSelector(
      (state) => state.currentComments.transformedComments
   );

   const currentCommentItem = useSelector(
      (state) => state.currentComments.commentItem
   );

   if (!currentCommentItem) {
      return <Navigate to='/' />;
   }

   const onDismiss = () => {
      navigate(-1);
   };

   const onDelete = () => {
      setDeleting(true);
      updateComment(transformedComments, currentCommentItem.postId)
         .then((_) => {
            setDeleting(false);

            onDismiss();
            removeFromLocalStorage('transformedComments');
            removeFromLocalStorage('commentItemToManage');
            // console.log('deleted comment successfully');
         })
         .catch((err) => {
            console.log(err);
         });
   };

   return (
      <DeleteConfirm
         loading={deleting}
         onDismiss={onDismiss}
         onDelete={onDelete}
         type='comment'
         title={converter()
            .makeHtml(currentCommentItem.value)
            .replace(/<[^>]+>/g, '')}
      />
   );
};

export default DeleteComment;
