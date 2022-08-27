import { createSlice } from '@reduxjs/toolkit';
import { getItemFromLocalStorage } from '../../helper/localStorage';

const initialState = {
   currentComments: [],
   commentItem: getItemFromLocalStorage('commentItemToManage') || null, // to manage => edit || delete
   transformedComments: getItemFromLocalStorage('transformedComments') || [], // for deleting comment
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

      setTransformedComments: (state, action) => {
         state.transformedComments = action.payload;
      },
   },
});

export const { setCurrentComments, setcommentItem, setTransformedComments } =
   currentCommentsSlice.actions;

export default currentCommentsSlice.reducer;
