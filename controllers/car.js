import Car from "../models/Car.js"
import Room from "../models/Room.js"

export const createCar = async (req, res, next) => {
    const newCar = new Car(req.body)

    try {
        const savedCar = await newCar.save()
        res.status(200).json(savedCar)
    } catch (error) {
        next(error)
    }
}

export const getCar = async (req, res, next) => {
    try {
        const car = await Car.findById(req.params.id)
        res.status(200).json(car)
    } catch (error) {
        next(error)
    }
}

export const getCars = async (req, res, next) => {
    const {min, max, ...others} = req.query
    try {
        const cars = await Car.find({...others, cheapestPrice: {$gte:min || 1, $lte: max || 9999}}).limit(req.query.limit)
        res.status(200).json(cars)
    } catch (error) {
        next(error)
    }
}

export const getCarRooms = async (req, res, next) => {
    try {
        const car = await Car.findById(req.params.id)
        const list = await Promise.all(car.rooms.map(room => {
            return Room.findById(room)
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}