import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';

type Object = {
  key?: React.Key | null | undefined,
  id: number | null | undefined,
  name: string | null | undefined,
  code: string | null | undefined,
  workflow_id: number | null | undefined,
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

  search_substring: string | null | undefined;
  current_object: Object | null | any;
  current_object_code: string | null;
  current_object_name: string | null;
  current_object_comment: string | null;
  current_object_isHistory?: boolean | number | null | undefined;
  current_object_isSystem?: boolean | number | null | undefined;
  current_object_isExport?: boolean | number | null | undefined;
  current_object_status?: boolean | number | null | undefined;
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


export const addNewObject = createAsyncThunk<Object, Object, { rejectValue: string }>(
  'object/addNewObject',

  async function (object, { rejectWithValue }) {
    // console.log("############### object ", object);

      const response = await fetch('http://localhost:8080/fn_check_object_code_unique', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
      });

      if (!response.ok) {
        return rejectWithValue('Can\'t add object. Server error.');
      }

      return (await response.json()) as Object;
  }
);


const initialState: ObjectsState = {
  list: [],
  loading: false,
  error: null,

  search_substring: '',
  current_object: null,
  current_object_code: '',
  current_object_name: '',
  current_object_comment: '',
  current_object_isHistory: 0,
  current_object_isSystem: 0,
  current_object_isExport: 0,
  current_object_status: 0
}

const objectSlice = createSlice({
  name: 'objects',
  initialState,
  reducers: {
    changeSearchSubstring(state, action) {
        state.search_substring = action.payload;
    },
    getObject(state, action) {
        if (action.payload) {
          let obj = state.list.find(item => item.id == action.payload);
          state.current_object = obj;
          state.current_object_code = obj.code;
          state.current_object_name = obj.name;
          state.current_object_comment = obj.comment;
          state.current_object_isHistory = obj.isHistory;
          state.current_object_isSystem = obj.isSystem;
          state.current_object_isExport = obj.isExport;
          state.current_object_status = obj.status;
        }
        else {
          state.current_object = null;
          state.current_object_code = '';
          state.current_object_name = '';
          state.current_object_comment = '';
          state.current_object_isHistory = 0;
          state.current_object_isSystem = 0;
          state.current_object_isExport = 0;
          state.current_object_status = 0;
        }
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
      .addCase(addNewObject.pending, (state) => {
        state.error = null;
      })
      .addCase(addNewObject.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        console.log("ERROR!!!!!!!!! ", state.error)
        state.loading = false;
      });
  }
});

export const {getObject} = objectSlice.actions;
export const {changeSearchSubstring} = objectSlice.actions;
export default objectSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
