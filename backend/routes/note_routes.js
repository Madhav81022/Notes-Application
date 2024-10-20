import express from "express"
import {verifyToken} from "../utils/verifyUser.js"
import { addNote } from "../controller/note_controller.js";
import { editNote } from "../controller/note_controller.js";
import { getAllNotes } from "../controller/note_controller.js";
import { deleteNote } from "../controller/note_controller.js";
import { updateNotePinned } from "../controller/note_controller.js";
import { searchNote } from "../controller/note_controller.js";
import { updatefavNote } from "../controller/note_controller.js";
import { favNotes } from "../controller/note_controller.js";

const router= express.Router()

//here we only defining the routes for handling the http request from client (such as mobile device,web browser, other services) and send back the response from the server.

router.post("/add",verifyToken,addNote);
router.post("/edit/:noteId",verifyToken,editNote);
router.get("/all",verifyToken,getAllNotes);
router.delete("/delete/:noteId",verifyToken,deleteNote);
router.put("/update-note-pinned/:noteId",verifyToken,updateNotePinned);
router.get("/search",verifyToken,searchNote);
router.put("/fav-note/:noteId",verifyToken,updatefavNote);
router.get("/fav-notes",verifyToken,favNotes);
export default router;