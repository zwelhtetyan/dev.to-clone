import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   allPostData: null,
   postStatus: {
      loading: false,
      err: false,
   },
};

const allPostDataSlice = createSlice({
   name: 'allPostData',
   initialState,
   reducers: {
      setAllPostData: (state, action) => {
         state.allPostData = action.payload;
      },

      setPostStatus: (state, action) => {
         state.postStatus = action.payload;
      },
   },
});

export const { setAllPostData, setPostStatus } = allPostDataSlice.actions;

export default allPostDataSlice.reducer;
