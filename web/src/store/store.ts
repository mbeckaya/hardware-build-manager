import { configureStore } from '@reduxjs/toolkit';
import { buildsApi } from '../api/buildsApi';

export const store = configureStore({
    reducer: {
        [buildsApi.reducerPath]: buildsApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(buildsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
