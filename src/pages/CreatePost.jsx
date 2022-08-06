import React, { useEffect } from 'react';
import CreatePostFrom from '../components/CreatePostFrom';
import useCreatePost from '../hooks/useCreatePost';

const CreatePost = ({ currentPostDataToEdit }) => {
   //scroll top
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

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
