import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Fondo from '../img/baseAzul.png';'react'

const busqueda = () => {
const navigate = useNavigate();
  const [mascotas, setMascotas] = useState([]);

  //! IMPORTANTE 
  const [conteoRazas, setConteoRazas] = useState({});
  //! IMPORTANTE

  //! IMPORTANTE
  const [showModal, setShowModal] = useState(false);
  //! IMPORTANTE 

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





          //!IMPORTANTE
          contarRazas(response.data.mascotas);
          //!IMPORTANTE


          
        //!IMPORTANTE
        const contarRazas = (mascotas) => {
            const conteo = {};
            mascotas.forEach(mascota => {
            const raza = mascota.raza;
            conteo[raza] = (conteo[raza] || 0) + 1;
            });
            setConteoRazas(conteo);
        };
        //!IMPORTANTE


         //!IMPORTANTE





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
                
                <h2 className="text-xl mb-4">Conteo de Razas:</h2>
              <ul>
                {Object.entries(conteoRazas).map(([raza, cantidad]) => (
                  <li key={raza}>{raza}: {cantidad}</li>
                ))}
              </ul>

               
            </div>
        </div>
    );
};

export default busqueda