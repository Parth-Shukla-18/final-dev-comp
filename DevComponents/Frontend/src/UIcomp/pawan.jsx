import React , { useState  } from "react";
import { FaThumbsUp, FaThumbsDown, FaSave, FaTrashAlt} from "react-icons/fa";
import THEMES from "./Theme.jsx";
import useTheme from "./Context.jsx"
import { useDispatch } from "react-redux"
import axios from "axios";
import { addDisLike, addLike, removeDisLike, removeLike, removeSaved } from "../RTK/CurrentUser.jsx";
import { dislikePost, likePost } from "../RTK/PostSlice.jsx";
import CodeEditor from "./CodeEditor.jsx";
// import SeeCode from "./SeeCode.jsx";


const API_URL = "http://localhost:8000";

const LikeComponent1 = ({ title,userName,postId,compType }) => {
}

const LikeComponent2 = ({title,userName,postId,compType}) => {
}

const CardComponent = ({postId,userName}) => {
  let likeCnt = 50;
  // const [fullView ,setFullView] = useState(false)
  const [likes, setLikes] = useState(false);
  const [disLikes, setDisLikes] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const [html, setHtml] = useState(`<button class="button">Click Here </button>`);
  const [css, setCss] = useState(`.button {
            padding: 15px 30px;
            font-size: 18px;
            font-weight: bold;
            color: white;
            background: linear-gradient(135deg, #ff7eb3, #ff758c);
            border: none;
            border-radius: 30px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        }

        .button:hover {
            transform: scale(1.1);
            box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3);
        }`);
  const [js, setJs] = useState(``);
  const [reactCode, setReactCode] = useState(``);
  const [ show , setShow ] = useState(false); 

  const description = "This is a sample description of the component which contains more than seven words to demonstrate the read more functionality.";
  const words = description.split(" ");
  const shortDescription = words.slice(0, 10).join(" ") + (words.length > 7 ? "..." : "");

  let apply = null;
  const dispatch = useDispatch();

  const HandleLike = async () => {
  }

  const HandleDisLike = async () => {
  }

  const HandleSave = async () => {
  }

  return (
  <div className=" mt-3 p-5 w-full mx-auto bg-gray-100 rounded-lg shadow-md">
    {/* User Info */}
      <div className="  flex gap-x-6 text-lg font-bold">         
        <img src="" alt="U" className="bg-red-500 w-10 h-10 text-white overflow-hidden rounded-full" />
        <span className="text-amber-600 my-auto">User Name</span>
      </div>

      <div className="flex justify-between pt-4">
      <button onClick={() => setShow(false) } className="border w-[40%] focus:bg-gradient-to-r from-red-500 to-amber-500 py-1 rounded mb-2">
          Preview
        </button>
        <button onClick={() =>{ setShow(true)}} className="border w-[40%] focus:bg-gradient-to-r from-red-500 to-amber-500 py-1 rounded mb-2">
          Copy Code 
        </button>
      </div>
      {/* Boxes and Buttons */}
      {
        !show && <div className= "my-3 p-4 border hover:border-red-500 border-amber-500 font-semibold text-lg text-center  rounded-lg ">
        <CodeEditor html={html} css={css} js={js} reactCode={reactCode} />
    </div>
      }
      {
        show && <div className="flex justify-around gap-2 pt-3 pb-3">
        {/* Display conditionally based on the logic */}
        {reactCode === "" && (html !== "" || css !== "" || js !== "") ? (
          <>
            {/* HTML Input */}
            <div className="flex flex-col items-center w-[350px]">
              <button onClick={() => navigator.clipboard.writeText(html)} className="border w-[70%] focus:bg-gradient-to-r from-red-500 to-amber-500 py-1 rounded mb-2">
                Copy HTML Code
              </button>
              <div className="p-3 h-[300px] bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <textarea
                  onChange={(e) => setHtml(e.target.value)}
                  value={html}
                  placeholder="No HTML Code Available"
                  className="w-55 h-full bg-transparent border-none focus:outline-none overflow-auto scrollbar-hide"
                />
              </div>
            </div>
  
            {/* CSS Input */}
            <div className="flex flex-col items-center w-[350px]">
              <button onClick={() => navigator.clipboard.writeText(css)} className="border w-[70%] focus:bg-gradient-to-r from-red-500 to-amber-500 py-1 rounded mb-2">
                Copy CSS Code
              </button>
              <div className="p-3 h-[300px] bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <textarea
                  onChange={(e) => setCss(e.target.value)}
                  value={css}
                  placeholder="No CSS Code Available"
                  className="w-55 h-full bg-transparent border-none focus:outline-none overflow-auto scrollbar-hide"
                />
              </div>
            </div>
  
            {/* JavaScript Input */}
            <div className="flex flex-col items-center w-[350px]">
              <button onClick={() => navigator.clipboard.writeText(js)} className="border w-[70%] focus:bg-gradient-to-r from-red-500 to-amber-500 py-1 rounded mb-2">
                Copy JavaScript Code
              </button>
              <div className="p-3 h-[300px] bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <textarea
                  onChange={(e) => setJs(e.target.value)}
                  value={js}
                  placeholder="No JavaScript is Available"
                  className="w-55 h-full bg-transparent border-none focus:outline-none overflow-auto scrollbar-hide"
                />
              </div>
            </div>
          </>
        ) : (html === "" && css === "" && js === "") ? (
          <>
            {/* React Component Input */}
            <div className="flex flex-col items-center w-[350px]">
              <button onClick={() => navigator.clipboard.writeText(reactCode)} className="border w-full focus:bg-gradient-to-r from-red-500 to-amber-500 py-2 rounded mb-2">
                Copy React Code
              </button>
              <div className="p-3 h-[300px] bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <textarea
                  onChange={(e) => setReactCode(e.target.value)}
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
            <div className="flex flex-col items-center w-[350px]"> Wrong Code </div>
          </>
        )}
       </div>
      }
      

      {/* Component Box */}
      {/* <button onClick={()=>{setFullView(!fullView)}} className="w-full" > */}
        
      {/* </button> */}

      {/* Title and Actions */}
      <div>
        <div className ="my-2 font-bold text-lg">Component Name</div>
        <div className={`flex gap-x-5`}>
          <div className={`bg-gray-300  flex gap-x-4 p-1 px-2 rounded-full`}>
            <button className="block" onClick={HandleLike}><FaThumbsUp title="Like" className={`text-xl m-1   ${likes ? "text-rose-600" :""} `} /></button>
            {likeCnt} |
            <button className="block" onClick={HandleDisLike}><FaThumbsDown title="Dislike" className={`text-xl m-1   ${disLikes ? "text-rose-600" : ""} `} /></button>
          </div>
          <div className="bg-gray-300 px-3 pt-1 rounded-full">
            <button onClick={HandleSave}><FaSave className={`text-xl m-1  ${saved ? "text-rose-600" : "text-gray-900"}`} />
            </button> 
           <span className="align-top">{saved ? "Saved" : "Save"}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="text-sm pt-2.5 text-gray-600 mb-4">
        {showFullDescription ? description : shortDescription}
        {words.length > 10 && (
          <button 
            className="text-blue-600 ml-2" 
            onClick={() => {setShowFullDescription(!showFullDescription)}}
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
}