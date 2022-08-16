import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   profileData: null,
   profileDataLoading: false,
   profileDataErr: false,
};

const profileDataSlice = createSlice({
   name: 'profileData',
   initialState,
   reducers: {
      setProfileData: (state, action) => {
         state.profileData = action.payload;
      },

      setProfileDataLoading: (state, action) => {
         state.profileDataLoading = action.payload;
      },

      setProfileDataErr: (state, action) => {
         state.profileDataErr = action.payload;
      },
   },
});

export const { setProfileData, setProfileDataLoading, setProfileDataErr } =
   profileDataSlice.actions;

export default profileDataSlice.reducer;
