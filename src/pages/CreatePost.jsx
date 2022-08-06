import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   removeFromLocalStorage,
   saveToLocalStorage,
} from '../helper/localStorage';
import { useNavigate } from 'react-router-dom';
import { createPost, editPost } from '../lib/api';
import CreatePostFrom from '../components/CreatePostFrom';
import { getItemFromLocalStorage } from '../helper/localStorage';
import { setTitleToStoreToEdit } from '../store/post/editPost';
import { setTitleToStoreToPublish } from '../store/post/publishPost';

const CreatePost = ({ currentPostDataToEdit }) => {
   //scroll top
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   const navigate = useNavigate();
   const dispatch = useDispatch();

   //value from redux store
   const postToPublish = useSelector((state) => state.postToPublish);
   const postToEdit = useSelector((state) => state.postToEdit);

   const initialState = {
      cvImg: null,
      title: '',
      filteredTags: [],
      MDEValue: '',
   };

   //states
   const [postDataToEdit, setPostDataToEdit] = useState(currentPostDataToEdit);

   const [postDataToPublish, setPostDataToPublish] = useState(
      () => getItemFromLocalStorage('postDataToPublish') || initialState
   );
   const [titleToPublish, setTitleToPublish] = useState(
      postDataToPublish.title || ''
   );
   const [titleToEdit, setTitleToEdit] = useState(postDataToEdit?.title || '');

   const [publishing, setPublishing] = useState(false);
   const [uploadingImg, setUploadingImg] = useState(false);

   /////////////////////////////////////////////////////////////////////////

   //update title to redux store
   useEffect(() => {
      if (currentPostDataToEdit) {
         dispatch(setTitleToStoreToEdit(titleToEdit));
      } else {
         dispatch(setTitleToStoreToPublish(titleToPublish));
      }
   }, [titleToEdit, dispatch, titleToPublish, currentPostDataToEdit]);

   //to edit
   useEffect(() => {
      const newData = {
         cvImg: postToEdit.cvImg,
         title: postToEdit.title,
         filteredTags: postToEdit.filteredTags,
         MDEValue: postToEdit.MDEValue,
      };

      setPostDataToEdit((prevData) => ({ ...prevData, ...newData }));
   }, [postToEdit]);

   useEffect(
      () =>
         saveToLocalStorage('postDataToEdit', JSON.stringify(postDataToEdit)),
      [postDataToEdit]
   );

   //to public
   useEffect(() => {
      if (!currentPostDataToEdit) {
         const newData = {
            cvImg: postToPublish.cvImg,
            title: postToPublish.title,
            filteredTags: postToPublish.filteredTags,
            MDEValue: postToPublish.MDEValue,
         };

         setPostDataToPublish(newData);
         const saveToLS = setTimeout(
            () =>
               saveToLocalStorage('postDataToPublish', JSON.stringify(newData)),
            500
         );

         return () => clearTimeout(saveToLS);
      }
   }, [postToPublish, currentPostDataToEdit]);

   //publish post
   const publishPostHandler = (e) => {
      e.preventDefault();

      setPublishing(true);

      createPost(postDataToPublish)
         .then((_) => {
            navigate('/');
            setPublishing(false);
            removeFromLocalStorage('postDataToPublish');

            console.log('uploaded post successfully!');
         })
         .catch((err) => console.log(err));
   };

   //Edit post
   const eidtPostHandler = async (e) => {
      e.preventDefault();

      setPublishing(true);

      editPost(postDataToEdit, postDataToEdit.id)
         .then((_) => {
            navigate(-1);
            setPublishing(false);
            removeFromLocalStorage('postDataToEdit');

            console.log('updated post successfully');
         })
         .catch((err) => console.log(err));
   };

   return (
      <CreatePostFrom
         handleSubmit={
            currentPostDataToEdit ? eidtPostHandler : publishPostHandler
         }
         setPostTitle={
            currentPostDataToEdit ? setTitleToEdit : setTitleToPublish
         }
         postTitle={currentPostDataToEdit ? titleToEdit : titleToPublish}
         postData={currentPostDataToEdit ? postDataToEdit : postDataToPublish}
         pageTitle={currentPostDataToEdit ? 'Edit' : 'Create'}
         publishing={publishing}
         uploadingImg={uploadingImg}
         setUploadingImg={setUploadingImg}
         toEdit={currentPostDataToEdit ? true : false}
      />
   );
};

export default CreatePost;
