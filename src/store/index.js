import { configureStore } from '@reduxjs/toolkit';
import commentReducer from './comment';
import currentPostReducer from './post/currentPost';
import allPostDataSliceReducer from './post/allPostData';
import postDataSliceReducer from './post/postData';
import userDataReducer from './user/userData';

const store = configureStore({
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),

   reducer: {
      allPostData: allPostDataSliceReducer, // hold all post data on globalStore
      postData: postDataSliceReducer, // data before publish
      currentPost: currentPostReducer, //data to edit or delete => (get id from it)
      userData: userDataReducer,
      comment: commentReducer,
   },
});

export default store;
