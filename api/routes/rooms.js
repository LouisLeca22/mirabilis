import express from "express"
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateAvailability} from "../controllers/room.js"
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js"
const router = express.Router()

router.post("/:ressourceId", verifyAdmin, createRoom)  

router.put("/:id", verifyAdmin, updateRoom)  
router.put("/availability/:id", updateAvailability)

router.delete("/:id/:ressourceId", verifyAdmin, deleteRoom)  

router.get("/:id", getRoom)  

router.get("/", getRooms)  



export default router