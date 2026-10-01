import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Build } from '../types/build';

export const buildsApi = createApi({
    reducerPath: 'buildsApi',

    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/' }),

    tagTypes: ['Builds'],

    endpoints: (builder) => ({
        getAllBuilds: builder.query<Build[], void>({
            query: () => 'builds/',
            providesTags: ['Builds'],
        }),
    }),
});

export const { useGetAllBuildsQuery } = buildsApi;
