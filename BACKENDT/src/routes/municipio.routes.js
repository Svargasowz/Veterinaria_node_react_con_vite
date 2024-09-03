import Router from 'express'
import {validationResultExpress} from "../middleware/validacion.js"
import { validarToken } from '../controllers/token.js'
import { listarMunicipio } from '../controllers/municipio.controller.js'

const routerMascostas=Router()

routerMascostas.get("/listar",validarToken,validationResultExpress,listarMunicipio)

export default routerMascostas;
