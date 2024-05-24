import React from 'react'
import Fondo from '../img/baseAzul.png';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Volver from '../img/FlechaIzquierda.png';
import Cerrar from '../img/Cerrar.png';


const Editar = () => {
    const navigate = useNavigate();
    const volver = () => {
        navigate('/inicio');
      };
    
      const cerrarSesion = () => {
        Swal.fire({
          title: "¿Seguro que quieres cerrar sesión?",
          text: "Al cerrar sesión tendrás que volver a entrar",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Cerrar Sesión"
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.clear();
            navigate('/');
          } else {
            Swal.fire("Cancelado", "Decidiste no salir", "error");
          }
        });
      };
    
  return (
    <div
    className='flex flex-col items-center justify-center min-h-screen'
    style={{ backgroundImage: `url(${Fondo})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
     <div className="w-full max-w-md p-4 relative">
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 bg-transparent">
          <img
            src={Volver}
            className="cursor-pointer -mt-30"
            alt="volver"
            onClick={volver}
            style={{ position: 'absolute', left: '40px' }}
          />
          <h1 className="text-white font-arial text-2xl mx-auto -mt-30">
            Editar mascota
          </h1>
          <img
            src={Cerrar}
            className="cursor-pointer -mt-30"
            alt="cerrar"
            onClick={cerrarSesion}
            style={{ position: 'absolute', right: '30px' }}
          />
        </div>
</div>
   </div>
  )
}
export default Editar