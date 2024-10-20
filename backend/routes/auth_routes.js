import express from "express"
import { signup,signin,signout } from "../controller/auth_controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router= express.Router()

//here we only defining the routes for handling the http request from client (such as mobile device,web browser, other services) and send back the response from the server.

router.post('/signup',signup);
router.post("/signin",signin);
router.get("/signout",verifyToken,signout);

export default router;