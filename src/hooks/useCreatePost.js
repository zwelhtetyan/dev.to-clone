import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import {
   getItemFromLocalStorage,
   removeFromLocalStorage,
   saveToLocalStorage,
} from '../helper/localStorage';
import { createPost, editPost } from '../lib/api';
import { setTitleToStore } from '../store/post/postData';

const useCreatePost = (currentPostDataToEdit) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const user = useAuth();

   //value from redux store
   const postDataFromStore = useSelector((state) => state.postData);

   const initialState = useMemo(
      () => ({
         cvImg: '',
         title: '',
         tags: [],
         MDEValue: '',
      }),
      []
   );

   //states
   const [postData, setPostData] = useState(
      currentPostDataToEdit ||
         getItemFromLocalStorage('postDataToPublish') ||
         initialState
   );
   const [title, setTitle] = useState(postData?.title || '');
   const [uploadingImg, setUploadingImg] = useState(false);
   const [publishing, setPublishing] = useState(false);
   const [savingDraft, setSavingDraft] = useState(false);

   //set title to store
   useEffect(() => {
      dispatch(setTitleToStore(title));
   }, [title, dispatch]);

   //set postData everytime postDataFromStore change
   useEffect(() => {
      const newData = {
         cvImg: postDataFromStore.cvImg,
         title: postDataFromStore.title,
         tags: postDataFromStore.tags,
         MDEValue: postDataFromStore.MDEValue,
      };

      setPostData((prevData) => ({ ...prevData, ...newData }));
   }, [postDataFromStore]);

   //save to localStorage
   useEffect(() => {
      if (postData) {
         saveToLocalStorage(
            currentPostDataToEdit ? 'postDataToEdit' : 'postDataToPublish',
            JSON.stringify(postData)
         );
      }
   }, [postData, currentPostDataToEdit]);

   //helper function for set publishing || saving logic
   const helper = (type, bol) => {
      let newData;

      if (type === 'publish') {
         setPublishing(bol);
         newData = { ...postData, userId: user.userId, draft: false };
      } else if (type === 'draft') {
         setSavingDraft(bol);
         newData = { ...postData, userId: user.userId, draft: true };
      }

      return newData;
   };

   //publish post
   const publishPostHandler = (publishingType) => {
      const newData = helper(publishingType, true);

      createPost(newData)
         .then((_) => {
            navigate('/dashboard');
            helper(publishingType, false);
            removeFromLocalStorage('postDataToPublish');

            console.log('uploaded post successfully!');
         })
         .catch((err) => {
            helper(publishingType, false);
            console.log(err);
         });
   };

   //Edit post
   const eidtPostHandler = (publishingType) => {
      const newData = helper(publishingType, true);

      editPost(newData)
         .then((_) => {
            navigate(-1);
            helper(publishingType, false);
            removeFromLocalStorage('postDataToEdit');

            console.log('updated post successfully');
         })
         .catch((err) => console.log(err));
   };

   return {
      postData,
      title,
      setTitle,
      publishing,
      savingDraft,
      uploadingImg,
      setUploadingImg,
      publishPostHandler,
      eidtPostHandler,
   };
};

export default useCreatePost;
