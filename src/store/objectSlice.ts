import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';

type Object = {
  key?: React.Key;
  id: number;
  title: string;
  userId?: number;
  completed?: boolean;
}

type ObjectsState = {
  list: Object[] | any[];
  loading: boolean;
  error: string | null;
}

export const fetchObjects = createAsyncThunk<Object[] | any[], undefined, {rejectValue: string}>(
    'object/fetchObjects',
    async function (_, { rejectWithValue }) {
        const response = await fetch("http://localhost:303/objects");//('https://jsonplaceholder.typicode.com/todos?_limit=10');

        if (!response.ok) {
          return rejectWithValue('Server Error!');
        }

        const data = await response.json();
        // console.log(" ----------- ", data);
        return data;
    }
);

const initialState: ObjectsState = {
  list: [],
  loading: false,
  error: null,
}

const objectSlice = createSlice({
  name: 'objects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchObjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchObjects.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export default objectSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
