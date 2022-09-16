import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import CreatePost from './CreatePost';

const EditPost = () => {
   const currentPostData = useSelector(
      (state) => state.currentPost.currentPostData
   );

   if (!currentPostData) {
      return <Navigate to={-1} />;
   }

   return <CreatePost currentPostDataToEdit={currentPostData} />;
};

export default EditPost;
