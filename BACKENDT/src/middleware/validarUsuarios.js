import { body } from "express-validator";


export const validarUsuarios=[
    body('identificacion','Porfavor dijita datos validos')
   .isNumeric()
   .trim()
   .isLength({min:9}),
    body('nombre','Porfavor dijita datos validos')
    .isString()
    .trim(),
    body('email','Porfavor dijita datos validos')
    .isEmail()
    .trim(),
    body('password','Porfavor dijita datos validos')
    .isString(),
    body('password','El password debe tener como minimo 8 caracteres')
    .isLength({min:8})
]