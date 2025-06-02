import React , { useState } from "react";
import THEMES from "./Theme.jsx";
import useTheme from "./Context.jsx"
// import { useDispatch } from "react-redux";
// import { createProfile } from '../RTK/UserSlice.jsx'
import { useAction } from './Context.jsx'
// import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import { useLoginUserMutation , useCreateNewUserMutation ,useResetPasswordMutation ,useForgotPasswordMutation } from '../RTK/UserApi.jsx'

// const API_URL = "http://localhost:8000";



const LoginSignupForm = ({navigate}) => {

    const [userName , setUserName] = useState('');
    const [fullName , setFullName] = useState('')
    const [collegeName , setCollegeName] = useState('')
    const [selfDescription ,setselfDescription] = useState('')
    const [password , setPassword] = useState('')
    const {theme} = useTheme();
    const { setAction } = useAction();
    const move = useNavigate()
    const [loginUser, { isError, error }] = useLoginUserMutation();

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        await loginUser({ userName, password }).unwrap();
        move('/');
      } catch (err) {
        console.log(err);
      }
    };
    
    const handleSignUp = (e) => {
        e.preventDefault();
        if(!userName || !fullName){
          alert("Please fill all required fields!");
          return;
        }
        setAction(prv => ({
          ...prv,
          userName ,fullName ,collegeName ,selfDescription
        }))
        navigate(1)
    }
    function changeForm() {
      document.getElementById("signUp").classList.toggle("hidden");
      document.getElementById("logIn").classList.toggle("hidden");
  }

      return (
        <div id="loginSignupForm" className={`${THEMES[theme].page2} min-h-screen`}>

          <div id="signUp" className={` flex flex-col items-center justify-center`}>
            <form action="#" className={` ${THEMES[theme].outerContainer} p-6 my-14 rounded-lg`}>
              <label htmlFor="userid" className={`${THEMES[theme].labels} my-4 block text-lg largePhone:text-xl tab:text-2xl font-bold`}>
                Enter Unique User-Name
              </label>
              
              <input type="text" onChange={(e) => {setUserName(e.target.value)}} value={userName}  id="UserName" name="UserName" placeholder="Enter UserName" required className={`${THEMES[theme].input1} capsuleInputBar`} />
              <input type="text" onChange={(e) => {setFullName(e.target.value)}} value={fullName} id="FullName" name="FullName" placeholder="Full Name" required className={`${THEMES[theme].input2} capsuleInputBar`} />
              <input type="text" onChange={(e) => {setCollegeName(e.target.value)}} value={collegeName} id="CollegeName" name="CollegeName" placeholder="Collage Name /*Optional"  className={`${THEMES[theme].input1} capsuleInputBar`} />
             
              {/* <input type="password" onChange={(e) => {setPassword(e.target.value)}} value={password} name="password" id="password" placeholder="Enter Strong Password" required className={`${THEMES[theme].input2} capsuleInputBar`} /> */}
              <input type="text" onChange={(e) => {setselfDescription(e.target.value)}} value={selfDescription} id="SelfDescription" name="SelfDescription" placeholder="Self Description.../*Optional" className={`${THEMES[theme].input2} capsuleInputBar`} />

              <button type="submit" onClick={handleSignUp} className={`${THEMES[theme].buttons} w-[50vw] max-w-[425px] mx-auto block rounded-full p-[4px] font-semibold mobilePhone:text-lg largeTab:text-2xl`}>Sign Up</button>
              <p className={`largePhone:text-lg mx-4 ${THEMES[theme].text}`}>
                Already have an account? 
                <button type="button" onClick={changeForm} className={`${THEMES[theme].labels} underline  block text-lg largePhone:text-xl tab:text-2xl font-bold my-6`}>Log In</button>
              </p>
            </form>
          </div>

          <div id="logIn" className={`${THEMES[theme].page2} hidden`}>
            <div className="flex flex-col items-center justify-center my-12">
              <form action="#"className={` ${THEMES[theme].outerContainer} p-6 my-14 rounded-lg`} >
              <input type="text" onChange={(e) => {setUserName(e.target.value)}} value={userName}  id="UserName" name="UserName" placeholder="Enter UserName" required className={`${THEMES[theme].input1} capsuleInputBar`} />
              <input type="password" onChange={(e) => {setPassword(e.target.value)}} value={password} name="password" id="password" placeholder="Enter Strong Password" required className={`${THEMES[theme].input2} capsuleInputBar`} />
                
                <button type="submit" onClick={handleLogin} className={`${THEMES[theme].buttons} w-[50vw] max-w-[425px] mx-auto block rounded-full p-[4px] font-semibold mobilePhone:text-lg largeTab:text-2xl`}
                >Login</button>

                <div className="flex justify-between my-4">
                <p className="largePhone:text-lg ">
                  Create an account! 
                  <button type="button" onClick={changeForm} className={`${THEMES[theme].labels}  block text-lg largePhone:text-xl tab:text-2xl font-bold my-1 underline`}>Sign Up</button>
                </p>
                <Link to="/forgot-password" className={`text-blue-500 underline text-lg`} > forgot-password</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
  };
    
const EmailPassword = () => {

      const { theme } = useTheme();
      const [email , setEmail] = useState('');
      const [password , setPassword] = useState('');
      const { action } = useAction();
      const move = useNavigate();
      const [createNewUser, { isError, error } ] = useCreateNewUserMutation();
      const validateInput = async (e) => {
        e.preventDefault();
        if(!email || !password){
          alert("Please fill all required fields!");
          return;
        }
        const userData = {
          ...action, 
          email,
          password,
        };         
        try {
          await createNewUser( userData ).unwrap();
          setEmail('')
          setPassword('');
          move('/');
        } catch (err) {
          console.log(err)
        }    
      };
      
        return (
          <div className={`${THEMES[theme].page2} min-h-screen`}>
            <div className="flex justify-center p-[3vw] pt-[10vh]  rounded-lg shadow-lg">  
              <form  className={`${THEMES[theme].outerContainer} p-6 my-14 rounded-lg`}>
                <label htmlFor="userInput" className={`${THEMES[theme].labels} my-4 block text-lg largePhone:text-xl tab:text-2xl font-bold`}>
                  Enter Your Email
                </label>
                <input
                  type="text"
                  id="userInput"
                  name="userInput"
                  value={email}
                  onChange={(e) => {setEmail(e.target.value)}}
                  placeholder="Enter your Mob or Gmail"
                  required
                  className={`${THEMES[theme].input1} capsuleInputBar`}
                />
                <label htmlFor="userPassword" className={`${THEMES[theme].labels} my-4 block text-lg largePhone:text-xl tab:text-2xl font-bold`}>
                  Enter Password
                </label>
                <input type="password" onChange={(e) => {setPassword(e.target.value)}} value={password} name="password" id="password" placeholder="Enter Strong Password" required className={`${THEMES[theme].input2} capsuleInputBar`} />
                <button type="submit" onClick={validateInput} className={`${THEMES[theme].buttons} w-[50vw] max-w-[425px] mx-auto block rounded-full p-[4px] font-semibold mobilePhone:text-lg largeTab:text-2xl`} >
                  Next
                </button>
              </form>
            </div>
          </div>
        );
  };

const ForgotPassword = () => {

      const {theme} = useTheme()
      const [email , setEmail] = useState('');
      const [password , setPassword] = useState('')
      const navigate = useNavigate(); 

      const [forgotPassword] = useForgotPasswordMutation();
      const forgotPass = async (e) => {
        e.preventDefault();
        try {
          await forgotPassword({ email, password }).unwrap();
          navigate('/'); 
        } catch (err) {
          console.log(err); 
        }
      }

      // const validateInput = (e) => {
      //   e.preventDefault();
      //   setAction(prv => ({
      //     ...prv,
      //     email
      //   })) 
      //   navigate(2)     
      // };
      
        return (
          <div className={`${THEMES[theme].page2} min-h-screen`}>
            <div className="flex justify-center p-[3vw] pt-[10vh]  rounded-lg shadow-lg">  
              <form  className={` ${THEMES[theme].outerContainer} p-6 my-14 rounded-lg`}>
                <label htmlFor="userInput" className={`${THEMES[theme].labels} my-4 block text-lg largePhone:text-xl tab:text-2xl font-bold`}>
                  Enter Your Email
                </label>
                <input
                  type="text"
                  id="userInput"
                  name="userInput"
                  value={email}
                  onChange={(e) => {setEmail(e.target.value)}}
                  placeholder="Enter your Mob or Gmail"
                  required
                  className={`${THEMES[theme].input1} capsuleInputBar`}
                />
                <label htmlFor="userPassword" className={`${THEMES[theme].labels} my-4 block text-lg largePhone:text-xl tab:text-2xl font-bold`}>
                  Enter Password
                </label>
                <input type="password" onChange={(e) => {setPassword(e.target.value)}} value={password} name="password" id="password" placeholder="Enter Strong Password" required className={`${THEMES[theme].input2} capsuleInputBar`} />
                <button type="submit" onClick={forgotPass} className={`${THEMES[theme].buttons} w-[50vw] max-w-[425px] mx-auto block rounded-full p-[4px] font-semibold mobilePhone:text-lg largeTab:text-2xl`} >
                  Password Reset
                </button>
              </form>
            </div>

          </div>
        );
  };

const OtpVerification = ({navigate}) => {
  const { theme } = useTheme();
  const [otp , setOtp] = useState();
  const { action } = useAction();
  
  const VerifyOtp = async (e) => {
    e.preventDefault();

    // verify otp first 

    try {
      const response = await axios.post(`${API_URL}/signUp`,action)
      const dispatch = useDispatch();
      // dispatch(createProfile(response));
      navigate(3)
      
    } catch (err) {
      console.log(err)
    }
    
  }

  return (
    <div id="popUpOTPform" className="flex justify-center p-[3vw] mt-[10vh]  rounded-lg shadow-lg">
    <form className={` ${THEMES[theme].outerContainer} p-6 my-14 rounded-lg`}>
      <label htmlFor="otp" className={`${THEMES[theme].labels} my-4 block text-lg largePhone:text-xl tab:text-2xl font-bold`}>
        Enter OTP
      </label>
      <input
        type="tel"
        id="otp"
        name="otp"
        maxLength="6"
        minLength="6"
        value={otp}
        onChange={(e) => {setOtp(e.target.value)}}
        placeholder=" 0 0 - 0 0 - 0 0"
        className={`${THEMES[theme].input1} capsuleInputBar`}
        required
      />
      <button type="submit" onClick={VerifyOtp} className={`${THEMES[theme].buttons} w-[50vw] max-w-[425px] mx-auto block rounded-full p-[4px] font-semibold mobilePhone:text-lg largeTab:text-2xl`}>
        Verify
      </button>
    </form>
  </div>
  )
}

const ChangePassword = () => {

  const { theme } = useTheme();
  const [oldPassword , setOldPassword] = useState('')
  const [newPassword , setNewPassword] = useState('')
  const [resetPassword] = useResetPasswordMutation();
  const navigate = useNavigate(); 

  const HandlePassword = async (e) => {
    e.preventDefault();
    try {
      await resetPassword({ oldPassword, newPassword }).unwrap();
      navigate('/'); 

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`${THEMES[theme].page2} min-h-screen`}>
      <div className="flex justify-center p-[3vw] pt-[10vh]  rounded-lg shadow-lg">
        <form className={` ${THEMES[theme].outerContainer} p-6 my-14 rounded-lg`}>
          <h2 className={`${THEMES[theme].labels} my-4 text-xl tab:text-2xl font-bold`} >Chang Your Password</h2>
          <input type="password" onChange={(e) => {setOldPassword(e.target.value)}} value={oldPassword} id="oldPassword" name="oldPassword" placeholder="Enter Old Password" required className={`${THEMES[theme].input1} capsuleInputBar`} />
          <input type="password" onChange={(e) => {setNewPassword(e.target.value)}} value={newPassword} name="newPassword" id="newPassword" placeholder="Enter New Password" required className={`${THEMES[theme].input2} capsuleInputBar`} />
          <button type="submit" onClick={HandlePassword} className={`${THEMES[theme].buttons} w-[50vw] max-w-[425px] mx-auto block rounded-full p-[4px] font-semibold mobilePhone:text-lg largeTab:text-2xl`}>Apply Change</button>
        </form>
      </div>
    </div>
  )
}

export{
    LoginSignupForm,
    EmailPassword,
    OtpVerification,
    ChangePassword,
    ForgotPassword,
}