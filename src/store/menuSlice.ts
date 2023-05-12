import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';

// json-server --warch bin.js ./db.json --port 303 http://localhost:303/menu

type MenuItem = {
  gid: number | null;
  id: number | null;
  pid: string | number | null;
  name: string | null;
  code: string | null;
  comment: string | null;
  level: number;
  icon_name: string | null;
  link: string | null;
}

type MenuItemState = {
  list: MenuItem[];
  loading: boolean;
  error: string | null;
}

export const fetchMenuItems = createAsyncThunk<MenuItem[], undefined, {rejectValue: string}>(
    'menuitems/fetchMenuItems',
    async function (_, { rejectWithValue }) {
      const response = await fetch('http://localhost:303/menu');

      if (!response.ok) {
        return rejectWithValue('Server Error!');
      }

      const data = await response.json();
      return data;
    }
);

const initialState: MenuItemState = {
  list: [],
  loading: false,
  error: null,
}

const menuItemSlice = createSlice({
  name: 'menuitems',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export default menuItemSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
