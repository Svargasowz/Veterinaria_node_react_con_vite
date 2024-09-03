import { pool } from '../database/conexion.js';

import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});


const upload = multer({ storage: storage });

export const cargarImagen = upload.single('foto');


export const registrarMascotas = async (req, res) => {
    try {
        const { nombre,raza_codigo, categoria_codigo, genero_codigo,municipio_codigo } = req.body;

        const foto = req.file.originalname;

        const [mascotas] = await pool.query("INSERT INTO mascotas (nombre,raza_codigo, categoria_codigo, foto, genero_codigo,municipio_codigo) VALUES (?,?,?,?,?,?)", [nombre,raza_codigo, categoria_codigo, foto, genero_codigo,municipio_codigo]);

        if (mascotas.affectedRows > 0) {
            res.status(200).json({
                message: 'Mascota registrada con éxito'
            });
        } else {
            res.status(404).json({
                message: 'No fue posible registrar la mascota'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor: ' + error.message
        });
    }
};

export const listarMascotas = async (req, res) => {
    try {
        const [mascotas] = await pool.query(`
            SELECT m.codigo, m.nombre AS nombre_mascota, r.nombre AS raza, c.nombre AS categoria, m.foto, g.nombre AS genero, l.nombre AS municipio
            FROM mascotas m
            JOIN raza r ON m.raza_codigo = r.codigo
            JOIN categorias c ON m.categoria_codigo = c.codigo
            JOIN genero g ON m.genero_codigo = g.codigo
            JOIN municipio l ON m.municipio_codigo = l.codigo
           
        `);

        if (mascotas.length > 0) {
            res.status(200).json({ mascotas });
        } else {
            res.status(404).json({ message: 'No hay mascotas registradas' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el sistema: ' + error });
    }
};


export const eliminarMascotas = async (req, res) => {
    try {
        const { codigo } = req.params;
        const [mascotas] = await pool.query("DELETE FROM mascotas WHERE codigo=?", [codigo]);

        if (mascotas.affectedRows > 0) {
            res.status(200).json({
                message: 'Mascota eliminada con éxito'
            });
        } else {
            res.status(404).json({
                message: 'No fue posible eliminar la mascota'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor: ' + error
        });
    }
};

export const buscarMascotas = async (req, res) => {
    try {
        const { codigo } = req.params;
        const [mascotas] = await pool.query(`
             SELECT m.codigo, m.nombre AS nombre_mascota, r.nombre AS raza, c.nombre AS categoria, m.foto, g.nombre AS genero, l.nombre AS municipio
            FROM mascotas m
            JOIN raza r ON m.raza_codigo = r.codigo
            JOIN categorias c ON m.categoria_codigo = c.codigo
            JOIN genero g ON m.genero_codigo = g.codigo
            JOIN municipio l ON m.municipio_codigo = l.codigo
            WHERE m.codigo=?
        `, [codigo]);

        if (mascotas.length > 0) {
            res.status(200).json({ mascotas });
        } else {
            res.status(404).json({ message: 'No hay ninguna mascota con ese código' });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor: ' + error
        });
    }
};


export const actualizarMascotas = async (req, res) => {
    try {
        const { codigo } = req.params;
        const { nombre,raza_codigo, categoria_codigo, genero_codigo,municipio_codigo } = req.body;

        let foto = req.file ? req.file.originalname : null;

        const [mascotas] = await pool.query('UPDATE mascotas SET nombre=IFNULL(?,nombre),raza_codigo=IFNULL(?,raza_codigo),categoria_codigo=IFNULL(?,categoria_codigo),foto=IFNULL(?,foto),genero_codigo=IFNULL(?,genero_codigo),municipio_codigo=IFNULL(?,municipio_codigo) WHERE codigo=?', [nombre,raza_codigo, categoria_codigo, foto, genero_codigo,municipio_codigo, codigo]);

        if (mascotas.affectedRows > 0) {
            res.status(200).json({
                message: 'Mascota actualizada con éxito'
            });
        } else {
            res.status(404).json({
                message: 'No fue posible actualizar la mascota'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor: ' + error.message
        });
    }
};
