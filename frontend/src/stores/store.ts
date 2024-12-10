import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import affilateSlice from './affilate/affilateSlice';
import kundeSlice from './kunde/kundeSlice';
import projektSlice from './projekt/projektSlice';
import projekt_accessSlice from './projekt_access/projekt_accessSlice';
import rechnungenSlice from './rechnungen/rechnungenSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    affilate: affilateSlice,
    kunde: kundeSlice,
    projekt: projektSlice,
    projekt_access: projekt_accessSlice,
    rechnungen: rechnungenSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
