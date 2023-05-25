import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import type { ColumnsType } from 'antd/es/table';

// json-server --warch bin.js ./db.json --port 303 http://localhost:303/column

// {title: 'Мнемокод', dataIndex: 'mcode'}

type ColumnItem = {
  gid?: number | null;
  id?: number | null;
  pid?: string | number | null;
  name: string | null;
  code: string | null;
  dataIndex: string | null;
  comment?: string | null;
  level?: number;
  icon_name?: string | null;
  actionType?: string | null;
  priority?: boolean | string | number | null;
  dataField?: string | null;
  iconName?: string | null;
  url?: string | null;
  display?: boolean | number | null;
  sortAllowed?: boolean | number | null;
  filterAllowed?: boolean | number | null;
}

type ColumnItemState = {
  list: ColumnItem[];
  loading_column: boolean;
  error_column: string | null;
}

export const fetchColumnItems = createAsyncThunk<ColumnItem[], undefined, {rejectValue: string}>(
    'columnitems/fetchColumnItems',
    async function (_, { rejectWithValue }) {
      const response = await fetch('http://localhost:303/columns');

      if (!response.ok) {
        return rejectWithValue('Server Error!');
      }

      const data = await response.json();
      // console.log("!!!!!!!!!!!!!!!!!!!column data", data);
      return data;
    }
);

const initialState: ColumnItemState = {
  list: [],
  loading_column: false,
  error_column: null,
}

const columnItemSlice = createSlice({
  name: 'columnitems',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchColumnItems.pending, (state) => {
        state.loading_column = true;
        state.error_column = null;
      })
      .addCase(fetchColumnItems.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading_column = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error_column = action.payload;
        state.loading_column = false;
      });
  }
});

export default columnItemSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
