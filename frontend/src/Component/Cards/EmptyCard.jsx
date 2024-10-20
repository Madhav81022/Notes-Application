import { ThemeContext } from "../../contexts/theme"
import { useContext } from "react"

const EmptyCard = ({imgSrc,message}) => {

  const {theme} = useContext(ThemeContext);

  return (
    <div className={`${theme ===  'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} flex flex-col items-center justify-center mt-20`}>
     <img src={imgSrc} alt="No notes" className="w-60"/>

     <p className=" w-1/2 text-sm font-medium  text-center leading-7 mt-5">
     {message}
     </p>
    </div>
  )
}

export default EmptyCard