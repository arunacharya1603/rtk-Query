import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Correct path

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://66ce9e69901aab24841efa2d.mockapi.io",
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/crud",
      providesTags: (result) =>
        result ? [...result.map(({ id }) => ({ type: 'User', id })), { type: 'User', id: 'LIST' }] : [{ type: 'User', id: 'LIST' }],
    }),
    addUsers: builder.mutation({
      query: (user) => ({
        url: "/crud",
        method: "POST",
        body: user,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/crud/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: 'User', id }], // Invalidate the specific user
    }),
    searchUser: builder.mutation({
      query: (name) => ({
        url: `/crud?name=${name}`,
        method: "GET",
      }),
      providesTags: (result, error, name) => [{ type: 'User', id: 'LIST' }], // Invalidate the entire list
    })
  }),
});

export const { useGetUsersQuery, useAddUsersMutation, useDeleteUserMutation, useSearchUserMutation } = userApi;
