import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext(); //context created to hold the theme state

export const useTheme = ()=>{
    return useContext(ThemeContext); //custom hook to use ThemeContext
}

export const ThemeProvider =({children})=>{ //this Component will wrap our whole app

    const [isDarkTheme, setIsDarkTheme] = useState(true);
        const toggleTheme = ()=>{
            setIsDarkTheme(prev=>!prev);
        }
        const theme = isDarkTheme ? "dark" : "light";
        useEffect(()=>{
            document.documentElement.setAttribute("data-theme", theme);
        },[isDarkTheme])
    
    
    return <ThemeContext.Provider value={{theme, toggleTheme}}>{children}</ThemeContext.Provider>
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired, 
  
  };




