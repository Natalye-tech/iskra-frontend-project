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
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');

        if (!response.ok) {
          return rejectWithValue('Server Error!');
        }

        const data = await response.json();
        console.log(" ----------- ", data);
        return data;
    }
);

export const addNewObject = createAsyncThunk<Object, string, { rejectValue: string }>(
  'objects/addNewObject',
  async function (text, { rejectWithValue }) {
      const object = {
        title: text,
        userId: 1,
        completed: false,
      };

      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
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

export const toggleStatus = createAsyncThunk<Object, number, { rejectValue: string, state: { objects: ObjectsState} }>(
  'objects/toggleStatus',
  async function (id, { rejectWithValue, getState }) {
    const object = getState().objects.list.find(object => object.id === id);

    if (object) {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !object.completed,
        })
      });

      if (!response.ok) {
        return rejectWithValue('Can\'t toggle status. Server error.');
      }

      return (await response.json()) as Object;
    }

    return rejectWithValue('No such object in the list!')
  }
);

export const deleteObject = createAsyncThunk<string, string, { rejectValue: string }>(
  'objects/deleteObject',
  async function (id, { rejectWithValue }) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      return rejectWithValue('Can\'t delete Object. Server error.');
    }

    return id;
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
      .addCase(addNewObject.pending, (state) => {
        state.error = null;
      })
      .addCase(addNewObject.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(toggleStatus.fulfilled, (state, action) => {
        const toggledObject = state.list.find(object => object.id === action.payload.id);
        if (toggledObject) {
          toggledObject.completed = !toggledObject.completed;
        }
      })
      .addCase(deleteObject.fulfilled, (state, action) => {
        state.list = state.list.filter(object => Number(object.id) !== Number(action.payload));
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
