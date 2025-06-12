import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
  reducerPath: "postApi",
  tagTypes: ["Posts", "likedPost", "disLikePost", "savedPost"],
  refetchOnFocus: true, // need listener in store
  refetchOnReconnect: true, // need listener in store
  baseQuery: fetchBaseQuery({
    baseUrl: ` https://final-dev-comp.onrender.com/pp/devcomp`,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    createNewPost: builder.mutation({
      query: ({ postData }) => ({
        url: `/post/addpost`,
        method: "POST",
        credentials: "include",
        body: { postData },
      }),
      invalidatesTags: ["Posts"],
    }),
    getMyPosts: builder.query({ 
      query: () => ({
        url: `/post/allposts`,
        credentials: "include",
      }),
      providesTags: ["Posts"],
    }),
    deleteMyPost: builder.mutation({
      query: (postIdArr) => ({
        url: `post/deletepost`,
        method: "DELETE",
        body: { postIdArr },
        credentials: "include",
      }),
      invalidatesTags: ["Posts"],
      onQueryStarted: async ({ postIdArr }, { dispatch, queryFulfilled }) => {
        let action;
        try {
          if (postIdArr.length === 1) {
            // 1 post deleted by postId
            action = dispatch(
              postApi.util.updateQueryData("getMyPosts", undefined, (data) => {
                const newData = data.filter(
                  (curData) => curData.postId !== postIdArr[0]
                );
                return newData;
              })
            );
          } else if (postIdArr.length > 1) {
            // multiple posts will be deleted
            action = dispatch(
              postApi.util.updateQueryData("getMyPosts", undefined, () => null)
            );
          }
          await queryFulfilled;
        } catch {
          if (action) action.undo();
        }
      },
       
    }),
    getAllLikes: builder.query({
      query: () => ({
        url: `/post/liked`, // geting all likes post
        credentials: "include",
      }),
      providesTags: ["likedPost"],
    }),
    getAllDisLikes: builder.query({
      query: () => ({
        url: `/post/disliked`, // geting all Dislikes post
        credentials: "include",
      }),
      providesTags: ["disLikePost"],
    }),
    getAllSaved: builder.query({
      query: () => ({
        url: `/post/saved`, // geting all saved post
        credentials: "include",
      }),
      providesTags: ["savedPost"],
    }),
    updateLike: builder.mutation({
      query: ({ apply, postId }) => ({
        url: `/post/like`,
        method: "PATCH",
        body: { apply, postId },
        credentials: "include",
      }),
      onQueryStarted: async ({ postId, apply }, { dispatch, queryFulfilled }) => {
          let action;
          try {
              action = dispatch(postApi.util.updateQueryData('getFilterPosts', undefined, (data) => {
                  const newData = data.map((curPost) => {
                      if (curPost.postId === postId) {
                          return {
                              ...curPost,
                              likes: apply ? curPost.likes + 1 : curPost.likes - 1
                          };
                      }
                      return curPost;
                  });
                  return newData;
              }));
              await queryFulfilled;
          } catch (err) {
              if (action) action.undo();
          }
      },
      invalidatesTags: ["likedPost"],
    }),
    updateDislike: builder.mutation({ 
      query: ({ apply, postId }) => ({
        url: `/post/disLike`,
        method: "PATCH",
        body: { apply, postId },
        credentials: "include",
      }),
        onQueryStarted:async ({apply ,postId} , {dispatch ,queryFulfilled}) => {
            let action;
            try {
                action = dispatch(postApi.util.updateQueryData('getFilterPosts',undefined, (data) => {
                    const newData = data.map((curPost) => {
                        if(curPost.postId === postId){
                            return{
                                ...curPost,
                                disLikes: apply ? curPost.disLikes + 1 : curPost.disLikes - 1
                            }
                        }
                        return curPost;
                    })
                    return newData;
                }))
                await queryFulfilled;
            } catch (err) {
                if(action) action.undo();
            }
        },
      invalidatesTags: ["disLikePost"],
    }),
    updateSaved: builder.mutation({
      query: ({ apply, postId }) => ({
        url: `/post/save`,
        method: "PATCH",
        body: { apply, postId },
        credentials: "include",
      }),
      invalidatesTags: ["savedPost"],
      // optimistic approach not needed : no save counter is there;
    }),
  }),
});

export const {
    useLazyGetAllDisLikesQuery,// lazy api calling
    useCreateNewPostMutation,
    useDeleteMyPostMutation,
    // useGetAllDisLikesQuery,
    useLazyGetAllLikesQuery,
    useLazyGetAllSavedQuery,
    useGetFilterPostsQuery,
    useLazyGetFilterPostsQuery,
    useLazyGetMyPostsQuery,
    useUpdateDislikeMutation,
    useUpdateLikeMutation,
    useUpdateSavedMutation,
    usePrefetch,
} = postApi;

const fn = () => {
    const code = null;
    const filter = "";
    const page = 1;
    const {data:initialData} = useGetFilterPostsQuery({filter , code , page})
    return initialData;
}
export default fn;