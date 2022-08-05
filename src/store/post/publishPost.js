import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   MDEValue: '',
   cvImg: null,
   filteredTags: [],
   title: '',
};

const PublicPostSlice = createSlice({
   name: 'publishpost',
   initialState,
   reducers: {
      setTitleToStoreToPublish: (state, action) => {
         state.title = action.payload;
      },

      setMDEValue: (state, action) => {
         state.MDEValue = action.payload;
      },

      setCvImg: (state, action) => {
         state.cvImg = action.payload;
      },

      setFilteredTagsToStore: (state, action) => {
         state.filteredTags = action.payload;
      },
   },
});

export const {
   setMDEValue,
   setCvImg,
   setFilteredTagsToStore,
   setTitleToStoreToPublish,
} = PublicPostSlice.actions;

export default PublicPostSlice.reducer;
