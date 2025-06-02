import React , { useState , useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import THEMES from "./Theme.jsx";
import useTheme from "./Context.jsx";
import { useSelector} from "react-redux";
// import { createPost } from '../RTK/PostSlice.jsx'
import { useCreateNewPostMutation } from '../RTK/PostApi.jsx';
import { selectGetCurrentUserResult } from '../RTK/Selectors.jsx'
// import axios from 'axios'


// const API_URL = "http://localhost:8000";

// fetch user id if logedIN and no user data , if no logedIn first send 
// user to logIN and after logIN take userName from userSlice.

// const fetchData = async () => {

//   try {
//     const userData = await axios.get(`${API_URL}/profile`,{ withCredentials: true })
//     const { userName } = userData();
//     // save it store

//   } catch (err) {
    
//   }
// }

const ReactCode = ({}) => {

  const { theme } = useTheme();
  const move = useNavigate();
  const userData = useSelector(selectGetCurrentUserResult) || null;
  const userName = userData?.data?.userName || null;
  
  const [titleName, setTitleName] = useState('');
  const [description, setDescription] = useState('');
  const [reactCode, setReactCode] = useState('');
  const [createNewPost, { isLoading, isError, error }] = useCreateNewPostMutation();
  
  const HandlePost = async (e) => {
    e.preventDefault();
  
    if (!titleName || !reactCode) {
      alert("Please fill all required fields!");
      return;
    }
  
    const postData = {
      title: titleName,
      description,
      codeType: 1,
      react: reactCode,
      likes: 0,
      disLikes: 0,
      user: userName,
    };
  
    try {
      await createNewPost({postData }).unwrap();
      setTitleName('');
      setDescription('');
      setReactCode('');
      move("/");
    } catch (err) {
      console.error('Post creation failed:', err);
    }
  };

      return (
        <div id="loginSignupForm" >
        
          <div id="signUp" className="flex flex-col items-center justify-center">
            <form action="#" className={` ${THEMES[theme].outerContainer} px-6 py-2 rounded-lg`}>
              <label htmlFor="userid" className={`${THEMES[theme].labels} my-2 block text-lg largePhone:text-xl tab:text-2xl font-bold`}>
                Post Your Code
              </label> 
              <input type="text" id="name" name="name" value={titleName} onChange={(e)=>{setTitleName(e.target.value)}} placeholder="Component Name" required className={`${THEMES[theme].input1} capsuleInputBar`} />
              <input type="text" id="name" name="name" value={description} onChange={(e) => {setDescription(e.target.value)}} placeholder="Description about code..." required className={`${THEMES[theme].input2} capsuleInputBar`} />
              <textarea placeholder="Your code goes here..." value={reactCode} onChange={(e) => {setReactCode(e.target.value)}} className={`${THEMES[theme].input1} codeArea `}></textarea>
              <div className="flex flex-col">
                <button type="button" onClick={() => move("/")} className={`${THEMES[theme].buttons} cursor-pointer w-[50vw] my-4 mt-6 max-w-[425px] mx-auto block rounded-full p-[4px] font-semibold mobilePhone:text-lg largeTab:text-2xl`}>
                Skip</button>
                <button type='submit' onClick={HandlePost} className={`${THEMES[theme].buttons} cursor-pointer w-[50vw] max-w-[425px] mx-auto block rounded-full p-[4px] font-semibold mobilePhone:text-lg largeTab:text-2xl`}>Post</button>
              </div>
            </form>
          </div>
          
        </div>
      );
  };

const NonReactCode = ({ showCss }) => {
  const { theme } = useTheme();
  const move = useNavigate();
  const [createNewPost, { isLoading, isError, error }] = useCreateNewPostMutation();
  const userData = useSelector(selectGetCurrentUserResult) || null;
  const userName = userData?.data?.userName || null;

  const [titleName, setTitleName] = useState('');
  const [description, setDescription] = useState('');
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');

  const codeType = showCss ? 2 : 3;

  const postData = {
    title: titleName,
    description,
    codeType,
    html: htmlCode,
    css: cssCode,
    js: jsCode,
    likes: 0,
    disLikes: 0,
    user: userName,
  };

  const HandlePost = async (e) => {
    e.preventDefault();

    if (!titleName || !htmlCode) {
      alert("Please fill all required fields!");
      return;
    }
    
    try {
      const result = await createNewPost({ postData }).unwrap();
      setTitleName('');
      setDescription('');
      setHtmlCode('');
      setCssCode('');
      setJsCode('');
      move("/");
    } catch (err) {
      console.error('Post creation failed:', err);
    }
  };
  
    return (
      <div id="loginSignupForm" >
        
  
          
  
        <div id="signUp" className="flex flex-col items-center justify-center">
          <form action="#" className={` ${THEMES[theme].outerContainer} px-6 py-2 rounded-lg`}>
          <label htmlFor="userid" className={`${THEMES[theme].labels} my-2 block text-lg largePhone:text-xl tab:text-2xl font-bold`}>
              Post Your Code
            </label>
            <input type="text" id="compName" name="name" value={titleName} onChange={(e) => {setTitleName(e.target.value)}} placeholder="Component Name" required className={`${THEMES[theme].input1} capsuleInputBar`} />
            <input type="text" id="Description" name="name" value={description} onChange={(e) => {setDescription(e.target.value)}} placeholder="Description about code..." required className={`${THEMES[theme].input2} capsuleInputBar`} />
            <textarea placeholder="HTML code" value={htmlCode} onChange={(e) => {setHtmlCode(e.target.value)}} className={`${THEMES[theme].input1} codeArea `}></textarea>
            { showCss && 
            <textarea placeholder="CSS code" value={cssCode} onChange={(e) => {setCssCode(e.target.value)}} className={`${THEMES[theme].input2} codeArea `}></textarea>}
            <textarea placeholder="JS code" value={jsCode} onChange={(e) => {setJsCode(e.target.value)}} className={`${THEMES[theme].input1} codeArea `}></textarea>

            <button type="button" onClick={() => move("/")} className={`${THEMES[theme].buttons} w-[50vw] cursor-pointer my-4 mt-6 max-w-[425px] mx-auto block rounded-full p-[4px] font-semibold mobilePhone:text-lg largeTab:text-2xl`}>
            Skip</button>
            <button type="submit" onClick={HandlePost} className={`${THEMES[theme].buttons} w-[50vw] max-w-[425px] mx-auto block rounded-full p-[4px] font-semibold mobilePhone:text-lg largeTab:text-2xl`}>Post</button>
          
          </form>
        </div>
        
      </div>
    );
};

const PostForm = () => {

  const {theme} = useTheme()
  const [lang , setLang] = useState(1);
        return (
          <div>
            <span className={` ${THEMES[theme].outerContainer} min-h-screen`}>
              <select
                name="themes"
                id="ChangeTheme"
                onChange={(e) => setLang(Number(e.target.value))}
                value={lang}
                className={`rectanglInputBar mx-auto `}>
                <option value={1} >React</option>
                <option value={2} >Non-React</option>
                <option value={3}  >Non-React-Tailwind</option>
              </select>
              {lang === 1 && <ReactCode />}
              {lang === 2 && <NonReactCode showCss={true} />}
              {lang === 3 && <NonReactCode showCss={false} />}
            </span>
          </div>
        )
   
}

  export{
    // CodingLanguage,
    ReactCode,
    NonReactCode,
    PostForm,
  }

  // const CodingLanguage = ({navigate}) => {
      
  //   const { theme } = useTheme()
  //   const [lang , setLang] = useState(0)

  //   const HandleLang = () => {
  //     e.preventDefault();
  //     console.log(lang);
  //     navigate(3)
  //   }
    
  //   return (
  //     <div id="loginSignupForm" className={`${THEMES[theme].page2} min-h-screen`}>
  //       <div id="signUp" className="flex flex-col items-center justify-center">
  //         <form action="#" className={` ${THEMES[theme].outerContainer} p-6 mobilePhone:p-14 my-16 rounded-lg`}>
  //           <label htmlFor="userid" className={`${THEMES[theme].labels} my-4 block text-lg largePhone:text-xl tab:text-2xl font-bold`}>
  //             Select Your Coding Language
  //           </label>
  //           <div className="my-4">
  //             <input type="radio" id="React" checked={lang === value} onChange={() => {setLang(1)}} name="CodingLanguage"  required />
  //             <label htmlFor="React" className={`${THEMES[theme].labels}  my-4 px-6 text-lg largePhone:text-xl tab:text-2xl font-bold`}>React</label>
  //           </div>
  //           <div className="my-4">
  //             <input type="radio" id="Non-React" checked={lang === value} onChange={() => {setLang(2)}} name="CodingLanguage" required  />
  //             <label htmlFor="Non-React" className={`${THEMES[theme].labels} my-4 px-6 text-lg largePhone:text-xl tab:text-2xl font-bold`}>Non-React</label>

  //           </div>
  //           <div className="my-4">
  //             <input type="radio" id="Non-react-tailwind" checked={lang === value} onChange={() => {setLang(3)}} name="CodingLanguage" required  />
  //             <label htmlFor="Non-react-tailwind" className={`${THEMES[theme].labels} my-4 px-6 text-lg largePhone:text-xl tab:text-2xl font-bold`}>Non-React with Tailwind</label>

  //           </div>
            
  //           <button type="submit" onClick={() => navigate(8)} className={`${THEMES[theme].buttons} w-[50vw] my-4 mt-6 max-w-[425px] mx-auto block rounded-full p-[4px] font-semibold mobilePhone:text-lg largeTab:text-2xl`}>
  //             <Link to="/">Skip</Link></button>
  //           <button type="submit" onClick={HandleLang} className={`${THEMES[theme].buttons} w-[50vw] my-4 max-w-[425px] mx-auto block rounded-full p-[4px] font-semibold mobilePhone:text-lg largeTab:text-2xl`}>Next</button>
          
  //         </form>
  //       </div>

  //     </div>
  //   );
  // };