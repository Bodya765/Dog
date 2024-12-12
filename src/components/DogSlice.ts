import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Dog = {
  _id: string;
  name: string;
  age: number;
  breed: string;
  color: string;
  image?: string;
};

interface DogsState {
  dogs: Dog[];
  loading: boolean;
  error: string | null;
}

const initialState: DogsState = {
  dogs: [],
  loading: false,
  error: null,
};

const dogsSlice = createSlice({
  name: "dogs",
  initialState,
  reducers: {
    setDogs: (state, action: PayloadAction<Dog[]>) => {
      state.dogs = action.payload;
    },
    addDog: (state, action: PayloadAction<Dog>) => {
      if (!state.dogs.find((dog) => dog._id === action.payload._id)) {
        state.dogs.push(action.payload);
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setDogs, addDog, setLoading, setError } = dogsSlice.actions;
export default dogsSlice.reducer;
