import { getInitials } from "../utils/helper"
import  { useContext } from 'react';
import { ThemeContext } from "../contexts/theme";
import { FaMoon, FaSun } from "react-icons/fa";


const ProfileInfo = ({onLogout,userInfo}) => {
  

 const { theme,toggleTheme } = useContext(ThemeContext);
  return (
    // <div className={ `${theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}>
    <div className=" flex items-center gap-3 "
        >
    
         <button className={` ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}  w-12 h-12 flex items-center justify-center rounded-full text-dark font-medium boarder  `} onClick={toggleTheme}>
           {theme==="light"?<FaMoon />:<FaSun/>}
         </button>
         
         {/* <button onClick={toggleTheme} className="p-2 bg-blue-500 text-white rounded">
         Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button> */}
       
        <div className={` ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium `}>{getInitials(userInfo?.username)} </div>
        <div><p className="text-sm font-medium">{userInfo?.username }</p></div>

        <button className="text-sm  p-1 rounded-md border border-blue-600 text-blue-600 hover:bg-red-500" onClick={onLogout}>Logout</button>
    </div>
   // </div>
  )
}

export default ProfileInfo