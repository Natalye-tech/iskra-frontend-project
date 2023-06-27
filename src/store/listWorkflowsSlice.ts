import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';

type Workflow = {
  key?: React.Key | null,
  id: number | null,
  name: string | null,
  code: string | null,
  dt_create?: string | null | undefined,
  dt_update?: string | null | undefined,
  user_create?: string | null | undefined,
  user_update?: string | null | undefined
};

type ActionWorkflowState = {
  list: Workflow[] | any[];
  active_item: string | null;
  loading: boolean;
  error: string | null;
};

export const fetchActionWorkflow = createAsyncThunk<Workflow[] | any[], undefined, {rejectValue: string}>(
    'workflow/fetchActionWorkflow',
    async function (_, { rejectWithValue }) {
        const response = await fetch('http://localhost:8080/listWorkflows');
        if (!response.ok) {
          return rejectWithValue('Server Error!');
        }
        const data = await response.json();
        // console.log('fetchActionWorkflow DATA ************* ', data);
        return data;
    }
);

const initialState: ActionWorkflowState = {
  list: [],
  active_item: 'workflow_1',
  loading: false,
  error: null,
}

const actionWorkflowSlice = createSlice({
  name: 'workflow',
  initialState,
  reducers: {
    changeActiveItem(state, action) {
        // console.log('fetchActionWorkflow DATA 333 ', action.payload);
        state.active_item = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActionWorkflow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActionWorkflow.fulfilled, (state, action) => {
        state.list = action.payload;
        changeActiveItem(action.payload[0].code);
        // console.log("!!!!!!!!! state.active_item ", state.active_item);
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export const {changeActiveItem} = actionWorkflowSlice.actions;
export default actionWorkflowSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
