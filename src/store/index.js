import { configureStore } from '@reduxjs/toolkit';
import publicPostReducer from './post/publishPost';
import commentReducer from './comment';
import currentPostReducer from './post/currentPost';
import editPostReducer from './post/editPost';
import allPostDataSliceReducer from './post/allPostData';

const store = configureStore({
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),

   reducer: {
      postToPublish: publicPostReducer,
      comment: commentReducer,
      currentPost: currentPostReducer,
      postToEdit: editPostReducer,
      allPostData: allPostDataSliceReducer,
   },
});

export default store;
