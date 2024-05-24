    import {pool} from '../database/conexion.js'
    import { encrypt,comparacion } from '../helpers/Incriptar.js'

    export const registrarUsuario = async (req, res) => {
        try {
            
            const { identificacion, nombre, email, password } = req.body;
    
            // Encriptar la contraseña
            const passwordHash = await encrypt(password);
    
            // Insertar la contraseña encriptada en la base de datos
            const [usuario] = await pool.query("INSERT INTO usuarios(identificacion, nombre, email, password) VALUES (?, ?, ?, ?)", [identificacion, nombre, email, passwordHash]);
    
            if (usuario.affectedRows > 0) {
                res.status(200).json({
                    message: 'Usuario registrado con éxito'
                });
            } else {
                res.status(404).json({
                    message: 'Usuario no registrado'
                });
            }
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: 'Error del servidor ' + error
            });
        }
    };
    