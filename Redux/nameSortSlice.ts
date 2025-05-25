import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NameState {
  names: string[];
}

const initialState: NameState = {
  names: ['John', 'Alice', 'Bob', 'Charlie'],
};

const nameSortSlice = createSlice({
  name: 'nameSort',
  initialState,
  reducers: {
    sortNames(state, action: PayloadAction<'asc' | 'desc'>) {
      state.names.sort((a, b) =>
        action.payload === 'asc'
          ? a.localeCompare(b)
          : b.localeCompare(a)
      );
    },
  },
});

export const { sortNames } = nameSortSlice.actions;
export default nameSortSlice.reducer;
