import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Volver from '../img/FlechaIzquierda.png';
import Cerrar from '../img/Cerrar.png';
import Fondo from '../img/baseAzul.png';


const BuscarMascota = () => {
  const navigate = useNavigate();

  const [mascota, setMascota] = useState(null);
  const { codigo } = useParams();

 
  //!BUSCAR_MASCOTAS
    const buscarMascota = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:3000/mascotas/buscar/${codigo}`, {
          headers: {
            'token': token
          }
        });

        if (response.status === 200) {
          setMascota(response.data.mascotas[0]);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al obtener los datos',
            text: 'No se encontró la mascota especificada',
          });
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener los datos',
          text: error.response?.data?.message || 'Error desconocido',
        });
      }
    };

    useEffect(()=>{
      buscarMascota();
    }, [codigo]);
    //!FIN_BUSCAR_MASCOTAS

  const volver = () => {
    navigate('/inicio');
  };

  //!CERRAR_SECION
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
            Buscar mascota
          </h1>
          <img
            src={Cerrar}
            className="cursor-pointer -mt-30"
            alt="cerrar"
            onClick={cerrarSesion}
            style={{ position: 'absolute', right: '30px' }}
          />
        </div>

        <div className='flex flex-col items-center -mt-30'>
          {mascota ? (
            <div className='rounded-lg p-4 flex flex-col items-center'>
              <div
              style={{ marginBottom: '50px' }}

              className="w-32 h-32 rounded-full overflow-hidden mt-28">
                {mascota.foto && (
                  <img
                    src={`http://localhost:3000/img/${mascota.foto}`}
                    className="w-full h-full object-cover"
                    alt={`Foto de ${mascota.nombre_mascota}`}
                  />
                )}
              </div>
              <div className="bg-gray-400 w-80 p-2 mb-2 rounded mt-3">
                <div className="flex justify-between bg-gray-400 p-2 rounded">
                  <span className="font-bold">Nombre:</span> 
                  <span
                   style={{ maxWidth: '47%', minWidth: '47%',textAlign: 'center' }}
                  className="bg-gray-300 p-4 rounded absolute ml-24 -mt-4 ">{mascota.nombre_mascota}</span>
                </div>
              </div>
              <div className="bg-gray-400 w-80 p-2 mb-2 rounded mt-3">
                <div className="flex justify-between bg-gray-400 p-2 rounded">
                  <span className="font-bold">Raza:</span> 
                  <span
                   style={{ maxWidth: '47%', minWidth: '47%',textAlign: 'center' }}
                  className="bg-gray-300 p-4 rounded absolute ml-24 -mt-4 ">{mascota.raza}</span>
                </div>
              </div>
              <div className="bg-gray-400 w-80 p-2 mb-2 rounded mt-3">
                <div className="flex justify-between bg-gray-400 p-2 rounded">
                  <span className="font-bold">Categoría:</span> 
                  <span
                   style={{ maxWidth: '47%', minWidth: '47%',textAlign: 'center' }}
                  className="bg-gray-300 p-4 rounded absolute ml-24 -mt-4 ">{mascota.categoria}</span>
                </div>
              </div>
              <div className="bg-gray-400 w-80 p-2 mb-2 rounded mt-3">
                <div className="flex justify-between bg-gray-400 p-2 rounded">
                  <span className="font-bold">Género:</span> 
                  <span
                   style={{ maxWidth: '47%', minWidth: '47%',textAlign: 'center' }}
                  className="bg-gray-300 p-4 rounded absolute ml-24 -mt-4">{mascota.genero}</span>
                </div>

                <div className="flex justify-between bg-gray-400 p-2 rounded mt-6">
                  <span className="font-bold">Municipio:</span> 
                  <span
                   style={{ maxWidth: '47%', minWidth: '47%',textAlign: 'center' }}
                  className="bg-gray-300 p-4 rounded absolute ml-24 -mt-4">{mascota.municipio}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-white">Cargando datos de la mascota</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuscarMascota;
