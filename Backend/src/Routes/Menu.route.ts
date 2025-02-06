import express from "express"

import { addMenuItem, deleteMenuItem, getMenuItems, updateMenu } from "../Controller/Menu.controller";
import { authenticatedUser } from "../utils/Authentication";



const router = express.Router();

router.get("/menu",authenticatedUser,getMenuItems);
router.post("/menu",authenticatedUser,addMenuItem);
router.put(`/menu/:id`,authenticatedUser,updateMenu);
router.delete(`/menu/:id`,authenticatedUser,deleteMenuItem)


export default router;