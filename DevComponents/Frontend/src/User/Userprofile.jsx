import React, { useEffect, useState } from "react";
import { FaPen ,FaCamera ,FaSave } from "react-icons/fa";
import { selectGetCurrentUserResult , selectGetImageResult, selectGetMyPostsResult , selectUploadProfileImageResult } from '../RTK/Selectors.jsx'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PostCard } from '../UIcomp/Components.jsx';
import {useDeleteMyPostMutation, useLazyGetMyPostsQuery} from '../RTK/PostApi.jsx'
import {useGetImageQuery, useLazyGetCurrentUserQuery, useLazyGetImageQuery, useUpdateCurrentUserMutation ,useUploadProfileImageMutation} from '../RTK/UserApi.jsx'
import { userApi } from "../RTK/UserApi.jsx";


const UserProfile = () => {

  const currUserData = useSelector((state) => selectGetCurrentUserResult(state)?.data );
  const [profileTrigger , {data:profileData}] = useLazyGetCurrentUserQuery(); 

  
  useEffect(() =>{
    if( !userData){
       profileTrigger(); 
    } 
  }, [] ); 
  const userData = currUserData || profileData; 
  // console.log(userData); 

  
  const userName = userData?.userName
  const fullName = userData?.fullName
  const collegeName = userData?.collegeName
  // const profileImg = userData.profileImg
  // const bgImg = userData.bgImg
  const selfDescription = userData?.selfDescription
  
  useEffect(() =>{
    setCollege(collegeName); 
    setDescription(selfDescription); 
    setName(fullName); 
  } , [userData])


  const [isEditble , setIsEditble] = useState(false);
  const [name ,setName] = useState(fullName)
  const [college ,setCollege] = useState(collegeName)
  const [description ,setDescription] = useState(selfDescription)
  
  const navigate = useNavigate();
  // useEffect(() => {
    //   if(!userName){
      //     // navigate('/login-signup')
      //   }
      // } ,[navigate])
      const allPosts = useSelector((state) => selectGetMyPostsResult(state)?.data);
// const allPosts = null;
const [trigger ,{data ,isError:hi ,error:hlo}] = useLazyGetMyPostsQuery();

useEffect(() => {
  if (!allPosts) trigger();
}, [allPosts, trigger]);

 const myPosts = allPosts || data;

 const [updateCurrentUser, { isError: updateIsError, error: UpdateError, isLoading: updateIsLoading }] = useUpdateCurrentUserMutation();

 const HandleUpdate = async () => {
   const updates = {};
 
   if (name !== userData.fullName) updates.fullName = name;
   if (college !== userData.collegeName) updates.collegeName = college;
   if (description !== userData.selfDescription) updates.selfDescription = description;
 
   if (isEditble && Object.keys(updates).length > 0) {
     try {
        await updateCurrentUser(updates).unwrap();
     } 
     catch (err) {
       console.error("Update failed:", err);
     }
   }
 
   setIsEditble(!isEditble);
 }; 

  const [deleteMyPost ,{isError ,error ,isLoading}] = useDeleteMyPostMutation()
  const DeleteAllPost = async () => {
    try {
      const postIdArr = myPosts.map(post => post.postId);
      await deleteMyPost(postIdArr).unwrap();
    } catch (err) {
      console.error('Delete all failed:', err);
    }
  };
  
  const DeleteOne = async (postId) => {
    let postIdArr = [postId]
    try {
      await deleteMyPost(postIdArr).unwrap();
    } catch (err) {
      console.error('Delete one failed:', err);
    }
  };
  
  const [bgImg, setBgImg] = useState(userData?.bgImg || null);
  const [profileImg, setProfileImg] = useState(userData?.profileImg || null);

  const [uploadProfileImage , { }] = useUploadProfileImageMutation();

  // const { data:img } = useGetImageQuery(); 
  const [ imgTrigger , {data:lazyData }] = useLazyGetImageQuery();
  const curImgData = useSelector( (state) => selectGetImageResult(state)?.data );
 
  useEffect( () =>{
    if( ! curImgData ){
        imgTrigger(); 
    } 
  }, [])  
  const img = curImgData || lazyData;  
  // console.log(curImgData);
   
  useEffect(()=>{ 
    setProfileImg(img?.profileImg);
    setBgImg(img?.bgImg);
  },[img]);

  // Always use the latest image from the server (img)
  useEffect(() => {
    if (img?.profileImg) setProfileImg(img.profileImg);
    if (img?.bgImg) setBgImg(img.bgImg);
  }, [img]);

  const handleImageChange = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview instantly
    const imageUrl = URL.createObjectURL(file);
    if (type === "profile") {
      setProfileImg(imageUrl);
    } else {
      setBgImg(imageUrl);
    }

    // Upload to server
    const formData = new FormData();
    const fieldName = type === "profile" ? "profileImg" : "bgImg";
    formData.append(fieldName, file);

    try {
      await uploadProfileImage(formData).unwrap();
      // After upload, force re-fetch from server so the new image persists after refresh
      await imgTrigger();
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };
 

  return (
    <div
      id="linkedInProfile_SPand_ST"
      className="max-w-[900px] p-2 largePhone:p-4 bg-amber-100"
    >
      <div>
        {/* Background Image Section */}
        <div className="relative mx-auto rounded-xl flex flex-col max-w-[850px] h-[calc(15vh+2vw)] tab:h-[calc(17vh+2vw)]">
          {/* BG Image Upload Input */}
          <input
            type="file"
            accept="image/*"
            id="bg-img-input"
            className="hidden"
            onChange={(e) => handleImageChange(e, "bg")}
          />
          <label
            htmlFor="bg-img-input"
            className="absolute self-end rounded-full p-[6px] bg-white text-center m-2 text-xl largePhone:text-2xl tab:text-3xl laptop:text-4xl cursor-pointer"
          >
            <FaCamera />
          </label>
          <img
            src={bgImg}
            alt="Background"
            className="w-full rounded-xl h-[calc(15vh+2vw)] tab:h-[calc(17vh+2vw)] object-cover"
          />

          {/* Profile Image */}
          <div className="absolute flex flex-col-reverse translate-y-16 translate-x-12">
            {/* Profile Upload Input */}
            <input
              type="file"
              accept="image/*"
              id="profile-img-input"
              className="hidden"
              onChange={(e) => handleImageChange(e, "profile")}
            />
            <label
              htmlFor="profile-img-input"
              className="absolute self-end -translate-x-1 -translate-y-2 text-lg mobilePhone:text-xl tab:text-2xl cursor-pointer"
            >
              <FaCamera />
            </label>
            <img
              src={profileImg}
              alt="Profile"
              className="rounded-full h-[calc(15vh+2vw)] w-[calc(15vh+2vw)] tab:h-[calc(17vh+2vw)] tab:w-[calc(17vh+2vw)] object-cover"
            />
          </div>
        </div>

        {/* Edit Icon */}
        <div
          className={`mx-8 mt-12 flex flex-col gap-1 ${isEditble ? "" : ""}`}
        >
          <button onClick={HandleUpdate} className="self-end">
            {isEditble ? <FaSave size={22} /> : <FaPen size={20} />}
          </button>
          {/* Profile Details */}
          <input
            type="text"
            readOnly
            name="userName"
            value={userData?.userName}
            className={`text-lg font-bold focus:outline-none`}
            id=""
          />
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            readOnly={!isEditble}
            name="fullName"
            value={name}
            className="focus:outline-none"
            id=""
          />
          <input
            type="text"
            onChange={(e) => {
              setCollege(e.target.value);
            }}
            readOnly={!isEditble}
            name="collegeName"
            value={college}
            className="focus:outline-none"
            id=""
          />
          <input
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            readOnly={!isEditble}
            name="Description"
            value={description}
            className="focus:outline-none"
            id=""
          />
        </div>

        <div>
          <div className={`flex justify-between px-2 py-2 `}>
            <h2 className={`text-lg p-2 font-semibold`}>My Posts</h2>
            <button
              onClick={DeleteAllPost}
              className={`p-2 bg-red-500 text-white text-lg font-semibold cursor-pointer`}
            >
              Delete All
            </button>
          </div>
          <div className={`grid grid-cols-3 tab:flex flex-wrap gap-x-4`}>
            {myPosts?.map(({ title, postId, description, userName }) => (
              <div key={postId}>
                <PostCard
                  title={title}
                  userName={userName}
                  postId={postId}
                  description={description}
                />
                <button
                  onClick={() => DeleteOne(postId)}
                  className={`p-1 bg-red-500 text-white mb-3`}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

        // {/* User Uploads */}
        // <div id="userUploads" className="my-6 bg-fuchsia-200 gap-[2px] grid grid-cols-3 largePhone:grid-cols-4">
        //   {
        //     <img
        //       key={`Id`}
        //       src={`assets/ThreeCats.png`}
        //       alt="User upload"
        //       className="h-[30vw] rounded-md largePhone:w-[23vw] largePhone:h-[23vw] max-h-[205px] max-w-[205px] w-[30vw] border-2 border-blue-600 object-cover"
        //     />
        //   }
        // </div>