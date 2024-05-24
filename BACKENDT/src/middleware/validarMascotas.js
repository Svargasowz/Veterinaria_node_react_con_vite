import { body } from "express-validator";


export const validarRegistroMascotas=[
    body('raza_codigo','Porfavor dijita datos validos')
   .isNumeric()
   .trim(),
    body('categoria_codigo','Porfavor dijita datos validos')
    .isNumeric()
    .trim(),
    body('genero_codigo','Porfavor dijita datos validos')
    .isNumeric()
    .trim()
]