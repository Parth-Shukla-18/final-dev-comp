import { BrowserRouter as Router , Route , Routes   } from 'react-router-dom'
import { Home } from '../UIcomp/Home.jsx'
import FormSwitcher from '../UIcomp/AllForms.jsx'
import UserProfile from '../User/Userprofile.jsx';
import AboutUs from '../UIcomp/AboutUs.jsx'
// import OtherUserProfile from '../User/OtherUserProfile.jsx'; needed at home page
import Likes from '../User/LikePage.jsx';
import DisLikes from '../User/DisLikePage.jsx';
import Saved from '../User/SavedPage.jsx';
import { useLazyGetMyPostsQuery } from '../RTK/PostApi.jsx'
import { useSelector } from 'react-redux';
import OtherUserProfile from '../User/OtherUserProfile.jsx'
// import { ChangePassword } from '../UIcomp/UserForm.jsx'
import { useGetCurrentUserQuery } from '../RTK/UserApi.jsx';
import PostView from '../UIcomp/PostView.jsx'
import { ChangePassword, ForgotPassword } from '../UIcomp/UserForm.jsx';
import { selectGetCurrentUserResult } from '../RTK/Selectors.jsx';

const AllRoute = () => {

    const data = useSelector((state) =>
      selectGetCurrentUserResult(state)?.data
    );
    const userName = data?.userName || null;
    
  // const getUserPostResult = useSelector(selectGetUserPostResult({ userName }));
  // const isCached = Boolean(getUserPostResult?.data);

  // const useIsQueryCached = (selector, arg) => {
  //   const result = useSelector(selector(arg));
  //   return Boolean(result?.data);
  // };
  
  // Usage
  // const isCached = useIsQueryCached(selectGetUserPostResult, { userName });
  

    // const isCached = useSelector((state) =>
    //     Boolean(
    //       state.postApi.queries[`getUserPost(${JSON.stringify({ userName })})`]?.data
    //     )
    //   );

      // const useCached = (endpointName, args) => {
      //   return useSelector((state) =>
      //     Boolean(state.postApi.queries[`${endpointName}(${JSON.stringify(args)})`]?.data)
      //   );
      // };      
    let ind = 0;
    if(userName){
        ind = 2;
    }
    return (
        <Router>
            <Routes>
                {/*  We will render Main card inside home: / 
                     NavBar and Filters are also inside Home   */}
                <Route path="/" element={<Home />} />
                {/* <Route path="/post" element={<></>} /> */}
                <Route path='/login-signup' element={<FormSwitcher ind={0} />} />
                <Route path='/add-post' element={<FormSwitcher ind={ind} />} />
                <Route path='/profile' element={<UserProfile />} />
                <Route path='/saved' element={<Saved />} />
                <Route path='/likes' element={<Likes />} />
                <Route path='/dislikes' element={<DisLikes />} />
                {/* <Route path='/about' element={<UserProfile />} /> */}
                {/* <Route path='/feedback' element={<UserProfile />} /> */}
                <Route path='/AboutUs' element={<AboutUs/>} />
                <Route path='/other-user' element={<OtherUserProfile />} />
                <Route path='/change-password' element={<ChangePassword />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/post-view' element={ <PostView/> } />
            </Routes>
        </Router>
    )

}

export default AllRoute;