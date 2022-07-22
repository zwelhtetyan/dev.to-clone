import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   MDEValue: '',
};

const publishPostSlice = createSlice({
   name: 'publishPost',
   initialState,
   reducers: {
      setMDEValue: (state, action) => {
         state.MDEValue = action.payload;
      },
   },
});

export const { setMDEValue } = publishPostSlice.actions;

export default publishPostSlice.reducer;
