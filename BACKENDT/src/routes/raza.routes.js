import Router from 'express'
import {validationResultExpress} from "../middleware/validacion.js"
import { validarToken } from '../controllers/token.js'
import { listarRaza } from '../controllers/raza.controller.js'

const routerMascostas=Router()

routerMascostas.get("/listar",validarToken,validationResultExpress,listarRaza)

export default routerMascostas;
