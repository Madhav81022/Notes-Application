
import {FaRegEye,FaRegEyeSlash} from 'react-icons/fa6';
import { useState } from 'react';


const Password = ({value,onChange,placeholder}) => {
    const [isShowPassword,setIsShowPassword]=useState(false);

    const toggleShowPassword=()=>{
        setIsShowPassword(!isShowPassword);
    }
  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3'>
       
        <input type={isShowPassword ? "text" : "password"} placeholder={placeholder || "password"} className=" w-full text-sm bg-transparent py-3 mr-3 rounded outline-none" 
          value={value}
          onChange={onChange} 

           />


           { isShowPassword ? (
            <FaRegEye size={22} className=" text-slate-600 cursor-pointer"
                onClick={()=>toggleShowPassword()}
            />)
            :
            (
              <FaRegEyeSlash size={22} className=" text-slate-400 cursor-pointer"
                 onClick={()=>toggleShowPassword()}
              />
            )
           }
    </div>
  )
}

export default Password