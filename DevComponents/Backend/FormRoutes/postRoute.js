import express from "express"; 
import { addPost, deleteDisLikedPosts, deleteLikedPosts, deletePost, deleteSavedPosts, dislikedPost, dislikePost, filterPost, getAllPosts, getOtherUserPosts, likedPost, likePost, savedPost, savePost } from '../Controler/postController.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'

const router = express.Router(); 

// liked posts route 
router.route("/liked").get(isAuthenticated,likedPost); 

// disliked posts route 
router.route("/disliked").get(isAuthenticated,dislikedPost); 

// saved posts route 
router.route("/saved").get(isAuthenticated,savedPost);

// get current user posts route 
router.route("/allposts").get(isAuthenticated ,getAllPosts);

// filter post route 
// router.route("/allfilter/:filter?/:page?:code?/").get(filterPost);
router.route("/allfilter").get(filterPost);


// delete post route 
router.route("/deletepost").delete(isAuthenticated , deletePost); 

// add post route 
router.route("/addpost").post(isAuthenticated,addPost); 

// like route 
router.route("/like").patch(isAuthenticated,likePost)

// dislike route 
router.route("/dislike").patch(isAuthenticated,dislikePost)

// saved route 
router.route("/save").patch(isAuthenticated,savePost)

// delete liked route 
router.route("/alllikes").delete(isAuthenticated , deleteLikedPosts )

// delete liked route 
router.route("/alldislikes").delete(isAuthenticated , deleteDisLikedPosts )

// delete liked route 
router.route("/allsaved").delete(isAuthenticated , deleteSavedPosts )

// get other user post route 
router.route("/1/3/4/otheruserpost?").get(getOtherUserPosts); 

export default router