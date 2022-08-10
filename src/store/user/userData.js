import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   userData: null,
   userStatus: {
      loading: false,
      err: false,
   },
};

const userDataSlice = createSlice({
   name: 'userData',
   initialState,
   reducers: {
      setUserData: (state, action) => {
         state.userData = action.payload;
      },

      setUserStatus: (state, action) => {
         state.userStatus = action.payload;
      },
   },
});

export const { setUserData, setUserStatus } = userDataSlice.actions;

export default userDataSlice.reducer;
