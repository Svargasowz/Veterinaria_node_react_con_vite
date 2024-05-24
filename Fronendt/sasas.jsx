import React, { useState } from 'react';
import axios from 'axios';
import Fondo from '../img/baseAzul.png';
import Volver from '../img/FlechaIzquierda.png';
import Cerrar from '../img/Cerrar.png';
import CamaraMostrar from '../img/CamaraInsertar.png';
import Swal from 'sweetalert2';

const Registrar = () => {
  const [nombre, setNombre] = useState('');
  const [razaCodigo, setRazaCodigo] = useState('');
  const [categoriaCodigo, setCategoriaCodigo] = useState('');
  const [generoCodigo, setGeneroCodigo] = useState('');
  const [foto, setFoto] = useState(null);

  const volver = () => {
    window.location.href = '/inicio';
  };

  const cerrarSesion = () => {
    Swal.fire({
      title: "Seguro que quieres cerrar sesion",
      text: "Al cerrar sesion tendras que volver a entrar",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cerrar Sesion"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        window.location.href = '/';
      }else{
        Swal.fire("Cancelled", "Decidiste no salir", "error");
      }
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
    }
  };

  const RegistrarMascota = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('raza_codigo', razaCodigo);
    formData.append('categoria_codigo', categoriaCodigo);
    formData.append('genero_codigo', generoCodigo);
    formData.append('foto', foto);

    try {
      const response = await axios.post('http://localhost:3000/mascotas/registrar', formData);

      if (response.status === 200) {
        Swal.fire('Éxito', response.data.message, 'success');
      } else {
        Swal.fire('Error', response.data.message, 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Hubo un error en el servidor', 'error');
      console.error('Error:', error);
    }
  };

  return (
    <div
      className='flex flex-col items-center justify-center min-h-screen'
      style={{ backgroundImage: `url(${Fondo})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      <div className="w-full max-w-md p-4">
        <div className="relative w-full flex justify-between items-center mb-4">
          <img
            src={Volver}
            className="cursor-pointer"
            alt="volver"
            onClick={volver}
            style={{ position: 'absolute', left: '0px' }}
          />
          <h1 className="text-white font-arial text-2xl mx-auto">
            Adicionar mascotas
          </h1>
          <img
            src={Cerrar}
            className="cursor-pointer"
            alt="cerrar"
            onClick={cerrarSesion}
            style={{ position: 'absolute', right: '0px' }}
          />
        </div>

        <form onSubmit={RegistrarMascota}>
          <div className="rounded-lg p-6 shadow-lg">
            <div className="flex justify-center mb-4">
              <label htmlFor="subirFoto">
                <img
                  src={foto ? URL.createObjectURL(foto) : CamaraMostrar}
                  alt="subir foto"
                  className="w-26 h-26 rounded-full p-4 cursor-pointer"
                />
              </label>
              <input
                type="file"
                id="subirFoto"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="mb-4 p-3 w-full rounded-full bg-gray-300 text-blue-900 placeholder-gray-300"
            />
            <select
              value={razaCodigo}
              onChange={(e) => setRazaCodigo(e.target.value)}
              className="mb-4 p-3 w-full rounded-full bg-gray-300 text-blue-900 placeholder-gray-300"
            >
              <option value="" disabled>Seleccione Raza...</option>
              {/* Agrega las opciones aquí */}
            </select>
            <select

                value={categoriaCodigo}
                onChange={(e) => setCategoriaCodigo(e.target.value)}
                className="mb-4 p-3 w-full rounded-full bg-gray-300 text-blue-900 placeholder-gray-300"
              >
                <option value="" disabled>Seleccione Categoría...</option>
                {/* Agrega las opciones aquí */}
              </select>
              <select
                value={generoCodigo}
                onChange={(e) => setGeneroCodigo(e.target.value)}
                className="mb-4 p-3 w-full rounded-full bg-gray-300 text-blue-900 placeholder-gray-300"
              >
                <option value="" disabled>Seleccione Género...</option>
                {/* Agrega las opciones aquí */}
              </select>
              <button
                type="submit"
                className="p-3 w-full rounded-lg bg-green-500 text-white"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default Registrar;
  