import {pool} from '../database/conexion.js'

export const listarCategorias=async(req,res)=>{
    try{
        const [categorias]=await pool.query("SELECT * FROM categorias")
        res.status(200).json(categorias)
    }
    catch(error){
        res.status(404).json({
            message:error.message
        })
    }
}