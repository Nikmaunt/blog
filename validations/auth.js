import {body} from "express-validator";


const registerValidation = [
    body('email','wrong Email').isEmail(),
    body('password', 'min 5 symbols').isLength({min:5}),
    body('fullName','enter your name').isLength({min:3}),
    body('avatarUrl','wrong link').optional().isURL(),
];

export default registerValidation