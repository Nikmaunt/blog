import {body} from "express-validator";


export const loginValidation = [
    body('email','wrong Email').isEmail(),
    body('password', 'min 5 symbols').isLength({min:5})
];

export const registerValidation = [
    body('email','wrong Email').isEmail(),
    body('password', 'min 5 symbols').isLength({min:5}),
    body('fullName','enter your name').isLength({min:3}),
    body('avatarUrl','wrong link').optional().isURL(),
];

export const postCreateValidation = [
    body('title','Enter post title').isLength({min:3}),
    body('text', 'Enter text').isLength({min:3}),
    body('tags','Wrong format(must be array)').optional().isString(),
    body('imageUrl','wrong link').optional().isString(),
];



