import SearchBar from "./SearchBar"
import ProfileInfo from "./ProfileInfo"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutFailure, signoutStart, signoutSuccess } from "../redux/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { ThemeContext } from "../contexts/theme";

const Navbar = ({userInfo,onSearchNote,handleClearSearch}) => {

   const {theme} = useContext(ThemeContext);

    const [searchQuery,setSearchQuery]=useState("");

    const navigate=useNavigate();
    const dispatch = useDispatch()

    const handleSearch=()=>{
      if(searchQuery)
      {
        onSearchNote(searchQuery);
      }
    }
    const onClearSearch=()=>{
        setSearchQuery("")
        handleClearSearch()
    }

    const onLogout=async()=>{
       try{
           dispatch(signoutStart())

           const res = await axios.get("http://localhost:3000/api/auth/signout",{withCredentials:true})
       
           if(res.data.success === false)
           {
            dispatch(signoutFailure(res.data.message))
            toast.error(res.data.message)
            return
           }

           toast.success(res.data.message)
           dispatch(signoutSuccess())
           navigate("/login")
          }
       catch(error)
       {
        toast.error(error.message);
        dispatch(signoutFailure(error.message));
       }
    }

  

  return (
 
    <div className={`navbar ${theme ==='dark' ?'bg-gray-900 text-white':'bg-white text-black'} flex items-center justify-between px-5 py-2 drop-shadow-md`}>
      <Link to={"/"}>
      <h2 className=" text-xl font-medium text-black py-2">
        <span className="text-slate-400">Good</span>
        <span className=" text-slate-600">Notes</span>
       </h2>
      </Link>
       
       <Link to={"/imp_note"}>
       <button className="text-sm bg-red-500 p-1 rounded-md text-white hover:opacity-80" >Imp Notes</button>
       </Link>

       <SearchBar value={searchQuery}
        onChange={({target})=>setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}  
       />

       <ProfileInfo userInfo={userInfo}  onLogout={onLogout}/>
    </div>
   
  )
}

export default Navbar