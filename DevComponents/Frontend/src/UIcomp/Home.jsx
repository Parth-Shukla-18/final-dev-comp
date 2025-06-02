import React, { useState, useEffect } from "react";
import { FaBars, FaFilter, FaTimes } from "react-icons/fa";
import { LikeComponent1, LikeComponent2, CardComponent } from './Components.jsx';
import Navbar from './Navigation.jsx';
import { useMediaQuery } from "react-responsive";
import THEMES from "./Theme.jsx";
import useTheme from "./Context.jsx";
// import { useGetFilterPostsQuery, useLazyGetFilterPostsQuery } from '../RTK/PostApi';
import { useSelector } from "react-redux";
// import { selectGetFilterPostsResult } from "../RTK/Selectors.jsx";
import axios from "axios"


const API_URL = "http://localhost:8000/pp/devcomp/post";

const Home = () => {


    const { theme } = useTheme();
    const isTab = useMediaQuery({ minWidth: 992 });
    const [yes, setYes] = useState(true);
    const [Item, setItem] = useState(false);
    const filterArray = ['Navbar', 'Footer', 'Sidebar', 'Search Bar', 'Forms', 'Buttons', 'About Us', 'Cards', 'Sliders', 'Popover', 'Radio Buttons', 'Ratings', 'Loader', 'Spinner', 'Tags', 'Dashboard', 'Accordion', 'Timer', 'Dropdown', 'Table', 'List', 'Toast', 'Grid'];
    const [page, setPage] = useState(1);
    const [allPosts, setAllPosts] = useState([]);
    const [filter, setFilter] = useState('all');
    const [code, setCode] = useState(0);
    const [isFetching , setFetch] = useState(0);

    const getData  = async () =>{
      const response = await axios.get(`${API_URL}/allfilter?filter=${filter}&page=${page}&code=${code}` ) || []; 
      // console.log(response);
      
      const data = response.data; 
      setAllPosts(prev => [ ...prev , ...data]);

      // return response; 
    }
    useEffect(() => {
        setYes(!isTab);
    }, [isTab]);


    
    const handleInfiniteScroll = async () =>{ 
        
        try {
           if( window.innerHeight + document.documentElement.scrollTop  >= document.documentElement.scrollHeight ){
              setPage( (prev) => prev + 1); 
          }
        } 
        catch (error) {
          console.log(error);
        }
    }

    useEffect(() =>{    
      getData();
    } , [page,filter ,code] ); 

    useEffect(() =>{      
      window.addEventListener("scroll" , handleInfiniteScroll ); 
      return () => window.removeEventListener("scroll" , handleInfiniteScroll); 
    } , [] )


    return (
        <>
            <Navbar show={`${yes ? "hidden" : ''}`} />
            <div className={`${THEMES[theme].page1} `}>
                <div className={`text-2xl ${THEMES[theme].frame} p-3 font-bold flex justify-between sticky top-0`}>
                    <h2>DeveloperUi.in</h2>
                    <button onClick={() => { setItem(!Item) }} className={`relative ${THEMES[theme].icons}`}>
                        <FaFilter size={30} />
                    </button>
                    <button onClick={() => { setYes(!yes) }} className={`${THEMES[theme].icons} transition transform duration-200 tab:hidden`}>
                        {yes ? <FaBars size={32} /> : <FaTimes size={32} />}
                    </button>
                </div>
                <div id="filter" className={`${THEMES[theme].card1} sticky top-12 inset-0 overflow-auto scrollbar-hide flex space-x-4 p-4 `}>
                    {filterArray.map((category) => (
                        <button
                            key={category}
                            onClick={() => {
                                if (filter !== category) setFilter(category);
                            }}
                            className={`${THEMES[theme].bar} text-nowrap px-4 py-2 rounded-full ${filter === category ? 'bg-blue-600 text-red-500' : ''}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                {Item && (
                    <div className={`${THEMES[theme].card1} pl-[55%] absolute  w-full text-lg font-[500]`}>
                        <div>
                            <input type="radio" onClick={() => { setCode(1) }} name="codeType" id="React" />
                            <label htmlFor="React" className="px-4">React</label>
                        </div>
                        <div>
                            <input type="radio" onClick={() => { setCode(2) }} name="codeType" id="Non_React" />
                            <label htmlFor="Non_React" className="px-4">NonReact</label>
                        </div>
                        <div>
                            <input type="radio" onClick={() => { setCode(3) }} name="codeType" id="Non_React_Tailwind" />
                            <label htmlFor="Non_React_Tailwind" className="px-4">NoReactTailwind</label>
                        </div>
                    </div>
                )}
                <div className="card-components flex flex-col tab:ml-[180px]  tab: gap-y-6 tab:w-[calc(100vw-220px)] ">
                    {allPosts?.map((post) => (
                        <div className="card" key={post.postId}>
                            <CardComponent {...post} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export {
    Home,
};
