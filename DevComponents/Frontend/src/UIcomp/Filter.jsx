import { useState } from "react";
// import { useSelector } from 'react-redux';
// import { selectFilterArray } from '../RTK/Selectors.jsx';
import THEMES from "./Theme.jsx";
import useTheme from "./Context.jsx"

const Filter = () => {
  // The filterArray is taken dynamically from the Redux store
  // const filterArray = useSelector(selectFilterArray);
  const filterArray = ['All', 'Buton' ,'Card' ,'Hero' ,'Slider' ,'Dashboard' ,'Landing Page' ,'Input Field' , 'Glass Effect' ,'Menu Card' ,'Profile View' , 'Reel View' , 'ETC.']
  const { theme } = useTheme()
  return (
    <>
      {/* Filter at the top */}
      <div id="filter" className={`${THEMES[theme].card1} sticky top-12 inset-0 overflow-auto scrollbar-hide flex space-x-4 p-4 `}>
        {filterArray.map((category) => (
          <button key={category} className={`${THEMES[theme].bar} text-nowrap px-4 py-2 rounded-full  `}>
            {category}
          </button>
        ))}
      </div>
    </>
  );
};

export default Filter;