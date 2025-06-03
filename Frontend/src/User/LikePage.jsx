// import axios from "axios"
import React , { useEffect, useState } from "react"
import { FaTrashAlt } from "react-icons/fa"
import { LikeCard, LikeComponent1 , LikeComponent2 } from '../UIcomp/Components.jsx'
import { useDispatch ,useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import {selectGetAllLikesResult ,selectGetCurrentUserResult} from '../RTK/Selectors.jsx';
import {useDeleteLikesMutation} from '../RTK/UserApi.jsx';
import {useLazyGetAllLikesQuery} from '../RTK/PostApi.jsx';
// const API_URL = "http://localhost:8000";

const Likes = () => {
    // const navigate = useNavigate()
    const cachedLikes = useSelector((state) => selectGetAllLikesResult(state)?.data);
    const [trigger, { data: lazyData, isLoading: lazyLoading, error: lazyError }] = useLazyGetAllLikesQuery();
    useEffect(() => {
        if (!cachedLikes) {
          trigger();
        }
      }, [cachedLikes, trigger]);
      
    const userData = useSelector( (state) => selectGetCurrentUserResult(state)?.data);
    const userName = userData?.userName || null;

    const likes = cachedLikes || lazyData;
    
    const [deleteLikes, { isError, error }] = useDeleteLikesMutation();
    const [localLikes, setLocalLikes] = useState([]);

    useEffect(() => {
        setLocalLikes(likes || []);
    }, [likes]);

    const DeleteAll = async () => {
        const likeArr = localLikes.map((post) => post.postId)
        try {
            await deleteLikes(likeArr).unwrap();
            setLocalLikes([]); // Remove all from UI instantly
        } catch (err) {
           console.log(err);  
        }
    }
    const DeleteOne = async (postId) => {
        let likeArr = [postId];
        try {
            await deleteLikes(likeArr).unwrap();
            setLocalLikes((prev) => prev.filter((post) => post.postId !== postId)); // Remove from UI instantly
        } catch (err) {
            console.log(err); 
        }
    }
    
    // console.log(likes);
    
    return (
      <div>
        <h1 className={`text-center text-3xl font-bold py-3`}>My Likes</h1>
        <div className={`flex text-2xl font-bold justify-between py-3 px-8`}>
          <h2>Delete All Likes</h2>
          <button onClick={DeleteAll}>
            <FaTrashAlt className="text-red-500 cursor-pointer" />
          </button>
        </div>

        <div className=" overflow-hidden flex flex-col gap-4">
          {localLikes?.map(({ title, userName, postId, description }, idx) => (
            <div
              key={postId + "-" + idx}
              className={`flex justify-between gap-x-2 p-1`}
            >
              <LikeCard
                key={postId + "-" + idx + "-" + localLikes.length}
                title={title}
                description={description}
                userName={userName}
                postId={postId}
                // liked={true} // Always true in LikePage
              />
              <button
                onClick={() => DeleteOne(postId)}
                className="text-xl mx-4 text-red-500 cursor-pointer"
              >
                <FaTrashAlt />
              </button>
            </div>
          ))}

          {/* <LikeComponent2/> */}
          {/* <LikeCard /> */}
        </div>
      </div>
    );
}

export default Likes;