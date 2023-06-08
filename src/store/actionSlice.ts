import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';

type ActionTB = {
  key?: React.Key | null | undefined,
  id?: number | null | undefined,
  name?: string | null | undefined,
  code?: string | null | undefined,
  actionType?: string | null | undefined,
  dataField?: string | null,
  display?: number | null | undefined,
  filterAllowed: null,
  gid?: number | null | undefined,
  iconName?: string | null,
  level?: number | null | undefined,
  pid?: boolean | number | null | undefined,
  priority?: number | null | undefined,
  sortAllowed?: number | null | undefined,
  url?: string | null
};

type ActionTBState = {
  list: ActionTB[] | any[];
  loading: boolean;
  error: string | null;
};

export const fetchActionTB = createAsyncThunk<ActionTB[] | any[], undefined, {rejectValue: string}>(
    'actionstb/fetchActionTB',
    async function (_, { rejectWithValue }) {
        const response = await fetch('http://localhost:8080/listActionObjectToolbox');
        if (!response.ok) {
          return rejectWithValue('Server Error!');
        }
        const data = await response.json();
        // console.log('ACTION DATA ************* ', data);
        return data;
    }
);

const initialState: ActionTBState = {
  list: [],
  loading: false,
  error: null,
}

const actionTBSlice = createSlice({
  name: 'actionstb',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActionTB.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActionTB.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export default actionTBSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
