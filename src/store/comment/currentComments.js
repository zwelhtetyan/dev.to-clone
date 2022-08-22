import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   currentComments: [],
};

const currentCommentsSlice = createSlice({
   name: 'currentComment',
   initialState,
   reducers: {
      setCurrentComments: (state, action) => {
         state.currentComments = action.payload;
      },
   },
});

export const { setCurrentComments } = currentCommentsSlice.actions;

export default currentCommentsSlice.reducer;
