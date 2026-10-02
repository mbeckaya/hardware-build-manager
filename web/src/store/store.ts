import { configureStore } from '@reduxjs/toolkit';
import { buildsApi } from '../api/buildsApi';
import { buildTypesApi } from '../api/buildTypesApi';

export const store = configureStore({
    reducer: {
        [buildsApi.reducerPath]: buildsApi.reducer,
        [buildTypesApi.reducerPath]: buildTypesApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(buildsApi.middleware)
            .concat(buildTypesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
