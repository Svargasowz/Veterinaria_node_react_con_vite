import {pool} from '../database/conexion.js'

export const listarMunicipio = async (req,res)=>{
    try {
        const [raza] = await pool.query("SELECT * FROM municipio")
        res.status(200).json(raza)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }
}
export const agrupar = async (req, res)=>{
    try{

    }catch{
        
    }

}