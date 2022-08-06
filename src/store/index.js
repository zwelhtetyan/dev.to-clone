import { configureStore } from '@reduxjs/toolkit';
import commentReducer from './comment';
import currentPostReducer from './post/currentPost';
import allPostDataSliceReducer from './post/allPostData';
import PostDataSliceReducer from './post/postData';

const store = configureStore({
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),

   reducer: {
      allPostData: allPostDataSliceReducer,
      postData: PostDataSliceReducer,
      currentPost: currentPostReducer,
      comment: commentReducer,
   },
});

export default store;
