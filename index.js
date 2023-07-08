import express from 'express'
import mongoose from "mongoose";

import {PostController, UserController}  from './controlers/index.js'
import {loginValidation, postCreateValidation, registerValidation} from "./validations.js";
import multer from "multer";

import {handleValidationErrors, checkAuth} from './utils/index.js';
import cors from "cors";

const app = express();
mongoose.connect('mongodb+srv://nikmaunt:nik5230@cluster0.penctlt.mongodb.net/blog?retryWrites=true&w=majority').then(() => {
    console.log('DB ok')
}).catch((err) => console.log('DB ERROR'))


app.use(express.json())
app.use(cors())

app.use('/uploads',express.static('uploads'))

const storage = multer.diskStorage({
    destination:(_,__, cb, ) => {
        cb(null, 'uploads')
    },
    filename: (_,file, cb) => {
        cb(null, file.originalname)
    },
});

const upload = multer({storage})
app.post('/upload',upload.single('image'), (req,res)=> {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
});


app.get('/auth/me',checkAuth,UserController.getMe);
app.get('/posts',PostController.getAll);
app.get('/tags',PostController.getLastTags);
app.get('/posts/tags',PostController.getLastTags);
app.get('/posts/:id',PostController.getOne);
app.post('/posts/',checkAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id',PostController.remove);
app.patch('/posts/:id',checkAuth,postCreateValidation, PostController.update);

app.post('/auth/login',loginValidation, handleValidationErrors,UserController.login)

app.post('/auth/register', registerValidation, handleValidationErrors,
    UserController.register)

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server Ok')
})