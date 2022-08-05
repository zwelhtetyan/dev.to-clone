import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   allPostData: null,
   loading: false,
   err: false,
};

const allPostDataSlice = createSlice({
   name: 'allPostData',
   initialState,
   reducers: {
      setAllPostDataToStore: (state, action) => {
         state.allPostData = action.payload;
      },

      setLoading: (state, action) => {
         state.loading = action.payload;
      },

      setErr: (state, action) => {
         state.err = action.payload;
      },
   },
});

export const { setAllPostDataToStore, setLoading, setErr } =
   allPostDataSlice.actions;

export default allPostDataSlice.reducer;
