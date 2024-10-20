import { useState } from "react"
import Password from "../Component/Input/Password";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/helper";
import { useDispatch } from "react-redux";
import axios from "axios"
import { signInFailure, signInState, signInSuccess } from "../redux/user/userSlice";
import { toast } from "react-toastify";
import { ThemeContext } from "../contexts/theme";
import { useContext } from "react";

const Login = () => {

  const {theme} = useContext(ThemeContext);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e)=>{
   e.preventDefault();

   if(!validateEmail(email))
   {
    setError("Please enter a valid email address");
    return
   }

   if(!password)
   {
    setError("Please enter the password");
    return
   }

   setError("")

   //Login Api
    
   try{
      dispatch(signInState())

      const res = await axios.post("http://localhost:3000/api/auth/signin",
        {email,password},
      {withCredentials:true})

      if(res.data.success === false)
      {
        console.log(res.data);
        dispatch(signInFailure(data.message))
        toast.error(res.data.message)
      }

      toast.success(res.data.message)
      dispatch(signInSuccess(res.data))
       navigate("/")
   }
   catch(error)
   {
    toast.error(error.message)
    console.log(error)
    dispatch(signInFailure(error.message))
   }

  }

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} min-h-screen  flex items-center justify-center `}>
       <div className="w-96 border rounded  px-7 py-10 bg-white dark:bg-gray-900 dark:text-white">
       <form onSubmit={handleLogin}>
          <h4 className="text-2xl mb-7">Login</h4>

          <input type="text" placeholder="Email" className="input-box" 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}  
          />
          

         <Password value={password} onChange={(e)=> setPassword(e.target.value)}/> 
         
          {error && <p className=" text-red-500 text-sm pb-1">{error}</p>}

          <button type="submit" className="btn-primary">
            LOGIN
          </button>

          <p className="text-sm text-center mt-4">
            Not registered yet? {" "}
            <Link to={"/signup"} className=" font-medium text-[#2B85FF] underline">
              Create an account
            </Link>
          </p>
        </form>
       </div>
    
    </div>
  )
}

export default Login

