import bcryptjs from 'bcryptjs'

//INCRIPTAR
export const encrypt =async (textPplain)=>{
    const hash = await bcryptjs.hash(textPplain,10)
    return hash
}

//DESINCRIPTAR
export const comparacion=async (passwordPlain,hashPassword)=>{
    return await bcryptjs.compare(passwordPlain,hashPassword)
}
