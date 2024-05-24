import {body} from 'express-validator'

export const validarLoginUsuarios=[
    body('email','Porfavor dijita datos validos')
    .isNumeric()
    .trim(),
    body('password','Porfavor dijita datos validos')
    .isString(),
    body('password','El password debe tener como minimo 8 caracteres')
    .isLength({min:8})
    .trim()
]