import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';

type Object = {
  key?: React.Key | null | undefined,
  id?: number | null | undefined,
  name?: string | null | undefined,
  code?: string | null | undefined,
  workflow_id?: number | null | undefined,
  comment?: string | null | undefined,
  isHistory?: boolean | number | null | undefined,
  isSystem?: boolean | number | null | undefined,
  isExport?: boolean | number | null | undefined,
  status?: number | null | undefined,
  dtCreate?: string  | null | undefined,
  dtUpdate?: string | null | undefined,
  userCreate?: string | null | undefined,
  userUpdate?: string | null | undefined,
};

type ObjectsState = {
  list: Object[] | any[];
  loading: boolean;
  error: string | null;
}

export const fetchObjects = createAsyncThunk<Object[] | any[], undefined, {rejectValue: string}>(
    'object/fetchObjects',
    async function (_, { rejectWithValue }) {
        const response = await fetch("http://localhost:303/objects");

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
