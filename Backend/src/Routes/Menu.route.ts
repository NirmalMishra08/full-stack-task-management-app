import express from "express"

import { addMenuItem, getMenuItems } from "../Controller/Menu.controller";
import { authenticatedUser } from "../utils/Authentication";



const router = express.Router();

router.post("/getMenu",authenticatedUser,getMenuItems);
router.post("/addMenu",authenticatedUser,addMenuItem)


export default router;