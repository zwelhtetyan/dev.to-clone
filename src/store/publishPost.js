import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   MDEValue: '',
   cvImgUrl: '',
   filteredTags: [],
};

const PublicPostSlice = createSlice({
   name: 'MDEValue',
   initialState,
   reducers: {
      setMDEValue: (state, action) => {
         state.MDEValue = action.payload;
      },

      setCvImgUrl: (state, action) => {
         state.cvImgUrl = action.payload;
      },

      setFilteredTagsToStore: (state, action) => {
         state.filteredTags = action.payload;
      },
   },
});

export const { setMDEValue, setCvImgUrl, setFilteredTagsToStore } =
   PublicPostSlice.actions;

export default PublicPostSlice.reducer;
