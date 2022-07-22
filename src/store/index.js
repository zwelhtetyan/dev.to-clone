import { configureStore } from '@reduxjs/toolkit';
import publishPostReducer from './publishPost';

const store = configureStore({
   reducer: {
      publishPost: publishPostReducer,
   },
});

export default store;
