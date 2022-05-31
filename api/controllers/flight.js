import Flight from "../models/Flight.js"
import Room from "../models/Room.js"

export const createFlight = async (req, res, next) => {
    const newFlight = new Flight(req.body)

    try {
        const savedFlight = await newFlight.save()
        res.status(200).json(savedFlight)
    } catch (error) {
        next(error)
    }
}

export const getFlight = async (req, res, next) => {
    try {
        const flight = await Flight.findById(req.params.id)
        res.status(200).json(flight)
    } catch (error) {
        next(error)
    }
}

export const getFlights = async (req, res, next) => {
    const {min, max, ...others} = req.query
    try {
        const flights = await Flight.find({...others, cheapestPrice: {$gte:min || 1, $lte: max || 9999}}).limit(req.query.limit)
        res.status(200).json(flights)
    } catch (error) {
        next(error)
    }
}

export const getFlightsRooms = async (req, res, next) => {
    try {
        const flight = await Flight.findById(req.params.id)
        const list = await Promise.all(flight.rooms.map(room => {
            return Room.findById(room)
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}