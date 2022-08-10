import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   userData: null,
   loading: false,
};

const userDataSlice = createSlice({
   name: 'userData',
   initialState,
   reducers: {
      setUserData: (state, action) => {
         state.userData = action.payload;
      },

      setLoading: (state, action) => {
         state.status = action.payload;
      },
   },
});

export const { setUserData, setLoading } = userDataSlice.actions;

export default userDataSlice.reducer;
