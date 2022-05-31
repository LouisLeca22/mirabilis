import express from "express"
import {createCar, getCar, getCars, getCarRooms} from "../controllers/car.js"
const router = express.Router()
import { verifyAdmin } from "../utils/verifyToken.js"


router.post("/", verifyAdmin, createCar)  

router.get("/find/:id", getCar)  

router.get("/", getCars)  

router.get("/rooms/:id", getCarRooms)


export default router