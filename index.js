import express from 'express'
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import registerValidation from "./validations/auth.js";
import {validationResult} from "express-validator";
import UserSchema from "./models/user.js";
import bcrypt, {hash} from "bcrypt";
import checkAuth from "./utils/checkAuth.js";
import  * as UserController from './controlers/UserControler'


const app = express();
mongoose.connect('mongodb+srv://nikmaunt:nik5230@cluster0.penctlt.mongodb.net/blog?retryWrites=true&w=majority').then(() => {
    console.log('DB ok')
}).catch((err) => console.log('DB ERROR'))


app.use(express.json())

app.get('/auth/me',checkAuth,UserController.getMe);

app.post('/auth/login',UserController.login)

app.post('/auth/register', registerValidation,
    UserController.register)

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server Ok')
})