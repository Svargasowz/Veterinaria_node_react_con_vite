import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cerrar from '../img/Cerrar.png';
import Eliminar from '../img/Eliminar.png';
import Adicionar from '../img/Adicionar.png';
import Fondo from '../img/baseAzul.png';

const DentroInicio = () => {
  const navigate = useNavigate();
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    const MascotasMostrar = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get('http://localhost:3000/mascotas/listar', {
          headers: {
            'token': token
          }
        });

        console.log('Respuesta de la API:', response.data);

        if (response.data && Array.isArray(response.data.mascotas)) {
          setMascotas(response.data.mascotas);
          console.log('Mascotas:', response.data.mascotas);
        } else {
          console.error('La respuesta de la API no es un array:', response.data);
          Swal.fire({
            icon: 'error',
            title: 'Error al obtener los datos',
            text: 'La respuesta de la API no es válida',
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
    MascotasMostrar();
  }, []);

  const eliminarMascota = async (codigo) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/mascotas/eliminar/${codigo}`, {
        headers: {
          'token': token
        }
      });

      setMascotas(mascotas.filter(mascota => mascota.codigo !== codigo));

      Swal.fire({
        icon: 'success',
        title: 'Mascota eliminada',
        text: 'La mascota ha sido eliminada exitosamente',
      });
    } catch (error) {
      console.error('Error al eliminar la mascota:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar la mascota',
        text: error.response?.data?.message || 'Error desconocido',
      });
    }
  };

  const cerrarSesion = () => {
    Swal.fire({
      title: "Seguro que quieres cerrar sesión",
      text: "Al cerrar sesión tendrás que volver a entrar",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cerrar Sesión"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        window.location.href = '/';
      } else {
        Swal.fire("Cancelled", "Decidiste no salir", "error");
      }
    });
  };

  const navegarRegistrar = () => {
    navigate('/registrar');
  };

  return (
    <div
      className='flex flex-col items-center justify-center min-h-screen'
      style={{ backgroundImage: `url(${Fondo})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      <div className="w-full max-w-md p-4 relative">
        {/* Parte de arriba */}
        <div className="absolute -mt-50 left-0 right-0 flex justify-between items-center p-4 bg-transparent">
          <h1 className="text-white font-arial text-2xl -mt-20 ml-24">
            Administrar mascotas
          </h1>
          <img
            src={Cerrar}
            className="cursor-pointer mr-8 -mt-20"
            alt="cerrar"
            onClick={cerrarSesion}
          />
        </div>

        <div className="absolute top-16 left-4 flex justify-between items-center -mt-8">
          <img
            src={Adicionar}
            className="cursor-pointer ml-7"
            alt="adicionar"
            onClick={navegarRegistrar}
          />
        </div>

        <div className='flex flex-col items-center overflow-y-auto ' style={{ maxHeight: '500px', marginTop: '100px',borderRadius:'30px' }}>
          {Array.isArray(mascotas) && mascotas.length === 0 ? (
            <p className="text-white">No hay mascotas disponibles.</p>
          ) : (
            mascotas.map((mascota, index) => (
              <div key={index} className='rounded-lg bg-gray-300 m-2 p-2 flex' style={{ width: '350px', minHeight: '100px',marginLeft:'20px'}}>
                <div className="flex-shrink-0">
                  {mascota.foto && (
                    <img
                      src={`http://localhost:3000/img/${mascota.foto}`}
                      className="w-20 h-20 rounded-full object-cover"
                      alt={`Foto de ${mascota.nombre_mascota}`}
                    />
                  )}
                </div>
                <div className="flex flex-col justify-center ml-4">
                  <h2 className="text-center font-bold mb-2">{mascota.nombre_mascota}</h2>
                  <p className="text-center">Raza: {mascota.raza}</p>
                </div>
                <img
                  src={Eliminar}
                  className="cursor-pointer w-6 h-6 ml-auto"
                  alt="Eliminar"
                  onClick={() => eliminarMascota(mascota.codigo)}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DentroInicio;
