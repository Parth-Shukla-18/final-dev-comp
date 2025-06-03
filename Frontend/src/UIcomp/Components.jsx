import { useEffect, useState  } from "react";
import { FaThumbsUp, FaThumbsDown, FaSave, FaTrashAlt} from "react-icons/fa";
import THEMES from "./Theme.jsx";
import useTheme from "./Context.jsx"
import { useDispatch ,useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";
import { useUpdateLikeMutation ,useUpdateSavedMutation ,useUpdateDislikeMutation } from '../RTK/PostApi.jsx'
import {selectGetAllLikesResult ,selectGetAllDisLikesResult ,selectGetAllSavedResult ,selectGetMyPostsResult, selectGetCurrentUserResult} from '../RTK/Selectors.jsx';
import CodeEditor from "./CodeEditor.jsx";
import { userApi } from "../RTK/UserApi.jsx";
import { likePost,dislikePost } from "../RTK/PostSlice.jsx";

// const API_URL = "http://localhost:8000";

const LikeCard = ({ title, description ,postId ,userName}) => {
  const { theme } = useTheme();
  const shortDescription =
    description?.length > 25 ? description.slice(0, 25) + "..." : description;
  const navigate = useNavigate();
  const cachedLikes = useSelector((state) => selectGetAllLikesResult(state)?.data);
  const gotoPost = () => {
    const post = cachedLikes.find(p => p.postId === postId);
    if (post) {
      const { title, html, css, js, react, userName } = post;
      navigate('/post-view', {
        state: { title, html, css, js, react, userName },
      });
    }
  };
  const gotoUserProfile = () => {};

  return(
    <div className='p-2 bg-amber-100 rounded-lg w-full'>
      <div className='flex justify-between px-3 py-2 text-xl font-bold'>
        <button onClick={gotoPost}>{title}</button> |
        <button onClick={gotoUserProfile}>{userName}</button>
      </div>
      <hr />
      <p className='text-center'>{shortDescription}</p>
    </div>
  )
}

const DisLikeCard = ({ title, description ,postId ,userName}) => {
  const { theme } = useTheme();
  const shortDescription =
    description?.length > 25 ? description.slice(0, 25) + "..." : description;
  const navigate = useNavigate();
  const cachedDisLikes = useSelector((state) => selectGetAllDisLikesResult(state)?.data);
  const gotoPost = () => {
    const post = cachedDisLikes.find(p => p.postId === postId);
    if (post) {
      const { title, html, css, js, react, userName } = post;
      navigate('/post-view', {
        state: { title, html, css, js, react, userName },
      });
    }
  };
  const gotoUserProfile = () => {};

  return(
    <div className='p-2 bg-amber-100 rounded-lg w-full'>
      <div className='flex justify-between px-3 py-2 text-xl font-bold'>
        <button onClick={gotoPost}>{title}</button> |
        <button onClick={gotoUserProfile}>{userName}</button>
      </div>
      <hr />
      <p className='text-center'>{shortDescription}</p>
    </div>
  )
}

const SavedCard = ({ title, description ,postId ,userName}) => {
  const { theme } = useTheme();
  const shortDescription =
    description?.length > 25 ? description.slice(0, 25) + "..." : description;
  const navigate = useNavigate();
  const cachedSaved = useSelector((state) => selectGetAllSavedResult(state)?.data);
  const gotoPost = () => {
    const post = cachedSaved.find(p => p.postId === postId);
    if (post) {
      const { title, html, css, js, react, userName } = post;
      navigate('/post-view', {
        state: { title, html, css, js, react, userName },
      });
    }
  };
  const gotoUserProfile = () => {};

  return(
    <div className='p-2 bg-amber-100 rounded-lg w-full'>
      <div className='flex justify-between px-3 py-2 text-xl font-bold'>
        <button onClick={gotoPost}>{title}</button> |
        <button onClick={gotoUserProfile}>{userName}</button>
      </div>
      <hr />
      <p className='text-center'>{shortDescription}</p>
    </div>
  )
}

const PostCard = ({ title, description ,postId ,userName}) => {
  const { theme } = useTheme();

  const shortDescription =
    description.length > 15 ? description.slice(0, 15) + "..." : description;

  const navigate = useNavigate()
  const myPosts = useSelector( (state) => selectGetMyPostsResult(state)?.data);
  const gotoPost = () => {
    const post = myPosts.find(p => p.postId === postId);
    if (post) {
      const { title, html, css, js, react, userName } = post;
      navigate('/post-view', {
        state: { title, html, css, js, react, userName },
      });
    }
  };

  return (
    <button onClick={gotoPost} className='bg-amber-100 p-3 rounded-md text-left w-full'>
      <div className='text-lg font-semibold my-2'>{title}</div>
      <p>{shortDescription}</p>
    </button>
  );
};

const LikeComponent1 = ({ title,userName,postId }) => {
  // 1 = like , 2 = disLike , 3 = saved : for compType
  // const {userName, apply = false , postId} = req.body;

    const { theme } = useTheme();
    const apply = false;
    const dispatch = useDispatch();

    const handleDelete = async () => {
      try {
        let response = null; 
      } catch (error) {
        
      }
    }
    const NavigatePost = () => {
    }
    const NavigateProfile = () => {
    }

    return(
        <>
        <div className={`${THEMES[theme].innerContainer} flex justify-between p-1 gap-x-2 shadow-lg`}>
            <button onClick={NavigatePost} className="flex-1">
               <img src="src\assets\react.svg" alt="" className="w-full h-40 bg-stone-900 rounded-lg"  />
            </button>
            <div className={` flex flex-col justify-between py-6`}>
                <button onClick={NavigatePost}>
                   <h2 className="text-xl font-bold">Component Name {title}</h2>
                </button>
                <button onClick={NavigateProfile}>
                   <h2 className="text-lg font-semibold">userName: who has  {userName}</h2>
                </button>
            </div>
            
        </div>
        </>

    )
}

const LikeComponent2 = ({title,userName,postId,compType}) => {

    const { theme } = useTheme();

    const apply = false;

    const handleDelete = async () => {
      try {
        let response = null;
        if(compType === 1){
          response = await axios.patch(`${API_URL}/post/like`, { userName, postId, apply }, { withCredentials: true });
          dispatch(removeLike({postId})); // removing postId from currentUser
          dispatch(likePost({postId ,apply})); // Decrementing the count of like on this postID
          
        } else if(compType == 2){
          response = await axios.patch(`${API_URL}/post/disLike` ,{ userName, postId, apply }, { withCredentials: true } )
          dispatch(removeDisLike({postId})); // removing postId from currentUser
          dispatch(dislikePost({postId ,apply}));// Decrementing the count of disLike on this postID
        } else if(compType == 3){
          response = await axios.patch(`${API_URL}/post/saved` , { userName, postId, apply }, { withCredentials: true })
          dispatch(removeSaved({postId})); // removing postId from currentUser
        }
      } catch (error) {
        
      }
    }
    const NavigatePost = (e) => {

    }
    const NavigateProfile = (e) => {
        
    }

    return (
        <>
           <div className={`${THEMES[theme].innerContainer}  p-2 shadow-lg`}>
            <button onClick={NavigatePost} className="w-full h-40">
               <img src="src\assets\react.svg" alt="" className="w-full h-40 bg-gray-900 rounded-lg" />
            </button>
            <div className={` flex  justify-between gap-x-4 py-6`}>
                <button onClick={NavigatePost}>
                   <h2 className="text-xl font-bold">ComponentName {title}</h2>
                </button>
                <button onClick={NavigateProfile}>
                   <h2 className="text-lg font-semibold">userName: who has posted {userName}</h2>
                </button>
                <div className="flex text-2xl text-red-500">
                    <button onClick={handleDelete}><FaTrashAlt/></button>
                </div>
            </div>
           </div>
        </>
    )
}

const CardComponent = ({ postId = "", userName = "", html = "<h1>hello</h1>", css = "", js = "", react = "", title = "", description = "", likes = "" }) => {
  const [applyLike, setLikes] = useState(false);
  const [applyDisLikes, setDisLikes] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [show, setShow] = useState(false);
  let [htmlCode, setHtml] = useState(html);
  let [cssCode, setCss] = useState(css);
  let [jsCode, setJs] = useState(js);
  let [reactCode, setReact] = useState(react);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => selectGetCurrentUserResult(state)?.data);

  // Like count logic: always show at least 1 if user has liked, never negative
  const [likeCount, setLikeCount] = useState(() => {
    const base = Math.max(Number(likes) || 0, 0);
    if (base === 0 && currentUser?.likes?.includes(postId)) return 1;
    return base;
  });

  useEffect(() => {
    if (currentUser) {
      setLikes(currentUser?.likes?.includes(postId));
      setDisLikes(currentUser?.disLikes?.includes(postId));
      setSaved(currentUser?.saved?.includes(postId));
    }
    // Like count logic: always show at least 1 if user has liked, never negative
    const base = Math.max(Number(likes) || 0, 0);
    if (base === 0 && currentUser?.likes?.includes(postId)) {
      setLikeCount(1);
    } else {
      setLikeCount(base);
    }
  }, [currentUser, postId, likes]);

  // Restore last known good like/dislike logic (YouTube style)
  const [updateLike] = useUpdateLikeMutation();
  const [updateDislike] = useUpdateDislikeMutation();
  const [updateSaved] = useUpdateSavedMutation();

  const HandleLike = async () => {
    if (applyLike) {
      setLikes(false);
      setLikeCount((prev) => Math.max(prev - 1, 0));
      try {
        await updateLike({ postId, apply: false }).unwrap();
        dispatch(likePost({ postId, apply: false }));
      } catch (err) {
        setLikes(true);
        setLikeCount((prev) => prev + 1);
      }
      return;
    }
    setLikes(true);
    setLikeCount((prev) => prev + 1);
    if (applyDisLikes) {
      setDisLikes(false);
    }
    try {
      await updateLike({ postId, apply: true }).unwrap();
      dispatch(likePost({ postId, apply: true }));
      if (applyDisLikes) {
        await updateDislike({ userName, postId, apply: false }).unwrap();
        dispatch(dislikePost({ postId, apply: false }));
      }
    } catch (err) {
      setLikes(false);
      setLikeCount((prev) => Math.max(prev - 1, 0));
    }
  };

  const HandleDisLike = async () => {
    if (applyDisLikes) {
      setDisLikes(false);
      if (applyLike) {
        setLikes(false);
        setLikeCount((prev) => Math.max(prev - 1, 0));
      }
      try {
        await updateDislike({ userName, postId, apply: false }).unwrap();
        dispatch(dislikePost({ postId, apply: false }));
        if (applyLike) {
          await updateLike({ postId, apply: false }).unwrap();
          dispatch(likePost({ postId, apply: false }));
        }
      } catch (err) {
        setDisLikes(true);
        if (applyLike) {
          setLikes(true);
          setLikeCount((prev) => prev + 1);
        }
      }
      return;
    }
    setDisLikes(true);
    if (applyLike) {
      setLikes(false);
      setLikeCount((prev) => Math.max(prev - 1, 0));
    }
    try {
      await updateDislike({ userName, postId, apply: true }).unwrap();
      dispatch(dislikePost({ postId, apply: true }));
      if (applyLike) {
        await updateLike({ postId, apply: false }).unwrap();
        dispatch(likePost({ postId, apply: false }));
      }
    } catch (err) {
      setDisLikes(false);
      if (applyLike) {
        setLikes(true);
        setLikeCount((prev) => prev + 1);
      }
    }
  };

  const HandleSave = async () => {
    const apply = !saved;
    setSaved(apply);
    try {
      await updateSaved({ userName, postId, apply }).unwrap();
    } catch (err) {
      setSaved(!apply);
    }
  };

  const VisitProfile = () => {
    dispatch(userApi.util.invalidateTags([
      { type: 'userPost' },
      { type: 'otherUserData' },
    ]));
    navigate('/other-user', { state: { userName } });
  };

  const words = (description || '').split(' ');
  const shortDescription = words.slice(0, 10).join(' ') + (words.length > 7 ? '...' : '');

  return (
    <div className=" mt-3 p-5 w-full mx-auto bg-gray-100 rounded-lg shadow-md">
      {/* User Info */}
      <button
        onClick={VisitProfile}
        className="w-fit flex gap-x-6 text-lg font-bold cursor-pointer"
      >
        <img
          src=""
          alt="U"
          className="bg-red-500 w-10 h-10 text-white overflow-hidden rounded-full"
        />
        <span className="text-amber-600 my-auto">{userName}</span>
      </button>

      <div className="flex justify-between pt-4">
        <button
          onClick={() => setShow(false)}
          className="border w-[40%] focus:bg-gradient-to-r from-red-500 to-amber-500 py-1 rounded mb-2 cursor-pointer"
        >
          Preview
        </button>
        <button
          onClick={() => {
            setShow(true);
          }}
          className="border w-[40%] focus:bg-gradient-to-r from-red-500 to-amber-500 py-1 rounded mb-2 cursor-pointer"
        >
          Copy Code
        </button>
      </div>
      {/* Boxes and Buttons */}
      {!show && (
        <div className="my-3 p-4 border hover:border-red-500 border-amber-500 font-semibold text-lg text-center  rounded-lg ">
          <CodeEditor
            htmlCode={htmlCode}
            cssCode={cssCode}
            jsCode={jsCode}
            reactCode={reactCode}
          />
        </div>
      )}
      {show && (
        <div className="flex justify-around gap-2 pt-3 pb-3">
          {/* Display conditionally based on the logic */}
          {reactCode === "" &&
          (htmlCode !== "" || cssCode !== "" || jsCode !== "") ? (
            <>
              {/* HTML Input */}
              <div className="flex flex-col items-center w-[350px]">
                <button
                  onClick={() => navigator.clipboard.writeText(htmlCode)}
                  className="border w-[70%] focus:bg-gradient-to-r from-red-500 to-amber-500 py-1 rounded mb-2"
                >
                  Copy HTML Code
                </button>
                <div className="p-3 h-[300px] bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <textarea
                    onChange={(e) => setHtml(e.target.value)}
                    value={htmlCode}
                    placeholder="No HTML Code Available"
                    className="w-55 h-full bg-transparent border-none focus:outline-none overflow-auto scrollbar-hide"
                  />
                </div>
              </div>

              {/* CSS Input */}
              <div className="flex flex-col items-center w-[350px]">
                <button
                  onClick={() => navigator.clipboard.writeText(cssCode)}
                  className="border w-[70%] focus:bg-gradient-to-r from-red-500 to-amber-500 py-1 rounded mb-2 cursor-pointer"
                >
                  Copy CSS Code
                </button>
                <div className="p-3 h-[300px] bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <textarea
                    onChange={(e) => setCss(e.target.value)}
                    value={cssCode}
                    placeholder="No CSS Code Available"
                    className="w-55 h-full bg-transparent border-none focus:outline-none overflow-auto scrollbar-hide"
                  />
                </div>
              </div>

              {/* JavaScript Input */}
              <div className="flex flex-col items-center w-[350px]">
                <button
                  onClick={() => navigator.clipboard.writeText(jsCode)}
                  className="border w-[70%] focus:bg-gradient-to-r from-red-500 to-amber-500 py-1 rounded mb-2 cursor-pointer"
                >
                  Copy JavaScript Code
                </button>
                <div className="p-3 h-[300px] bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <textarea
                    onChange={(e) => setJs(e.target.value)}
                    value={jsCode}
                    placeholder="No JavaScript is Available"
                    className="w-55 h-full bg-transparent border-none focus:outline-none overflow-auto scrollbar-hide"
                  />
                </div>
              </div>
            </>
          ) : htmlCode === "" && cssCode === "" && jsCode === "" ? (
            <>
              {/* React Component Input */}
              <div className="flex flex-col items-center w-[350px]">
                <button
                  onClick={() => navigator.clipboard.writeText(reactCode)}
                  className="border w-full focus:bg-gradient-to-r from-red-500 to-amber-500 py-2 rounded mb-2 cursor-pointer"
                >
                  Copy React Code
                </button>
                <div className="p-3 h-[300px] bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <textarea
                    onChange={(e) => setReact(e.target.value)}
                    value={reactCode}
                    placeholder="Enter React Component JSX"
                    className="w-55 h-full bg-transparent border-none focus:outline-none overflow-auto scrollbar-hide"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Display all inputs */}
              <div className="flex flex-col items-center w-[350px]">
                {" "}
                Wrong Code{" "}
              </div>
            </>
          )}
        </div>
      )}

      {/* Title and Actions */}
      <div>
        <div className="my-2 font-bold text-lg">{title}</div>
        <div className={`flex gap-x-5`}>
          <div className={`bg-gray-300  flex gap-x-4 p-1 px-2 rounded-full`}>
            <button className="block cursor-pointer" onClick={HandleLike}>
              <FaThumbsUp
                title="Like"
                className={`text-xl m-1    ${
                  applyLike ? "text-rose-600" : ""
                } `}
              />
            </button>
            {likeCount} |
            <button className="block cursor-pointer" onClick={HandleDisLike}>
              <FaThumbsDown
                title="Dislike"
                className={`text-xl m-1  ${
                  applyDisLikes ? "text-rose-600" : ""
                } `}
              />
            </button>
          </div>
          <div className="bg-gray-300 px-3 pt-1 rounded-full">
            <button onClick={HandleSave}>
              <FaSave
                className={`text-xl m-1  ${
                  saved ? "text-rose-600" : "text-gray-900"
                } cursor-pointer`}
              />
            </button>
            <span className="align-top">{saved ? "Saved" : "Save"}</span>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="text-sm text-gray-600 mb-4">
        {showFullDescription ? description : shortDescription}
        {words.length > 10 && (
          <button
            className="text-blue-600 ml-2"
            onClick={() => {
              setShowFullDescription(!showFullDescription);
            }}
          >
            {showFullDescription ? "Show Less" : "Read More"}
          </button>
        )}
      </div>
    </div>
  );
};

export{
    LikeComponent1,
    LikeComponent2,
    CardComponent,
    LikeCard,
    PostCard,
    DisLikeCard,
    SavedCard,
    // OtherPostCard,
}