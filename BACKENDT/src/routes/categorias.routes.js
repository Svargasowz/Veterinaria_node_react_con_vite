import Router from 'express'
import {validationResultExpress} from "../middleware/validacion.js"
import { validarToken } from '../controllers/token.js'
import { listarCategorias } from '../controllers/categoria.controller.js'

const routerCategorias=Router()

routerCategorias.get("/listar",validarToken,validationResultExpress,listarCategorias)

export default routerCategorias;
