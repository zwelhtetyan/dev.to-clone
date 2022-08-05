import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   MDEValue: '',
   cvImg: null,
   title: '',
   filteredTags: [],
};

const EditPostSlice = createSlice({
   name: 'eidtPost',
   initialState,
   reducers: {
      setTitleToStoreToEdit: (state, action) => {
         state.title = action.payload;
      },

      setMDEValueToEdit: (state, action) => {
         state.MDEValue = action.payload;
      },

      setCvImgToEdit: (state, action) => {
         state.cvImg = action.payload;
      },

      setFilteredTagsToStoreToEdit: (state, action) => {
         state.filteredTags = action.payload;
      },
   },
});

export const {
   setTitleToStoreToEdit,
   setMDEValueToEdit,
   setCvImgToEdit,
   setFilteredTagsToStoreToEdit,
} = EditPostSlice.actions;

export default EditPostSlice.reducer;
