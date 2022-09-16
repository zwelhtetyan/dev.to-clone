import { createSlice } from '@reduxjs/toolkit';
import { getItemFromLocalStorage } from '../../helper/localStorage';

const initialState = {
   currentComments: [], // when giving like to multiple comment items quickly , it takes a time to transform comment item with already liked or not , so I stored transformed current comments in redux store and put them to server
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
