import React , { useState  } from "react";
import { FaThumbsUp, FaThumbsDown, FaSave, FaTrashAlt , FaCross ,FaArrowLeft} from "react-icons/fa";
import THEMES from "./Theme.jsx";
import useTheme from "./Context.jsx";
import { useNavigate ,useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import CodeEditor from "./CodeEditor.jsx";
// import axios from "axios";


const PostView = () => {

  const { theme } = useTheme();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { title, html='<h1>dfghjk</h1>', css, js, react, userName } = state || {};
  const [ show , setShow ] = useState(false);
  let [htmlCode ,setHtml] = useState(html || "");
  let [cssCode ,setCss] = useState(css ||"");
  let [jsCode ,setJs] = useState(js||"");
  let [reactCode ,setReact] = useState(react||"");
// make it render by <ifram/>

  return (
    <div className=" p-5 w-full mx-auto bg-gray-100 rounded-lg shadow-md">
      {/* User Info */}
        <div className="  flex justify-between gap-x-6 text-lg font-bold px-4">         
          {/* <div>Back</div> */}
          <button onClick={() => navigate(-1)}><FaArrowLeft className={`text-2xl hover:-translate-x-2 duration-200 `}/></button>
          <div className="text-amber-600 my-auto">{userName}</div>
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
        !show && <div className= "my-3 border hover:border-red-500 border-amber-500 rounded-lg ">
        <CodeEditor htmlCode={htmlCode} cssCode={cssCode} jsCode={jsCode} reactCode={reactCode} />
    </div>
      }
      {
        show && <div className="flex justify-around gap-2 ">
        {/* Display conditionally based on the logic */}
        {reactCode === "" && (htmlCode !== "" || cssCode !== "" || jsCode !== "") ? (
          <>
            {/* HTML Input */}
            <div className="flex flex-col items-center w-[350px]">
              <button onClick={() => navigator.clipboard.writeText(htmlCode)} className="border w-[70%] focus:bg-gradient-to-r from-red-500 to-amber-500 py-1 rounded mb-2">
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
              <button onClick={() => navigator.clipboard.writeText(cssCode)} className="border w-[70%] focus:bg-gradient-to-r from-red-500 to-amber-500 py-1 rounded mb-2">
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
              <button onClick={() => navigator.clipboard.writeText(jsCode)} className="border w-[70%] focus:bg-gradient-to-r from-red-500 to-amber-500 py-1 rounded mb-2">
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
        ) : (htmlCode === "" && cssCode === "" && jsCode === "") ? (
          <>
            {/* React Component Input */}
            <div className="flex flex-col items-center w-[350px]">
              <button onClick={() => navigator.clipboard.writeText(reactCode)} className="border w-full focus:bg-gradient-to-r from-red-500 to-amber-500 py-2 rounded mb-2">
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
            <div className="flex flex-col items-center w-[350px]"> Wrong Code </div>
          </>
        )}
       </div>
      }

      <div className ="my-2 font-bold text-lg">{title}</div>

    </div>
  );
};

export default PostView;