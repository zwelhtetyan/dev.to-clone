import { configureStore } from '@reduxjs/toolkit';
import currentPostReducer from './post/currentPost';
import postDataSliceReducer from './post/postData';
import transformedDataReducer from './data/transformedData';
import profileDataReducer from './user/profileData';
import currentCommentReducer from './comment/currentComments';
import scrollDiscussionReducer from './scrollDiscussion';
import loginAlertReducer from './loginAlert';

const store = configureStore({
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),

   reducer: {
      transformedData: transformedDataReducer, // hold all post data on globalStore
      postData: postDataSliceReducer, // data before publish
      currentPost: currentPostReducer, //data to edit || delete
      profileData: profileDataReducer,
      currentComments: currentCommentReducer, // helper comment state, otherwise commentArray form server take a while to response , it cause a bug when click to like button quickly.
      scrollDiscussion: scrollDiscussionReducer,
      loginAlert: loginAlertReducer,
   },
});

export default store;
