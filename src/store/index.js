import { configureStore } from '@reduxjs/toolkit';
import publicPostReducer from './publishPost';
import commentReducer from './comment';

const store = configureStore({
   reducer: {
      postToPublish: publicPostReducer,
      comment: commentReducer,
   },
});

export default store;
