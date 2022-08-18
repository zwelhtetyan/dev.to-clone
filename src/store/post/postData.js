import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   cvImg: '',
   title: '',
   tags: [],
   MDEValue: '',
};

const PostDataSlice = createSlice({
   name: 'postData',
   initialState,
   reducers: {
      setTitleToStore: (state, action) => {
         state.title = action.payload;
      },

      setCvImgToStore: (state, action) => {
         state.cvImg = action.payload;
      },

      setTagsToStore: (state, action) => {
         state.tags = action.payload;
      },

      setMDEValueToStore: (state, action) => {
         state.MDEValue = action.payload;
      },
   },
});

export const {
   setCvImgToStore,
   setTitleToStore,
   setTagsToStore,
   setMDEValueToStore,
} = PostDataSlice.actions;

export default PostDataSlice.reducer;
