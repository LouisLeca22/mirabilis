import bcrypt from "bcryptjs"
import User from "../models/User.js"
import {createError} from "../utils/error.js"
import jwt from "jsonwebtoken"

export const register = async  (req, res, next) => {
    
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)
       const newUser = new User({
           name: req.body.name,
           email: req.body.email,
           password: hashedPassword
       })      

       await newUser.save()
       res.status(200).json("¡El usuario ha sido creado!")
    } catch (error) {
        next(error)
    }
}


export const login = async  (req, res, next) => {
    
    try {
        const user = await User.findOne({name: req.body.name})
        if(!user) return next(createError(404, "Este usuario no existe o ha sido desactivado"))
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) return next(createError(400, "Se dieron credenciales erróneas (compruebe su identificación de usuario y contraseña)"))
        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET)
        const {password, isAdmin, ...other} = user._doc
       res.cookie("access_token", token, {httpOnly: true}).status(200).send({...other})
    } catch (error) {
        next(error)
    }
}