import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   MDEValue: { write: '', preview: '' },
   cvImg: null,
   filteredTags: [],
};

const PublicPostSlice = createSlice({
   name: 'MDEValue',
   initialState,
   reducers: {
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

export const { setMDEValue, setCvImg, setFilteredTagsToStore } =
   PublicPostSlice.actions;

export default PublicPostSlice.reducer;
