import Router from 'express'
import {validationResultExpress} from "../middleware/validacion.js"
import { validarToken } from '../controllers/token.js'
import { listarGenero } from '../controllers/genero.controller.js'

const routerCategorias=Router()

routerCategorias.get("/listar",validarToken,validationResultExpress,listarGenero)

export default routerCategorias;
