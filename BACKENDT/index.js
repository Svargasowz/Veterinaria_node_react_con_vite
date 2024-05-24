import express from 'express';
import cors from 'cors'
import raza from './src/routes/raza.routes.js'
import categorias from './src/routes/categorias.routes.js'
import genero from './src/routes/genero.routes.js'
import login from './src/routes/Login.routes.js'
import mascotas from './src/routes/mascotas.routes.js'

const app = express();
const port =3000
app.use(express.json());
app.use(cors());
app.use("/validar",login)
app.use("/mascotas",mascotas)
app.use("/raza",raza)
app.use("/categorias",categorias)
app.use("/genero",genero)



app.use(express.static('./public'))
app.use("/document",(req,res)=>{
    res.render('document.ejs')
})

app.listen(port,()=>{
console.log('Server funcionando a toda marcha🚂🚂')
})