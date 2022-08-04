import { configureStore } from '@reduxjs/toolkit';
import publicPostReducer from './publishPost';
import commentReducer from './comment';
import currentPostReducer from './currentPost';
import editPostReducer from './editPost';

const store = configureStore({
   reducer: {
      postToPublish: publicPostReducer,
      comment: commentReducer,
      currentPost: currentPostReducer,
      postToEdit: editPostReducer,
   },
});

export default store;
