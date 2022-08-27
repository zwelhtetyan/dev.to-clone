import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   clickComment: false,
};

const goDiscussionSlice = createSlice({
   name: 'go_discussion',
   initialState,
   reducers: {
      setClickComment: (state, action) => {
         state.clickComment = action.payload;
      },
   },
});

export const { setClickComment } = goDiscussionSlice.actions;

export default goDiscussionSlice.reducer;
