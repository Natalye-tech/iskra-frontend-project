import { configureStore } from '@reduxjs/toolkit';
import menuItemReducer from './menuSlice';
import objectReducer from './objectSlice';

const store = configureStore({
  reducer: {
    menuitems: menuItemReducer,
    objects: objectReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
