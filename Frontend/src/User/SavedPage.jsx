// import axios from "axios"
import React , { useEffect, useState } from "react"
import { FaTrashAlt } from "react-icons/fa"
import { LikeComponent1 , LikeComponent2 , SavedCard } from '../UIcomp/Components.jsx'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {selectGetAllSavedResult ,selectGetCurrentUserResult} from '../RTK/Selectors.jsx';
import {useDeleteSavedMutation} from '../RTK/UserApi.jsx';
import {useLazyGetAllSavedQuery} from '../RTK/PostApi.jsx';

// const API_URL = "http://localhost:8000";

const Saved = () => {
    
    
    const cachedSaved = useSelector( (state) => selectGetAllSavedResult(state)?.data);
    const [trigger, { data: lazyData, isLoading: lazyLoading, error: lazyError }] = useLazyGetAllSavedQuery();
    useEffect(() => {
        if (!cachedSaved) {
          trigger();
        }
      }, [cachedSaved, trigger]);
      
    const userData = useSelector( (state) => selectGetCurrentUserResult(state)?.data);
    const userName = userData?.userName || null;
    
    const saved = cachedSaved || lazyData;
    
    const [deleteSaved, { isError, error }] = useDeleteSavedMutation();
    const [localSaved, setLocalSaved] = useState([]);

    useEffect(() => {
        setLocalSaved(saved || []);
    }, [saved]);

    const DeleteAll = async () => {
        const savedArr = localSaved.map((post) => post.postId);
        try {
            await deleteSaved(savedArr).unwrap();
            setLocalSaved([]); // Remove all from UI instantly
        } catch (err) {
            console.log(err);
        }
    };
    const DeleteOne = async (postId) => {
        let savedArr = [postId];
        try {
            await deleteSaved(savedArr).unwrap();
            setLocalSaved((prev) => prev.filter((post) => post.postId !== postId)); // Remove from UI instantly
        } catch (err) {
            console.log(err);
        }
    };

    return (
      <div>
        <h1 className={`text-center text-3xl font-bold py-3`}>My Saved</h1>
        <div className={`flex text-2xl font-bold justify-between py-3 px-8`}>
          <h2>Delete All Saved</h2>
          <button onClick={DeleteAll} className="cursor-pointer">
            <FaTrashAlt />
          </button>
        </div>

        <div className=" overflow-hidden flex flex-col gap-4">
          {localSaved?.map(({ title, userName, postId, description }, idx) => (
            <div key={postId + '-' + idx} className={`flex justify-between gap-x-2 p-1`}>
              <SavedCard
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

export default Saved;
