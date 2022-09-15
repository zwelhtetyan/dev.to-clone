import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getURLFromMDE } from '../helper/getURLFromMDE';
import {
   getItemFromLocalStorage,
   saveToLocalStorage,
} from '../helper/localStorage';
import CreatePost from './CreatePost';

const EditPost = () => {
   const currentPostData = useSelector(
      (state) => state.currentPost.currentPostData
   );

   const prevUploadedMDEImgToEdit = getURLFromMDE(currentPostData?.MDEValue);

   const [uploadedMDEImgToEditPost, setUploadedMDEImgToEditPost] = useState(
      prevUploadedMDEImgToEdit ||
         getItemFromLocalStorage('uploadedMDEImgToEditPost') ||
         []
   );

   useEffect(() => {
      saveToLocalStorage(
         'uploadedMDEImgToEditPost',
         JSON.stringify(uploadedMDEImgToEditPost)
      );
   }, [uploadedMDEImgToEditPost]);

   if (!currentPostData) {
      return <Navigate to={-1} />;
   }

   return (
      <CreatePost
         currentPostDataToEdit={currentPostData}
         uploadedMDEImgToEditPost={uploadedMDEImgToEditPost}
         setUploadedMDEImgToEditPost={setUploadedMDEImgToEditPost}
      />
   );
};

export default EditPost;
