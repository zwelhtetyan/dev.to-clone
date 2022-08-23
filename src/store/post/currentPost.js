import { createSlice } from '@reduxjs/toolkit';
import { getItemFromLocalStorage } from '../../helper/localStorage';

const initialState = {
   currentPostData: getItemFromLocalStorage('postDataToManage') || null,
};

const currentPostSlice = createSlice({
   name: 'currentPost',
   initialState,
   reducers: {
      setCurrentPostData: (state, action) => {
         state.currentPostData = action.payload;
      },
   },
});

export const { setCurrentPostData } = currentPostSlice.actions;

export default currentPostSlice.reducer;
