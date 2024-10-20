import {useEffect, useState} from "react"
import NotesCard from "../Component/Cards/NotesCard"
import {MdAdd} from "react-icons/md"
import Modal from "react-modal"
import AddEditNotes from "./AddEditNotes"
import {useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import Navbar from "../Component/Navbar"
import axios from "axios"
import { toast } from "react-toastify"
import EmptyCard from "../Component/Cards/EmptyCard"
 import  { useContext } from 'react';
 import { ThemeContext } from "../contexts/theme"

const Home = () => {

   const { theme } = useContext(ThemeContext);

  const {currentUser,loading,errorDispatch }=useSelector(
    (state)=>state.user
  )

  const [userInfo,setUserInfo] = useState(null)
  const [allNotes,setAllNotes]=useState([]);

  const [isSearch,setIsSearch]=useState(false);

  const navigate= useNavigate()

  const [openAddEditModal,setOpenAddEditModel]=useState({
    isShown:false,
    type:"add",
    data:null,
  })

  useEffect(()=>{
    console.log(currentUser);
    if(currentUser===null || !currentUser)
    {
      navigate("/login")
    }
    else{
      setUserInfo(currentUser?.rest)
      getAllNotes();
      
    }
},[])

//get all notes -> To call api
const getAllNotes = async()=>{
  try{
    const res= await axios.get("http://localhost:3000/api/note/all",
      {withCredentials:true,}
    )
    
    if(res.data.success === false)
    {
      console.log(res.data);
      return
    }

    setAllNotes(res.data.notes);
    //setAllNotes((prev) => [...prev,...res.data.notes])
    console.log(res);

  }
  catch(error){
    console.log(error);
  }
}


const handleEdit=(noteDetails)=>{
  setOpenAddEditModel({isShown:true,data:noteDetails,type:"edit"})
}

//Delete note
const deleteNote = async(data) =>{
  const noteId = data._id

  try {
    const res= await axios.delete("http://localhost:3000/api/note/delete/" + noteId,
      {withCredentials:true}
    )

    if(res.data.success === false)
    {
      console.log(res.data.message)
      toast.error(res.data.message);
      return
    }

    toast.success(res.data.message)
    getAllNotes()
  } catch (error) {
    toast.error(error.message);
    console.log(error.message)
  }
}

const onSearchNote= async (query)=>{
  try {
    const res = await axios.get("http://localhost:3000/api/note/search",
      {params:{query},
    withCredentials:true,
    })

    if(res.data.success === false)
    {
      toast.error(res.data.message);
      console.log(res.data.message);
      return
    }

    setIsSearch(true)
    setAllNotes(res.data.notes);

  } catch (error) {
    toast.error(error.message)
  }
}

const handleClearSearch=()=>{
  setIsSearch(false)
   getAllNotes()
}

//UpdateIsPinned Note
const updateIsPinned = async(noteData)=>{
  const noteId = noteData._id;

  try {
    const res = await axios.put("http://localhost:3000/api/note/update-note-pinned/"+noteId,
      {isPinned: !noteData.isPinned},
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
  }
}

//Update favorite Note
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
  }
}

console.log(allNotes)
  return (
    <>
  <div className={`${theme ===  'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} min-h-screen`}>
    <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch}/> 
    <div className= "container mx-auto " >
     {allNotes.length>0 ? (
      <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 max-md:m-5">
        {allNotes.map((note,index)=>(
          <NotesCard
            key={note._id}
            title={note.title}
            date={note.createdAt}
            content={note.content}
            tags={note.tags}
            isPinned={note.isPinned}
            isFav={note.isFav}
            onEdit={()=>{
              handleEdit(note)
            }}
            onDelete={()=>{
               deleteNote(note)
            }}
            onPinNote={()=>{
               updateIsPinned(note)
            }}
            onFavNote={()=>{
                updateIsFav(note)
            }}
          />
        ))}
      </div>)
      : <EmptyCard imgSrc={isSearch ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDSS5FeaLtelZwa1H2RbgdzrnuUt_oJEP0XA&s"
      :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDCtZLuixBFGTqGKdWGLaSKiO3qyhW782aZA&s"} 

     message={isSearch ? "Oops! No Notes found matching your search":`Ready to capture your ideas? CLick the 'Add' button to start noting down your thoughts, inspiration and remembers. Let's get started!`}/>}
    </div>
    <button className=" w-16 h-16 flex items-center justify-center rounded-2xl bg-[#2B85FF] hover:bg-blue-600 absolute right-10 bottom-10"
    onClick={()=>{
      setOpenAddEditModel({isShown:true,type:"add",data:null })
    }}
    >
    <MdAdd className="text-[32px] text-white" />
    </button>
  
    <Modal
    isOpen={openAddEditModal.isShown}
    onRequestClose={()=>{}}
    style={
      {
        overlay:{
          backgroundColor:"rgba(0,0,0,0.2)",
        },
      }}
      contentLabel=""
      className=" w-[40%] max-md:w-[60%] max-sm:w-[70%] max-h-3/4  rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >

      <AddEditNotes 
        onClose={()=> setOpenAddEditModel({isShown:false,type:"add", data:null})}
        noteData={openAddEditModal.data}
        type={openAddEditModal.type}
        getAllNotes={getAllNotes}
      />
    </Modal>
    </div>
    </>
  )
}

export default Home
