import express from "express"; 
import { login, logout, register, seeProfile, updateProfile , changePassword, forgotPassword, otherUserProfile, changeImage, getProfileImage } from '../Controler/userController.js'
import isAuthenticated from "../middlewares/isAuthenticated.js"
import upload from "../middlewares/ImageMiddleware.js";

const router = express.Router(); 

// SignUp route 
router.route("/signup").post(register); 

// Login route      
router.route("/login").post(login); 
 
//LogOut route 
router.route("/logout").post(logout)

// Profile route 
router.route("/profile").get(isAuthenticated ,seeProfile); 

// Update Profile route 
router.route("/profile").patch( isAuthenticated , updateProfile); 

// change password route 
router.route("/changepassword").post(isAuthenticated , changePassword); 

// forgot password route 
router.route("/forgotpassword").post(forgotPassword); 

// get other user Profile route 
router.route("/1/userdata?:userName").get(otherUserProfile); 

// image updation route 
router.route("/upload-profile").patch( isAuthenticated , upload.fields([
    { name: 'profileImg', maxCount: 1 },
    { name: 'bgImg', maxCount: 1 },
  ]) , changeImage);

//get image data route 
router.route("/getprofileimage").get(isAuthenticated , getProfileImage ); 


export default router;