
import { useContext, useState } from "react";
import {MdClose} from "react-icons/md";
import TagInput from "../Component/Input/TagInput";
import axios from "axios";
import { toast } from "react-toastify";
import { ThemeContext } from "../contexts/theme";

const AddEditNotes = ({onClose,noteData,type,getAllNotes}) => {

  const {theme} = useContext(ThemeContext);

    const [title,setTitle]=useState(noteData?.title || "");
    const [content,setContent]=useState(noteData?.content || "");
    const [tags,setTags]=useState(noteData?.tags || []);
    const [error,setError] = useState(null);

    //Edit Note
    const editNote = async ()=>{
      const noteId= noteData._id;

      try {
        const res = await axios.post("http://localhost:3000/api/note/edit/"+noteId,
         {title,content,tags},
         {withCredentials:true}
        )
        if(res.data.success === false)
        {
          console.log(res.data);
          toast.error(res.data.message)
          setError(res.data);
          return
        }

        toast.success(res.data.message)
        getAllNotes()
        onClose()

      } catch (error) {
        console.log(error.emssage);
        toast.error(error.message)
        setError(error)
      }
    }

    //Add Note
    const addNewNote=async()=>{
      try {
        const res= await axios.post("http://localhost:3000/api/note/add",
          {title,content,tags},
          {withCredentials:true}
        )

        if(res.data.success === false)
        {
          console.log(res.data.message);
          toast.failure(res.data.message)
          setError(res.data.message)
          return
        }

        toast.success(res.data.message)
        getAllNotes()
        onClose()
      } catch (error) {
        console.log(error.message);
        toast.error(error.message)
        setError(error)
      }
    }

    const handleAddNote=()=>{
      if(!title){
        setError("Please enter the title")
        return
      }

      if(!content)
      {
        setError("Please enter the content")
        return
      }

      setError("")

      if(type === 'edit')
      {
        editNote()
      }
      else
      {
        addNewNote()
      }
    }
  return (
    <div className={`border rounded p-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} relative`}>
      <button className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
      onClick={onClose}
      >
       <MdClose className="text-xl text-slate-400"/>
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label text-red-400 uppercase">Title</label>

        <input type="text" className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} border border-white rounded text-2xl  outline-none`}
            placeholder="Wake up at 6 a.m."
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
      <label className="input-label text-red-400 uppercase">Content</label>

      <textarea
      type="text"
      className={` ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} border border-white text-sm p-2 outline-none rounded`}
      placeholder="Content..."
      rows={10}
      value={content}
      onChange={({target})=>setContent(target.value)}
      />
        {/* text-slate-950  bg-slate-50 text-slate-950 */}
      </div>

     <div className="mt-3">
      <label className=" input-label text-red-400 uppercase">tags</label>
      <TagInput tags={tags} setTags={setTags}/>
     </div>

     {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

     <button className="btn-primary font-medium mt-5 p-3" 
     onClick={handleAddNote}
     >
      {type === "edit" ? "UPDATE":"ADD"}
     </button>
    </div>
  )
}

export default AddEditNotes