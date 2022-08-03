import { configureStore } from '@reduxjs/toolkit';
import publicPostReducer from './publishPost';
import commentReducer from './comment';
import currentPostReducer from './currentPost';

const store = configureStore({
   reducer: {
      postToPublish: publicPostReducer,
      comment: commentReducer,
      currentPost: currentPostReducer,
   },
});

export default store;
