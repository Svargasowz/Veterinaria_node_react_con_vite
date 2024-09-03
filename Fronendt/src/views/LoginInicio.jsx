import React, { useRef } from 'react';
import axios from 'axios';
import Fondo from '../img/InicioSesion.png';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 

const IniciarSesion = () => {
  const email = useRef(null);
  const password = useRef(null);
  const navegacion = useNavigate();

  const IniciarSesion = async (e) => {
    e.preventDefault();

    try {
      const correo = email.current.value;
      const contraseya = password.current.value;

      const data = {
        email: correo,
        password: contraseya,
      };

      const response = await axios.post('http://localhost:3000/validar/login', data);
      
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Bienvenido",
          showConfirmButton: false,
          timer: 1500,
        });
        email.current.value = '';
        password.current.value = '';

        navegacion('/inicio');
      } else if(response.status === 400) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Usuario o contraseña incorrectos",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log('error en el servidor ' + error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Usuario o contraseña incorrectos",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div
      className='flex flex-col items-center justify-center min-h-screen'
      style={{ backgroundImage: `url(${Fondo})`, backgroundPosition: 'center', backgroundRepeat: 'nwo-repeat' }}
    >
      <form onSubmit={IniciarSesion} method='post' className='w-full max-w-sm mt-96 pt-24'>
        <div className='mb-4'>
          <input
            id='email'
            type='email'
            placeholder='Ingrese su correo'
            ref={email}
            className='w-full px-3 py-2 rounded-3xl border bg-white bg-opacity-50 focus:outline-none ml-5'
            style={{ height: '45px', width: '90%', marginTop: '70px' }}
            required
          />
        </div>
        <div className='mb-4'>
          <input
            id='password'
            type='password'
            placeholder='Ingrese su contraseña'
            ref={password}
            className='w-full px-3 py-2 rounded-3xl border bg-white bg-opacity-50 focus:outline-none ml-5'
            style={{ height: '50px', width: '90%' }}
            required
          />
        </div>
        <button
          type='submit'
          className='w-full bg-blue-950 rounded-3xl text-white py-2 ml-5 px-4 hover:bg-blue-900 font-bold'
          style={{ width: '90%' }}
        >
          Iniciar Sesion
        </button>
      </form>
    </div>
  );
};

export default IniciarSesion;
