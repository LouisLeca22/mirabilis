import express from "express"
import {createFlight, getFlight, getFlights, getFlightsRooms} from "../controllers/flight.js"
const router = express.Router()
import { verifyAdmin } from "../utils/verifyToken.js"


router.post("/", verifyAdmin, createFlight)  

router.get("/find/:id", getFlight)  

router.get("/", getFlights)  

router.get("/rooms/:id", getFlightsRooms)


export default router