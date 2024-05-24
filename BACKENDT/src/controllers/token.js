import { pool } from '../database/conexion.js';
import jwt from "jsonwebtoken";
import { comparacion } from '../helpers/Incriptar.js';

export const validar = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Esto sirve para buscar el usuario en la base de datos
        const [user] = await pool.query("SELECT identificacion, nombre, email, password FROM usuarios WHERE email = ?", [email]);

        if (user.length > 0) {
            //y esto para comparar la contraseña ingresada con la que tenemos registrar
            if (await comparacion(password, user[0].password)) {
                //Generar el token
                const token = jwt.sign({ user: user[0] }, process.env.AUT_SECRET, { expiresIn: process.env.AUT_EXPIRE });
                return res.status(200).json({ user: user[0], token: token });
            } else {
                return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
            }
        } else {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error del servidor ' + error });
    }
};



export const validarToken = async (req, res, next) => {
    try {
        let tokenUsers = req.headers['token'];
        if (!tokenUsers) {
            return res.status(400).json({
                message: 'Token es requerido'
            });
        } else {
            jwt.verify(tokenUsers, process.env.AUT_SECRET, (error, decoded) => {
                if (error) {
                    return res.status(401).json({
                        message: 'Token inválido o expirado'
                    });
                } else {
                    req.user = decoded;  // Puedes agregar información del token decodificado al request si lo necesitas
                    next();
                }
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error del servidor: ' + error.message
        });
    }
};
