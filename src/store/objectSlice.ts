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
  search_substring: string | null | undefined;
  loading: boolean;
  error: string | null;
}

export const fetchObjects = createAsyncThunk<Object[] | any[], undefined, {rejectValue: string}>(
    'object/fetchObjects',
    async function (_, { rejectWithValue }) {
        const response = await fetch('http://localhost:8080/listObjectItems?workflow_id=1');
        if (!response.ok) {
          return rejectWithValue('Server Error!');
        }
        const data = await response.json();
        return data;
    }
);

const initialState: ObjectsState = {
  list: [],
  search_substring: '',
  loading: false,
  error: null,
}

const objectSlice = createSlice({
  name: 'objects',
  initialState,
  reducers: {
    changeSearchSubstring(state, action) {
        state.search_substring = action.payload;
    }
  },
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

export const {changeSearchSubstring} = objectSlice.actions;
export default objectSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
