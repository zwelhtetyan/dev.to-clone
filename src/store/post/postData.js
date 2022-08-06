import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   cvImg: null,
   title: '',
   filteredTags: [],
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

      setFilteredTagsToStore: (state, action) => {
         state.filteredTags = action.payload;
      },

      setMDEValueToStore: (state, action) => {
         state.MDEValue = action.payload;
      },
   },
});

export const {
   setCvImgToStore,
   setTitleToStore,
   setFilteredTagsToStore,
   setMDEValueToStore,
} = PostDataSlice.actions;

export default PostDataSlice.reducer;
