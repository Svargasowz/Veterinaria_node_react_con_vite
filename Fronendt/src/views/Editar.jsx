import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Fondo from '../img/baseAzul.png';
import Volver from '../img/FlechaIzquierda.png';
import Cerrar from '../img/Cerrar.png';

const Editar = () => {
    const { codigo } = useParams();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [razas, setRazas] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [values, setValues] = useState({
        nombre: '',
        raza_codigo: '',
        categoria_codigo: '',
        foto: '',
        genero_codigo: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const [razasResponse, generosResponse, categoriasResponse, mascotaResponse] = await Promise.all([
                    axios.get('http://localhost:3000/raza/listar', { headers: { 'token': token } }),
                    axios.get('http://localhost:3000/genero/listar', { headers: { 'token': token } }),
                    axios.get('http://localhost:3000/categorias/listar', { headers: { 'token': token } }),
                    axios.get(`http://localhost:3000/mascotas/buscar/${codigo}`, { headers: { 'token': token } })
                ]);

                setRazas(razasResponse.data);
                setGeneros(generosResponse.data);
                setCategorias(categoriasResponse.data);

                if (mascotaResponse.data.mascotas && mascotaResponse.data.mascotas.length > 0) {
                    const mascota = mascotaResponse.data.mascotas[0];
                    setValues({
                        nombre: mascota.nombre_mascota,
                        raza_codigo: mascota.raza_codigo,
                        categoria_codigo: mascota.categoria_codigo,
                        foto: mascota.foto,
                        genero_codigo: mascota.genero_codigo
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al obtener los datos',
                    text: error.response?.data?.message || 'Error desconocido',
                });
            }
        };

        fetchData();
    }, [codigo]);

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const actualizar = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('nombre', values.nombre);
        formData.append('raza_codigo', values.raza_codigo);
        formData.append('categoria_codigo', values.categoria_codigo);
        formData.append('genero_codigo', values.genero_codigo);
        if (selectedImage) {
            formData.append('foto', selectedImage);
        }

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        const token = localStorage.getItem('token');

        try {
            const response = await axios.put(`http://localhost:3000/mascotas/actualizar/${codigo}`, formData, {
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
            navigate('/inicio');
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: 'Error al actualizar la mascota',
                text: error.response?.data?.message || 'Error desconocido',
                showConfirmButton: true
            });
        }
    };

    const ImagenMostrar = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

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

                <div className='flex justify-center mb-4'>
                    <img
                        src={selectedImage ? URL.createObjectURL(selectedImage) : `http://localhost:3000/img/${values.foto}`}
                        className="max-w-36 max-h-36 min-w-40 min-h-40 rounded-full p-5 cursor-pointer"
                        alt="Foto de mascota"
                    />
                </div>

                <form onSubmit={actualizar}>
                    <div className="rounded-lg p-6">
                        <input
                            name='nombre'
                            type="text"
                            placeholder="Nombre"
                            onChange={handleChange}
                            value={values.nombre}
                            className="mb-4 p-3 w-full rounded-full bg-gray-300 text-blue-900 placeholder-gray-300"
                            required
                        />

                        <select
                            name='raza_codigo'
                            className="mb-4 p-3 w-full rounded-full bg-gray-300 text-blue-900 placeholder-gray-300"
                            onChange={handleChange}
                            value={values.raza_codigo}
                        >
                            <option value="" disabled>Seleccione Raza...</option>
                            {razas.map((raza) => (
                                <option key={raza.codigo} value={raza.codigo}>{raza.nombre}</option>
                            ))}
                        </select>

                        <select
                            name='categoria_codigo'
                            className="mb-4 p-3 w-full rounded-full bg-gray-300 text-blue-900 placeholder-gray-300"
                            onChange={handleChange}
                            value={values.categoria_codigo}
                        >
                            <option value="" disabled>Seleccione Categoría...</option>
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
                            onChange={handleChange}
                            value={values.genero_codigo}
                        >
                            <option value="" disabled>Seleccione Género...</option>
                            {generos.map((genero) => (
                                <option key={genero.codigo} value={genero.codigo}>{genero.nombre}</option>
                            ))}
                        </select>

                        <button
                            type="submit"
                            className="bg-green-500 text-white p-3 w-full rounded-full"
                        >
                            Actualizar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Editar;
