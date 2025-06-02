import React , { useEffect } from "react";
import { createContext , useContext , useState } from "react";

const ThemeContext = createContext({
    
}) 

 const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(()=>{return localStorage.getItem('Theme') || "light"});
    useEffect( () => {
        localStorage.setItem('Theme',theme);
    },[theme] )

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default function useTheme() {
    return useContext(ThemeContext)
}

// for form handling to take users data
 const ActionContext = createContext(null)

 const ActionProvider = ({ children }) => {
    const [action ,setAction] = useState({
          fullName: '',
          userName: '',
          collegeName: '',
          password: '',
          email: '',
          selfDescription: '',
          likes: [],
          disLikes: [],
          saved: [],
    })
    return (
        <ActionContext.Provider value={{ action , setAction }} >
            {children}
        </ActionContext.Provider>
    )
}

 function useAction () {
    return useContext(ActionContext);
}

export{
    useAction,
    ActionProvider,
    ActionContext,
    ThemeProvider,
    ThemeContext,
}
