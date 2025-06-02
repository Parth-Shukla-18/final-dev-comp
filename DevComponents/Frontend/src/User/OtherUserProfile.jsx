import React from "react";
import { useLocation } from "react-router-dom";
import {
  useGetUserPostQuery,
  useGetOtherUserDataQuery,
} from "../RTK/UserApi.jsx";
import { PostCard } from "../UIcomp/Components.jsx";

const OtherUserProfile = () => {
  const { state } = useLocation();
  // Always get userName from state, fallback to userName from the first post if not present
  let userName = state?.userName;

  // If userName is not in state, try to get it from the first post (if available)
  const { data: userPosts, isLoading: postsLoading } = useGetUserPostQuery(userName);
  if (!userName && userPosts && userPosts.length > 0) {
    userName = userPosts[0].userName;
  }

  const { data: userInfo, isLoading: infoLoading } = useGetOtherUserDataQuery(userName);
  const { fullName, collegeName, profileImg, bgImg, selfDescription } = userInfo || {};

  if (infoLoading || postsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="linkedInProfile" className=" mx-auto p-2 largePhone:p-4 bg-amber-100">
      {/* Background Image Section */}
      <div className="largePhone:pr-[5%] tab:pr-[10%] ">
        <div className="relative flex w-full ">
          <img
            src={bgImg}
            loading="lazy"
            alt="Background"
            id="bg-img"
            className={`bg-green-400 h-36 w-full rounded-lg tab:h-44`}
          />
          {/* Profile Image */}
          <img
            src={profileImg}
            alt="Profile"
            loading="lazy"
            id="profile-img"
            className={`absolute translate-y-[50%] mx-[10%] bg-rose-400 h-36 w-36 tab:h-44 tab:w-44 rounded-full`}
          />
        </div>
        {/* Profile Details */}
        <div className="mt-24 underline">
          <h2 id="" className="text-lg font-semibold">{fullName}</h2>
          <p>{collegeName}</p>
          <p>{selfDescription}</p>
        </div>
      </div>
      {/* User Uploads */}
      <div className={`grid grid-cols-3 tab:flex flex-wrap gap-x-4`}>
        {userPosts?.map(({ title, postId, description, userName }) => (
          <div key={postId}>
            <PostCard title={title} userName={userName} postId={postId} description={description} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherUserProfile;

// import React from "react";
// import { useLocation } from 'react-router-dom';
// import { useGetUserPostQuery, useGetOtherUserDataQuery } from '../RTK/UserApi.jsx';
// import { PostCard } from "../UIcomp/Components.jsx";

// const OtherUserProfile = () => {

//   const { state } = useLocation();
//   const userName = state?.userName;

//   const { data: userInfo, isLoading: infoLoading } = useGetOtherUserDataQuery(userName);
//   const { fullName, collegeName, profileImg, bgImg, selfDescription } = userInfo || {}
//   const { data: userPosts, isLoading, postsLoading } = useGetUserPostQuery( userName );

//   if(isLoading){
//     return <div>Loading...</div>
//   }

//   return (
//     <div id="linkedInProfile" className=" mx-auto p-2 largePhone:p-4 bg-amber-100">

//         {/* Background Image Section */}
//         <div className="largePhone:pr-[5%] tab:pr-[10%] ">
//             <div className="relative flex w-full ">
//             <img
//                 src={bgImg}
//                 loading="lazy"
//                 alt="Background"
//                 id="bg-img"
//                 className={`bg-green-400 h-36 w-full rounded-lg tab:h-44`}
//             />
//             {/* Profile Image */}

//                 <img
//                 src={profileImg}
//                 alt="Profile"
//                 loading="lazy"
//                 id="profile-img"
//                 className={`absolute translate-y-[50%] mx-[10%] bg-rose-400 h-36 w-36 tab:h-44 tab:w-44 rounded-full`}
//                 />

//             </div>

//             {/* Profile Details */}
//             <div className="mt-24 underline">
//                 <h2 id="" className="text-lg font-semibold">{fullName}</h2>
//                 <p>{collegeName}</p>
//                 <p>{selfDescription}</p>
//             </div>

//         </div>

//         {/* User Uploads */}
//         <div className={`grid grid-cols-3 tab:flex flex-wrap gap-x-4`}>
//             {
//             userPosts?.map(({title ,postId ,description ,userName}) => (
//               <div key={postId}>
//                 <PostCard title={title} userName={userName} postId={postId} description={description} />
//               </div>
//             ))
//             }
//           </div>

//     </div>
//   );
// };

// export default OtherUserProfile;
