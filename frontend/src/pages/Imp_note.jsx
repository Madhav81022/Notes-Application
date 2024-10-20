import Navbar from "../Component/Navbar"
import { useSelector } from "react-redux"
import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import NotesCard from "../Component/Cards/NotesCard"
import { toast } from "react-toastify"
import { ThemeContext } from "../contexts/theme"
import { useContext } from "react"
const Imp_note = () => {

  const {theme} = useContext(ThemeContext);
    const {currentUser,loading,errorDispatch }=useSelector(
        (state)=>state.user
      )
    
      const [userInfo,setUserInfo] = useState(null)
      const [allNotes,setAllNotes]=useState([]);
     // const [isFav,setIsFav]=useState(false);

     const navigate =useNavigate()

      useEffect(()=>{
        //console.log(currentUser);
        if(currentUser===null || !currentUser)
        {
          navigate("/login")
        }
        else{
          setUserInfo(currentUser?.rest)
          getAllNotes();
          
        }
    },[])

     // console.log(allNotes);

     const updateIsFav = async(noteData)=>{
        const noteId = noteData._id;
      
        try {
          const res = await axios.put("http://localhost:3000/api/note/fav-note/"+noteId,
            {isFav: !noteData.isFav},
            {withCredentials:true}
          )
          
          if(res.data.success === false)
          {
            toast.error(res.data.message)
            console.log(res.data.message);
            return
          }
      
         toast.success(res.data.message)
         getAllNotes()
        } catch (error) {
          console.log(error.message);
          toast.error(error.message);
        }
      }

      
    const getAllNotes = async()=>{
        try{
          const res= await axios.get("http://localhost:3000/api/note/fav-notes",
            {withCredentials:true,}
          )
          
          if(res.data.success === false)
          {
            toast.error(res.data.message)
            return
          }
          //console.log(res);
          
          setAllNotes((prev) => [...prev,...res.data.note]);

          //console.log("Favorite notes fetched: ",res.data.notes)
        }
        catch(error){
           
          console.log(error);
        }
      }


//console.log(allNotes);

  return (
    <div className={`${theme ===  'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} min-h-screen`}>
 <Navbar userInfo={userInfo} />

   {allNotes.length > 0 ? (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 max-md:m-5">
        {allNotes.map((note) => (
          <NotesCard
            key={note._id}
            title={note.title}
            date={note.createdAt}
            content={note.content}
            tags={note.tags}
            isPinned={note.isPinned}
            isFav={note.isFav}
            onPinNote={() => {/* Handle pinning if needed */}}
             onFavNote={() => updateIsFav(note)}
          />
        ))}
        </div>
      ) : (
        <p>No favorite notes found.</p>
      )} 
      
    </div>
   
  )
}

export default Imp_note