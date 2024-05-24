import Router from 'express'
import {validationResultExpress} from '../middleware/validacion.js'
import { validarToken } from '../controllers/token.js'
import { listarMascotas,registrarMascotas,eliminarMascotas,buscarMascotas,actualizarMascotas } from '../controllers/mascotas.controller.js'
import {validarRegistroMascotas} from '../middleware/validarMascotas.js'
import {cargarImagen} from '../controllers/mascotas.controller.js'
const routerMascostas=Router()

routerMascostas.get("/listar",validarToken,validationResultExpress,listarMascotas)
routerMascostas.post("/registrar",validarToken,cargarImagen,validarRegistroMascotas,validationResultExpress,registrarMascotas)
routerMascostas.delete("/eliminar/:codigo",validarToken,validationResultExpress,eliminarMascotas)
routerMascostas.get("/buscar/:codigo",validarToken,validationResultExpress,buscarMascotas)
routerMascostas.put("/actualizar/:codigo",validarToken,cargarImagen,validationResultExpress,actualizarMascotas)
export default routerMascostas;