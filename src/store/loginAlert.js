import { createSlice } from '@reduxjs/toolkit';

const initialState = { showLoginAlert: false };

const loginAlertSlice = createSlice({
   name: 'loginAlert',
   initialState,
   reducers: {
      setLoginAlert: (state, action) => {
         state.showLoginAlert = action.payload;
      },
   },
});

export const { setLoginAlert } = loginAlertSlice.actions;

export default loginAlertSlice.reducer;
