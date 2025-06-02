import React, { useState } from 'react'
import { ThemeProvider } from './UIcomp/Context.jsx'
import { Provider } from 'react-redux';
import store from './RTK/store.jsx';
import AllRoute from './RouterDom/Routes.jsx'
import OtherUserProfile from './User/OtherUserProfile.jsx'
import Likes from './User/LikePage.jsx'
import Saved from './User/SavedPage.jsx';
import DisLikes from './User/DisLikePage.jsx';
import PostView from './UIcomp/PostView.jsx';
import {ChangePassword} from './UIcomp/UserForm.jsx'
// import { LikeCard } from './UIcomp/Components.jsx';
import { FaPen ,FaCamera ,FaSave } from "react-icons/fa";
import Navbar from './UIcomp/Navigation.jsx';
import { BrowserRouter as Router , Route , Routes    } from 'react-router-dom';
import UserProfile from './User/Userprofile.jsx';
import { PostForm } from './UIcomp/PostForm.jsx';
import { CardComponent } from './UIcomp/Components.jsx';

import './App.css'

function App() {


  return (
    <>

      {/* <Router> */}
      <ThemeProvider>
      <Provider store={store} >
         <AllRoute />
         {/* <UserProfile/> */}
        {/* <OtherUserProfile/> */}
         {/* <DisLikes/> */}
         {/* <Saved/> */}
         {/* <PostView/> */}
         {/* <ChangePassword /> */}
         {/* <Navbar/> */}
         {/* <PostForm/> */}
         {/* <CardComponent/> */}
      </Provider>
      </ThemeProvider>
      {/* </Router> */}
    </>
  )
}

export default App
