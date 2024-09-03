import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Fondo from '../img/baseAzul.png';
import Volver from '../img/FlechaIzquierda.png';
import Cerrar from '../img/Cerrar.png';
import CamaraMostrar from '../img/CamaraInsertar.png';

const Registrar = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [razas, setRazas] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [municipios, setMunicipios] = useState([]);

  const [values, setValues] = useState({
    nombre: '',
    raza_codigo: '',
    categoria_codigo: '',
    foto: '',
    genero_codigo: '',
    municipio_codigo: ''
  });

 
    const Busquedas = async () => {
      const token = localStorage.getItem('token');
      try {
        const razasResponse = await axios.get('http://localhost:3000/raza/listar', {
          headers: {
            'token': token
          }
        });
        setRazas(razasResponse.data);

        const generosResponse = await axios.get('http://localhost:3000/genero/listar', {
          headers: {
            'token': token
          }
        });
        setGeneros(generosResponse.data);

        const municipiosResponse = await axios.get('http://localhost:3000/municipio/listar', {
          headers: {
            'token': token
          }
        });
        setMunicipios(municipiosResponse.data);

        const categoriasResponse = await axios.get('http://localhost:3000/categorias/listar', {
          headers: {
            'token': token
          }
        });
        setCategorias(categoriasResponse.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener los datos',
          text: error.response?.data?.message || 'Error desconocido',
        });
      }
    };
    useEffect(() => {
    Busquedas();
  }, []);

  const handleSubmit = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  
  //!REGISTRAR_MASCOTA


  const registrar = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('nombre', values.nombre);
    formData.append('raza_codigo', values.raza_codigo);
    formData.append('categoria_codigo', values.categoria_codigo);
    formData.append('genero_codigo', values.genero_codigo);
    formData.append('municipio_codigo',values.municipio_codigo);
    if (selectedImage) {
      formData.append('foto', selectedImage);
    }

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:3000/mascotas/registrar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': token
        }
      });

      Swal.fire({
        position: "center",
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        timer: 1200
      });

      //!RESETEAR LOS DATOS
      setValues({
        nombre: '',
        raza_codigo: '',
        categoria_codigo: '',
        foto: '',
        genero_codigo: '',
        municipio_codigo: ''
      });


      setSelectedImage(null);
    } catch (error) {
      console.error('Error al registrar la mascota:', error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: 'Error al registrar la mascota',
        text: error.response?.data?.message || 'Error desconocido',
        showConfirmButton: true
      });
    }
  };

  const volver = () => {
    window.location.href = '/inicio';
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
        window.location.href = '/';
      } else {
        Swal.fire("Cancelado", "Decidiste no salir", "error");
      }
    });
  };

  const ImagenMostrar = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  return (
    <div
      className='flex flex-col items-center justify-center min-h-screen'
      style={{ backgroundImage: `url(${Fondo})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      <div className="w-full max-w-md p-4">
        <div className="relative w-full flex justify-between items-center mb-4">
          <img
            src={Volver}
            className="cursor-pointer"
            alt="volver"
            onClick={volver}
            style={{ position: 'absolute', left: '40px' }}
          />
          <h1 className="text-white font-arial text-2xl mx-auto">
            Adicionar mascotas
          </h1>
          <img
            src={Cerrar}
            className="cursor-pointer"
            alt="cerrar"
            onClick={cerrarSesion}
            style={{ position: 'absolute', right: '30px' }}
          />
        </div>

        <div className='flex justify-center mb-4'>
          <img
            src={selectedImage ? URL.createObjectURL(selectedImage) : CamaraMostrar}
            className="max-w-36 max-h-36 min-w-40 min-h-40 rounded-full p-5 cursor-pointer"
          />
        </div>

        <form onSubmit={registrar}>
          <div className="rounded-lg p-6">
            <input
              name='nombre'
              type="text"
              placeholder="Nombre"
              onChange={handleSubmit}
              value={values.nombre}
              className="mb-4 p-3 w-full rounded-full bg-gray-300 text-blue-900 placeholder-gray-300"
              required
            />

            <select
              name='raza_codigo'
              className="mb-4 p-3 w-full rounded-full bg-gray-300 text-blue-900 placeholder-gray-300"
              onChange={handleSubmit}
              value={values.raza_codigo}
            >
              <option value="" disabled>Seleccione una Raza...</option>
              {razas.map((raza) => (
                <option key={raza.codigo} value={raza.codigo}>{raza.nombre}</option>
              ))}
            </select>

            <select
              name='categoria_codigo'
              className="mb-4 p-3 w-full rounded-full bg-gray-300 text-blue-900 placeholder-gray-300"
              onChange={handleSubmit}
              value={values.categoria_codigo}
            >
              <option value="" disabled>Seleccione una Categoría...</option>
              {categorias.map((categoria) => (
                <option key={categoria.codigo} value={categoria.codigo}>{categoria.nombre}</option>
              ))}
            </select>

            <div className="flex items-center mb-4">
              <input
                id="foto"
                name="foto"
                type="file"
                className="hidden"
                onChange={ImagenMostrar}
              />
              <label
                htmlFor="foto"
                className="mb-4 p-3 w-full rounded-full bg-gray-300 text-blue-900 placeholder-gray-300 cursor-pointer"
              >
                Subir Foto
              </label>
            </div>

            <select
              name='genero_codigo'
              className="mb-4 p-3 w-full rounded-full bg-gray-300 text-blue-900 placeholder-gray-300"
              onChange={handleSubmit}
              value={values.genero_codigo}
            >
              <option value="" disabled>Seleccione un Género...</option>
              {generos.map((genero) => (
                <option key={genero.codigo} value={genero.codigo}>{genero.nombre}</option>
              ))}
            </select>

            <select
              name='municipio_codigo'
              className="mb-4 p-3 w-full rounded-full bg-gray-300 text-blue-900 placeholder-gray-300"
              onChange={handleSubmit}
              value={values.municipio_codigo}
            >
              <option value="" disabled>Seleccione un municipio...</option>
              {municipios.map((municipio) => (
                <option key={municipio.codigo} value={municipio.codigo}>{municipio.nombre}</option>
              ))}
            </select>

            <button
              type="submit"
              className="bg-green-500 text-white p-3 w-full rounded-full"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registrar;
