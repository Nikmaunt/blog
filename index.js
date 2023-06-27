import express from 'express'

import mongoose from "mongoose";


import checkAuth from "./utils/checkAuth.js";
import  * as UserController from './controlers/UserControler.js'
import  * as PostController from './controlers/PostController.js'
;
import {loginValidation, postCreateValidation, registerValidation} from "./validations.js";



const app = express();
mongoose.connect('mongodb+srv://nikmaunt:nik5230@cluster0.penctlt.mongodb.net/blog?retryWrites=true&w=majority').then(() => {
    console.log('DB ok')
}).catch((err) => console.log('DB ERROR'))


app.use(express.json())

app.get('/auth/me',checkAuth,UserController.getMe);
app.get('/posts',PostController.getAll);
app.get('/posts/:id',PostController.getOne);
app.post('/posts/',checkAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id',PostController.remove);
// app.patch('/posts',PostController.update);

app.post('/auth/login',loginValidation, UserController.login)

app.post('/auth/register', registerValidation,
    UserController.register)

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server Ok')
})