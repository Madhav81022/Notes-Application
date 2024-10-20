import {FaMagnifyingGlass} from 'react-icons/fa6'
import {IoMdClose} from 'react-icons/io'
import { ThemeContext } from '../contexts/theme'
import { useContext } from 'react'

const SearchBar = ({value,onChange,handleSearch,onClearSearch}) => {

  const {theme} = useContext(ThemeContext);

  return (
    <div className={`border rounded ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} w-40 sm:w-60 md:w-80 flex items-center px-4 rounded-md`}>
      <input type="text" placeholder="Search Notes..." className=" w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
      />
      {value && (
        <IoMdClose className=' text-slate-500 text-xl cursor-pointer hover:text-black mr-3'
            onClick={onClearSearch}
        />
      )}
     

      <FaMagnifyingGlass className='text-slate-500 text-xl cursor-pointer hover:text-black mr-3' 
      onClick={handleSearch} />
    </div>

   
  )
}

export default SearchBar