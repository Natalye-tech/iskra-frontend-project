import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';


type MenuItem = {
  gid?: number | null;
  id: number | null;
  pid?: string | number | null;
  name?: string | null;
  code?: string | null;
  comment?: string | null;
  level?: number;
  iconName?: string | null;
  link?: string | null;
}

type MenuItemState = {
  list: MenuItem[];
  activ_menu_item: string;
  loading_menu: boolean;
  error_menu: string | null;
}

// http://localhost:303/menu

export const fetchMenuItems = createAsyncThunk<MenuItem[], undefined, {rejectValue: string}>(
    'menuitems/fetchMenuItems',
    async function (_, { rejectWithValue }) {
      const response = await fetch('http://localhost:8080/listActionDrawer');

      if (!response.ok) {
        return rejectWithValue('Server Error!');
      }

      const data = await response.json();
      return data;
    }
);

const initialState: MenuItemState = {
  list: [],
  activ_menu_item: 'DRAWER_OBJECT',
  loading_menu: false,
  error_menu: null,
}

const menuItemSlice = createSlice({
  name: 'menuitems',
  initialState,
  reducers: {
    changeActiveMenuItem(state, action) {
        state.activ_menu_item = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItems.pending, (state) => {
        state.loading_menu = true;
        state.error_menu = null;
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading_menu = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error_menu = action.payload;
        state.loading_menu = false;
      });
  }
});

export const {changeActiveMenuItem} = menuItemSlice.actions;
export default menuItemSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
