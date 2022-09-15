import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import CreatePostFrom from '../components/post/CreatePostFrom';
import { useAuth } from '../context/auth';
import {
   getItemFromLocalStorage,
   removeFromLocalStorage,
   saveToLocalStorage,
} from '../helper/localStorage';
import { removeUnnecessaryUploadedMDEImg } from '../helper/removeUnnecessaryUploadedMDEImg';
import useCreatePost from '../hooks/useCreatePost';

const CreatePost = ({
   currentPostDataToEdit,
   uploadedMDEImgToEditPost,
   setUploadedMDEImgToEditPost,
}) => {
   //scroll top
   useEffect(() => window.scrollTo(0, 0), []);

   const user = useAuth();

   const [uploadedMDEImgToPublishPost, setUploadedMDEImgToPublishPost] =
      useState(getItemFromLocalStorage('uploadedMDEImgToPublishPost') || []);

   useEffect(() => {
      if (uploadedMDEImgToPublishPost.length) {
         saveToLocalStorage(
            'uploadedMDEImgToPublishPost',
            JSON.stringify(uploadedMDEImgToPublishPost)
         );
      }
   }, [uploadedMDEImgToPublishPost]);

   const {
      postData,
      title,
      setTitle,
      publishing,
      savingDraft,
      uploadingImg,
      setUploadingImg,
      publishPostHandler,
      draftPostHandler,
      eidtPostHandler,
   } = useCreatePost(currentPostDataToEdit);

   if (!user) {
      return <Navigate to='/create-account' />;
   }

   if (publishing || savingDraft) {
      if (currentPostDataToEdit) {
         if (uploadedMDEImgToEditPost.length) {
            removeUnnecessaryUploadedMDEImg(
               uploadedMDEImgToEditPost,
               postData.MDEValue
            );

            setUploadedMDEImgToEditPost([]);
            removeFromLocalStorage('uploadedMDEImgToEditPost');
         }
      } else {
         if (uploadedMDEImgToPublishPost.length) {
            removeUnnecessaryUploadedMDEImg(
               uploadedMDEImgToPublishPost,
               postData.MDEValue
            );

            setUploadedMDEImgToPublishPost([]);
            removeFromLocalStorage('uploadedMDEImgToPublishPost');
         }
      }
   }

   return (
      <CreatePostFrom
         publishPostHandler={publishPostHandler}
         draftPostHandler={draftPostHandler}
         eidtPostHandler={eidtPostHandler}
         setPostTitle={setTitle}
         postTitle={title}
         postData={postData}
         pageTitle={currentPostDataToEdit ? 'Edit' : 'Create'}
         publishing={publishing}
         savingDraft={savingDraft}
         uploadingImg={uploadingImg}
         setUploadingImg={setUploadingImg}
         toEdit={currentPostDataToEdit ? true : false}
         setUploadedMDEImg={
            currentPostDataToEdit
               ? setUploadedMDEImgToEditPost
               : setUploadedMDEImgToPublishPost
         }
      />
   );
};

export default CreatePost;
