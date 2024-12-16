import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dogs: [],
  loading: false,
  error: '',
};

const dogsSlice = createSlice({
  name: 'dogs',
  initialState,
  reducers: {
    addDog(state, action) {
      state.dogs.push(action.payload); // add dog to the list
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { addDog, setLoading, setError } = dogsSlice.actions;  // Ensure this line exists
export default dogsSlice.reducer;
