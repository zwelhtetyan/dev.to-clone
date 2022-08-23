import { createSlice } from '@reduxjs/toolkit';
import { getItemFromLocalStorage } from '../../helper/localStorage';

const initialState = {
   currentComments: [],
   commentItem: getItemFromLocalStorage('commentItemToManage') || {}, // to manage => edit || delete
};

const currentCommentsSlice = createSlice({
   name: 'currentComment',
   initialState,
   reducers: {
      setCurrentComments: (state, action) => {
         state.currentComments = action.payload;
      },

      setcommentItem: (state, action) => {
         state.commentItem = action.payload;
      },
   },
});

export const { setCurrentComments, setcommentItem } =
   currentCommentsSlice.actions;

export default currentCommentsSlice.reducer;
