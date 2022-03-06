import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const postsApi = createApi({
   reducerPath: 'postsApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:3000'
   }),
   tagTypes: ['Post'],
   endpoints: (builder) => ({
      getPosts: builder.query({
	     query: () => '/posts',
		 providesTags: ['Post']
      }),
	  getSinglePost: builder.query({
	     query: (id) => `/posts/${id}`,
		 providesTags: ['Post']
	  }),
	  addPost: builder.mutation({
	     query: (newPost) => ({
		    url: '/posts',
			method: 'post',
			body: newPost
		 }),
		 invalidatesTags: ['Post']
	  }),
	  updatePost: builder.mutation({
	     query: ({id, ...rest}) => ({
		    url: `/posts/${id}`,
			method: 'put',
			body: rest
		 }),
		 invalidatesTags: ['Post']
	  }),
	  deletePost: builder.mutation({
	     query: (id) => ({
		    url: `/posts/${id}`,
			method: 'delete'
		 }),
		 invalidatesTags: ['Post']
	  })
   })
});



export const {
   useGetPostsQuery,
   useGetSinglePostQuery,
   useAddPostMutation,
   useUpdatePostMutation,
   useDeletePostMutation
} = postsApi;