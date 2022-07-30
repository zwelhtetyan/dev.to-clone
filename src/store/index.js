import { configureStore } from '@reduxjs/toolkit';
import publicPostReducer from './publishPost';

const store = configureStore({
   reducer: {
      postToPublish: publicPostReducer,
   },
});

export default store;
