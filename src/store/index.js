import { configureStore } from '@reduxjs/toolkit';
import publicPostReducer from './publishPost';

const store = configureStore({
   reducer: {
      publicPost: publicPostReducer,
   },
});

export default store;
