import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   commentVal: '',
};

const commentSlice = createSlice({
   name: 'comment',
   initialState,
   reducers: {
      setCommentVal: (state, action) => {
         state.commentVal = action.payload;
      },
   },
});

export const { setCommentVal } = commentSlice.actions;

export default commentSlice.reducer;
