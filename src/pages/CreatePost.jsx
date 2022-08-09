import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import CreatePostFrom from '../components/CreatePostFrom';
import { useAuth } from '../context/auth';
import useCreatePost from '../hooks/useCreatePost';

const CreatePost = ({ currentPostDataToEdit }) => {
   //scroll top
   useEffect(() => window.scrollTo(0, 0), []);

   const user = useAuth();

   const {
      publishPostHandler,
      eidtPostHandler,
      setTitle,
      title,
      postData,
      publishing,
      uploadingImg,
      setUploadingImg,
   } = useCreatePost(currentPostDataToEdit);

   if (!user) {
      return <Navigate to='/login' />;
   }

   return (
      <CreatePostFrom
         handleSubmit={
            currentPostDataToEdit ? eidtPostHandler : publishPostHandler
         }
         setPostTitle={setTitle}
         postTitle={title}
         postData={postData}
         pageTitle={currentPostDataToEdit ? 'Edit' : 'Create'}
         publishing={publishing}
         uploadingImg={uploadingImg}
         setUploadingImg={setUploadingImg}
         toEdit={currentPostDataToEdit ? true : false}
      />
   );
};

export default CreatePost;
