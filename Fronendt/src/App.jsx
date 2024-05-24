import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'tailwindcss/tailwind.css';
import IniciarSesion from './views/LoginInicio.jsx';
import DentroInicio from "./views/Listar.jsx";
import Registrar from "../src/views/Registrar.jsx";
import SeguridadRuta from "./security/ProtectorRutas.jsx";
import BuscarMascota from "./views/BuscarMascota.jsx";
import Editar from "./views/Editar.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IniciarSesion />} />
        <Route element={<SeguridadRuta />}>
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/inicio" element={<DentroInicio />} />
          <Route path="/buscar/:codigo" element={<BuscarMascota />} />
          <Route path="/editar/:codigo" element={<Editar/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
