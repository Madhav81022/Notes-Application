import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Imp_note from "./pages/Imp_note";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  ThemeProvider  from './contexts/theme'; // Import ThemeProvider
//import './App.css';



export default function App() {


  return (
    <>
      {/* Here setup for Browser Ruotes for move or iterate one pages to another */}
      <ThemeProvider>
      {/* <div className=" dark:bg-gray-900 dark:text-white"> */}
      <BrowserRouter>
           {/* Navbar is common for all the pages of routes such as home,login,signup */}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/imp_note" element={<Imp_note/>}/>
        </Routes>
        
        <ToastContainer position="top-center"/>
      </BrowserRouter>
      {/* </div> */}
      </ThemeProvider>
    </>
  )
}
