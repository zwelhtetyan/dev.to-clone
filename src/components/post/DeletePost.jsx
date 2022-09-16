import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { removeFromLocalStorage } from '../../helper/localStorage';
import { deletePost } from '../../lib/api';
import DeleteConfirm from '../../utils/DeleteConfirm';

const DeletePost = () => {
   //scroll top
   useEffect(() => window.scrollTo(0, 0), []);

   const [deleting, setDeleting] = useState(false);

   const navigate = useNavigate();

   const user = useAuth();

   const currentPostData = useSelector(
      (state) => state.currentPost.currentPostData
   );

   if (!user || !currentPostData) {
      return <Navigate to='/' />;
   }

   const pathname = currentPostData.draft ? '/dashboard/drafts' : '/dashboard';

   const onDelete = () => {
      setDeleting(true);

      deletePost(currentPostData.id)
         .then(() => {
            setDeleting(false);

            navigate(pathname);
            removeFromLocalStorage('postDataToManage');
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const onDismiss = () => {
      navigate(-1);
   };

   return (
      <DeleteConfirm
         title={currentPostData.title}
         onDismiss={onDismiss}
         onDelete={onDelete}
         type='post'
         loading={deleting}
      />
   );
};

export default DeletePost;
