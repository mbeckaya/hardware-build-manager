import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BuildType } from '../types/build-type';

export const buildTypesApi = createApi({
    reducerPath: 'buildTypesApi',

    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/' }),

    tagTypes: ['BuildTypes'],

    endpoints: (builder) => ({
        getAllBuildTypes: builder.query<BuildType[], void>({
            query: () => 'build-types/',
            providesTags: ['BuildTypes'],
        }),
    }),
});

export const { useGetAllBuildTypesQuery } = buildTypesApi;
