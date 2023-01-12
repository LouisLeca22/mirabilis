import Room from "../models/Room.js"
import Hotel from "../models/Hotel.js"
import Flight from "../models/Flight.js"
import Car from "../models/Car.js"

export const createRoom = async (req, res, next) => {
    const ressourceId = req.params.ressourceId;
    const newRoom = new Room(req.body);
    console.log(ressourceId)
    try {
        const savedRoom = await newRoom.save()
        try {
            const hotel = await Hotel.findById(ressourceId)
            if(hotel){
                await Hotel.findByIdAndUpdate(ressourceId)
            }

            const flight = await Flight.findById(ressourceId)

            if(flight){
                await Flight.findByIdAndUpdate(ressourceId, {$push: {rooms: savedRoom._id}})
            }

            const car = await Car.findById(ressourceId)
            if (car){
                await Car.findByIdAndUpdate(ressourceId, {$push: {rooms: savedRoom._id}})
            }
         
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)
    }
}



export const updateRoom = async (req, res, next ) => {
    try {
        const updateRoom = await Room.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updateRoom)
    } catch (error) {
        next(error)
    }
}

export const updateAvailability = async (req, res, next ) => {
    try {
        await Room.updateOne({"roomNumbers._id": req.params.id}, {
            $push: {
                "roomNumbers.$.unavailableDates": req.body.dates
            }
        })
        res.status(200).json("tu reserva ha estado confirmada ")
    } catch (error) {
        next(error)
    }
}

export const deleteRoom = async (req, res, next) => {
    const ressourceId = req.params.ressourceId;
    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            const hotel = await Hotel.findById(ressourceId)
            if (hotel) {
                await Hotel.findByIdAndUpdate(ressourceId, {$pull: {rooms: req.params.id}})
            }

            const flight = await Flight.findById(ressourceId)
            if(flight){
                await Flight.findByIdAndUpdate(ressourceId, {$pull: {rooms: req.params.id}})
            }
          
            const car = await Car.findById(ressourceId)
            if(car){
                await Car.findByIdAndUpdate(ressourceId, {$pull: {rooms: req.params.id}})
            }
          

        } catch (error) {
            next(error)
        }
        res.status(200).json("Room has been deleted")
    } catch (error) {
        next(error)
    }
}

export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    } catch (error) {
        next(error)
    }
}

export const getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find()
        res.status(200).json(rooms)
    } catch (error) {
        next(error)
    }
}