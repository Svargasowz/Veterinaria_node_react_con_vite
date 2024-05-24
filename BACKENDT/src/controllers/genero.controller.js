import {pool} from '../database/conexion.js'

export const listarGenero=async (req,res)=>{
    try {
        const [genero]=await pool.query("SELECT * FROM genero")
        res.json(genero)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}