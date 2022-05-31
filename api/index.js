import express from "express"
import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import usersRoute from "./routes/users.js"
import flightsRoute from "./routes/flights.js"
import carsRoute from "./routes/cars.js"
import cookieParser from "cookie-parser"
import "path"

const port = process.env.PORT || 8800


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("mongodb connected")
    } catch (error) {
       throw error
    }
}


const app = express()

app.use(cookieParser())
app.use(express.json())


app.use("/api/auth", authRoute)
app.use("/api/rooms", roomsRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/flights", flightsRoute)
app.use("/api/cars", carsRoute)


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500 
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
    )
  } else {
    app.get('/', (req, res) => res.send('Please set to production'))
  }

app.listen(port, () => {
    connectDB()
    console.log("connected to backend")
})