import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'tailwindcss/tailwind.css';
import IniciarSesion from './views/LoginInicio.jsx';
import DentroInicio from "./views/Listar.jsx";
import Registrar from "../src/views/Registrar.jsx";
import SeguridadRuta from "./security/ProtectorRutas.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IniciarSesion />} />
        <Route element={<SeguridadRuta />}>
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/inicio" element={<DentroInicio />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
