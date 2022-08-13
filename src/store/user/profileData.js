import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   profileData: null,
};

const profileDataSlice = createSlice({
   name: 'profileData',
   initialState,
   reducers: {
      setProfileData: (state, action) => {
         state.profileData = action.payload;
      },
   },
});

export const { setProfileData } = profileDataSlice.actions;

export default profileDataSlice.reducer;
