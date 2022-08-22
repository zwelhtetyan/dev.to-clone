import { configureStore } from '@reduxjs/toolkit';
import currentPostReducer from './post/currentPost';
import postDataSliceReducer from './post/postData';
import transformedDataReducer from './data/transformedData';
import profileDataReducer from './user/profileData';

const store = configureStore({
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),

   reducer: {
      transformedData: transformedDataReducer, // hold all post data on globalStore
      postData: postDataSliceReducer, // data before publish
      currentPost: currentPostReducer, //data to edit || delete => (get id from it)
      profileData: profileDataReducer,
   },
});

export default store;
