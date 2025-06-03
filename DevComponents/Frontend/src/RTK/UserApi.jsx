import { postApi } from './PostApi.jsx';


// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = postApi.injectEndpoints({
  reducerPath: "userApi",
  tagTypes: [
    "curUser",
    "prfileImg",
    "userPost",
    "otherUserData",
    "savedPost",
    "disLikePost",
    "likedPost",
  ],
  endpoints: (builder) => ({
    getImage: builder.query({
      query: () => ({
        url: `/getprofileimage`,
        credentials: "include",
      }),
      providesTags: ["prfileImg"],
    }),
    uploadProfileImage: builder.mutation({
      query: (formData) => ({
        url: "/upload-profile",
        method: "PATCH",
        body: formData,
        credentials: "include",
      }),
      invalidatesTags: ["prfileImg"],
    }),
    ResetPassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: `/changePassword`,
        method: "POST",
        body: { oldPassword, newPassword },
        credentials: "include",
      }),
    }),
    forgotPassword: builder.mutation({
      query: ({ email, password }) => ({
        url: `/forgotPassword`,
        method: "POST",
        body: { email, password },
      }),
    }),
    loginUser: builder.mutation({
      query: ({ userName, password }) => ({
        url: `/login`,
        method: "POST",
        body: { userName, password },
      }),
      invalidatesTags: ["curUser"],
    }),
    createNewUser: builder.mutation({
      query: (userData) => ({
        url: `/signup`,
        method: "POST",
        body: { userData },
      }),
      invalidatesTags: ["curUser"],
    }),
    updateCurrentUser: builder.mutation({
      query: ({ userData }) => ({
        //userData ko destructure kiye hai yaha pr
        url: `/profile`,
        method: "PATCH",
        credentials: "include",
        body: { userData },
      }),
      onQueryStarted: async ({ userData }, { dispatch, queryFulfilled }) => {
        let action;
        try {
          action = dispatch(
            userApi.util.updateQueryData(
              "getCurrentUser",
              undefined,
              (data) => {
                // Merge the incoming userData with the existing data
                const newData = { ...data, ...userData };
                return newData;
              }
            )
          );
          await queryFulfilled;
        } catch (err) {
          if (action) action.undo();
        }
      },
      invalidatesTags: ["curUser"],
    }),
    getCurrentUser: builder.query({
      query: () => ({
        url: `/profile`,
        credentials: "include",
      }),
      providesTags: ["curUser"],
    }),
    deleteSaved: builder.mutation({
      query: (savedArr) => ({
        //userName likha hu yaha pr
        url: `/post/allsaved`,
        method: "DELETE",
        credentials: "include",
        body: { savedArr },
      }),
      invalidatesTags: ["savedPost"], //ye wala pehle line no 125 pr tha agar kaam nhi krta hai to wapas wahi daal dena
      onQueryStarted: async ({ savedArr }, { dispatch, queryFulfilled }) => {
        let action;
        try {
          action = dispatch(
            postApi.util.updateQueryData("getAllSaved", undefined, (data) => {
              const newData = data.filter(
                (curData) => !savedArr.includes(curData.postId)
              );
              return newData;
            })
          );
          await queryFulfilled;
        } catch (err) {
          if (action) action.undo();
        }
      },
    }),
    deleteDislikes: builder.mutation({
      query: (disLikeArr) => ({
        // disLikeArr ko destructure kiye hai yaha pr
        url: `/post/alldislikes`,
        credentials: "include",
        body: { disLikeArr },
        method: "DELETE",
      }),
      invalidatesTags: ["disLikePost"],
      onQueryStarted: async ({ disLikeArr }, { dispatch, queryFulfilled }) => {
        let action;
        try {
          action = dispatch(
            postApi.util.updateQueryData(
              "getAllDisLikes",
              undefined,
              (data) => {
                const newData = data.filter(
                  (curData) => !disLikeArr.includes(curData.postId)
                );
                return newData;
              }
            )
          );
          await queryFulfilled;
        } catch (err) {
          if (action) action.undo();
        }
      },
    }),
    deleteLikes: builder.mutation({
      query: (likeArr) => ({
        // likeArr ko destructure kiye hai yaha pr
        url: `/post/alllikes`,
        method: "DELETE",
        credentials: "include",
        body: { likeArr },
      }),
      invalidatesTags: ["likedPost"],
      onQueryStarted: async ({ likeArr }, { dispatch, queryFulfilled }) => {
        let action;
        try {
          action = dispatch(
            postApi.util.updateQueryData("getAllLikes", undefined, (data) => {
              // Filter out the posts that have been present in likeArr
              const newData = data.filter(
                (curData) => !likeArr.includes(curData.postId)
              );
              return newData;
            })
          );
          await queryFulfilled;
        } catch (err) {
          if (action) action.undo();
        }
      },
    }),
    getUserPost: builder.query({
      query: ({ userName }) => ({
        url: `/post/1/3/4/otheruserpost`, // no userName in path
        method: "GET",
        params: { userName }, // this becomes ?userName=abc
      }),
      providesTags: ["userPost"],
    }),

    getOtherUserData: builder.query({
      query: (userName) => ({
        url: "/1/userdata/",
        method: "GET",
        params: { userName },
      }),
      providesTags: ["otherUserData"],
    }),
  }),
  // overrideExisting: false, // Optional: add this if you want to override existing endpoints
});

export const {
    useUploadProfileImageMutation,
    useResetPasswordMutation,
    useForgotPasswordMutation,
    useLoginUserMutation,
    useCreateNewUserMutation,
    useUpdateCurrentUserMutation,
    useGetCurrentUserQuery,
    useLazyGetCurrentUserQuery,
    useDeleteSavedMutation,
    useDeleteDislikesMutation,
    useDeleteLikesMutation,
    useGetUserPostQuery,
    useGetOtherUserDataQuery,
    usePrefetch,
    useGetImageQuery,
    useLazyGetImageQuery,
} = userApi;

 