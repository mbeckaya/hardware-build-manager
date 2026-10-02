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

        getBuildById: builder.query<Build, string>({
            query: (id) => `builds/${id}`,
        }),

        updateBuild: builder.mutation<
            Build,
            { id: number; build: Partial<Build> }
        >({
            query: ({ id, build }) => ({
                url: `builds/${id}`,
                method: 'PUT',
                body: build,
            }),
            invalidatesTags: ['Builds'],
        }),

        createBuild: builder.mutation<Build, Partial<Build>>({
            query: (build) => ({
                url: 'builds/',
                method: 'POST',
                body: build,
            }),
            invalidatesTags: ['Builds'],
        }),

        destroyBuildById: builder.mutation<void, number>({
            query: (id) => ({
                url: `builds/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Builds'],
        }),
    }),
});

export const {
    useGetAllBuildsQuery,
    useGetBuildByIdQuery,
    useCreateBuildMutation,
    useDestroyBuildByIdMutation,
} = buildsApi;
