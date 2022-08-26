import React from 'react';
import { useSelector } from 'react-redux';
import CreatePost from './CreatePost';

const EditPost = () => {
   const currentPostData = useSelector(
      (state) => state.currentPost.currentPostData
   );

   return <CreatePost currentPostDataToEdit={currentPostData} />;
};

export default EditPost;
