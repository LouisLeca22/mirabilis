import express from "express"
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotels, updateHotel, getHotelRooms } from "../controllers/hotel.js"
const router = express.Router()
import { verifyAdmin } from "../utils/verifyToken.js"


router.post("/", verifyAdmin, createHotel)  

router.put("/:id", verifyAdmin, updateHotel)  

router.delete("/:id", verifyAdmin, deleteHotel)  

router.get("/find/:id", getHotel)  

router.get("/", getHotels)  
router.get("/countByCity", countByCity )
router.get("/countByType", countByType )
router.get("/rooms/:id", getHotelRooms)


export default router