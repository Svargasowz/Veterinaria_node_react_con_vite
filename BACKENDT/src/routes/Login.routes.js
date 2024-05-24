import {Router} from "express";
import {validationResultExpress} from "../middleware/validacion.js"
import { validarLoginUsuarios } from "../middleware/validacionToken.js";
import { registrarUsuario } from "../controllers/user.controller.js";
import {validar} from "../controllers/token.js"
import { validarUsuarios } from "../middleware/validarUsuarios.js";

const routerToken=Router()

routerToken.post("/login",validationResultExpress,validarLoginUsuarios,validar)
routerToken.post("/registrar",validarUsuarios,validationResultExpress,registrarUsuario)
export default routerToken;