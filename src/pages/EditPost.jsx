import React from 'react';
import { useSelector } from 'react-redux';
import { getItemFromLocalStorage } from '../helper/localStorage';
import CreatePost from './CreatePost';

const EditPost = () => {
   const currentPostData = useSelector(
      (state) => state.currentPost.currentPostData
   );

   const currentPost =
      currentPostData || getItemFromLocalStorage('postDataToEdit'); // which is stored form <CreatePost /> => line 70;

   return <CreatePost currentPostDataToEdit={currentPost} />;
};

export default EditPost;
