import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   transformedData: null,
   transfromedDataLoading: false,
   transformedDataErr: false,
};

const transformedDataSlice = createSlice({
   name: 'userData',
   initialState,
   reducers: {
      setTransformedData: (state, action) => {
         state.transformedData = action.payload;
      },

      setTransformedDataLoading: (state, action) => {
         state.transfromedDataLoading = action.payload;
      },

      setTransformedDataErr: (state, action) => {
         state.transformedDataErr = action.payload;
      },
   },
});

export const {
   setTransformedData,
   setTransformedDataLoading,
   setTransformedDataErr,
} = transformedDataSlice.actions;

export default transformedDataSlice.reducer;
