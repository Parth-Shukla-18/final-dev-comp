import { userApi } from "./UserApi.jsx";
import { postApi } from "./PostApi.jsx";

// postApi selectors
export const selectGetAllDisLikesResult = postApi.endpoints.getAllDisLikes.select();
export const selectGetAllLikesResult = postApi.endpoints.getAllLikes.select();
export const selectGetAllSavedResult = postApi.endpoints.getAllSaved.select();
// export const selectGetFilterPostsResult = postApi.endpoints.getFilterPosts.select();
export const selectGetMyPostsResult = postApi.endpoints.getMyPosts.select();

export const selectCreateNewPostResult = postApi.endpoints.createNewPost.select();
export const selectDeleteMyPostResult = postApi.endpoints.deleteMyPost.select();
export const selectUpdateDislikeResult = postApi.endpoints.updateDislike.select();
export const selectUpdateLikeResult = postApi.endpoints.updateLike.select();
export const selectUpdateSavedResult = postApi.endpoints.updateSaved.select();

// userApi selectors
export const selectLoginUserResult = userApi.endpoints.loginUser.select();
export const selectCreateNewUserResult = userApi.endpoints.createNewUser.select();
export const selectUpdateCurrentUserResult = userApi.endpoints.updateCurrentUser.select();
export const selectGetCurrentUserResult = userApi.endpoints.getCurrentUser.select();
export const selectDeleteSavedResult = userApi.endpoints.deleteSaved.select();
export const selectDeleteDislikesResult = userApi.endpoints.deleteDislikes.select();
export const selectDeleteLikesResult = userApi.endpoints.deleteLikes.select();
export const selectGetUserPostResult = userApi.endpoints.getUserPost.select();
export const selectGetOtherUserDataResult = userApi.endpoints.getOtherUserData.select();
export const selectUploadProfileImageResult = userApi.endpoints.uploadProfileImage.select();
export const selectGetImageResult = userApi.endpoints.getImage.select();