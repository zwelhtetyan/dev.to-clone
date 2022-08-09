import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

   //value from redux store
   const postDataFromStore = useSelector((state) => state.postData);

   const initialState = useMemo(
      () => ({
         cvImg: null,
         title: '',
         filteredTags: [],
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
   const [publishing, setPublishing] = useState(false);
   const [uploadingImg, setUploadingImg] = useState(false);

   //set title to store
   useEffect(() => {
      dispatch(setTitleToStore(title));
   }, [title, dispatch]);

   //set postData everytime postDataFromStore change

   useEffect(() => {
      const newData = {
         cvImg: postDataFromStore.cvImg,
         title: postDataFromStore.title,
         filteredTags: postDataFromStore.filteredTags,
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

   //publish post
   const publishPostHandler = (e) => {
      setPublishing(true);

      createPost(postData)
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
      setPublishing(true);

      editPost(postData, postData.id)
         .then((_) => {
            navigate(-1);
            setPublishing(false);
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
      uploadingImg,
      setUploadingImg,
      publishPostHandler,
      eidtPostHandler,
   };
};

export default useCreatePost;
