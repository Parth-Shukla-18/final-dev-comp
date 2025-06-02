// import axios from "axios"
import React , { useEffect, useState } from "react"
import { FaTrashAlt } from "react-icons/fa"
import { LikeComponent1 , LikeComponent2 ,DisLikeCard } from '../UIcomp/Components.jsx'
import { useDispatch ,useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectGetAllDisLikesResult ,selectGetCurrentUserResult } from '../RTK/Selectors.jsx'
import { useLazyGetAllDisLikesQuery} from '../RTK/PostApi.jsx'
import { useDeleteDislikesMutation } from '../RTK/UserApi.jsx'

// const API_URL = "http://localhost:8000/pp/devcomp/post";

const DisLikes = () => {

    const cachedDisLikes = useSelector( (state) => selectGetAllDisLikesResult(state)?.data);
    const [trigger, { data: lazyData, isLoading: lazyLoading, error: lazyError }] = useLazyGetAllDisLikesQuery();
    useEffect(() => {
        if (!cachedDisLikes) {
          trigger();
        }
      }, [cachedDisLikes, trigger]);
      
    const userData = useSelector((state) => selectGetCurrentUserResult(state)?.data);
    const userName = userData?.userName || null;
   
    const disLikes = cachedDisLikes || lazyData;

    const [deleteDislikes, { isError, error }] = useDeleteDislikesMutation();
    const [localDisLikes, setLocalDisLikes] = useState([]);

    useEffect(() => {
        setLocalDisLikes(disLikes || []);
    }, [disLikes]);

    const DeleteAll = async () => {
        const disLikeArr = localDisLikes.map((post) => post.postId);
        try {
            await deleteDislikes(disLikeArr).unwrap();
            setLocalDisLikes([]); // Remove all from UI instantly
        } catch (err) {
            console.log(err);
        }
    }
    const DeleteOne = async (postId) => {
        let disLikeArr = [postId];
        try {
            await deleteDislikes(disLikeArr).unwrap();
            setLocalDisLikes((prev) => prev.filter((post) => post.postId !== postId)); // Remove from UI instantly
        } catch (err) {
            console.log(err);
        }
    }

    return (
      <div>
        <h1 className={`text-center text-3xl font-bold py-3`}>My DisLikes</h1>
        <div className={`flex text-2xl font-bold justify-between py-3 px-8`}>
          <h2>Delete All DisLikes</h2>
          <button onClick={DeleteAll} className="cursor-pointer">
            <FaTrashAlt />
          </button>
        </div>

        <div className=" overflow-hidden flex flex-col gap-4">
          {localDisLikes?.map(({ title, userName, postId, description }, idx) => (
            <div key={postId + '-' + idx} className={`flex justify-between gap-x-2 p-1`}>
              <DisLikeCard
                key={postId + '-' + idx + '-' + localDisLikes.length}
                title={title}
                description={description}
                userName={userName}
                postId={postId}
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
        </div>
      </div>
    );
}

export default DisLikes;