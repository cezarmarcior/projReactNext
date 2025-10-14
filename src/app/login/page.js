'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // Codigo para instalar a biblioteca:   npm i js-cookie

export default function Login() {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    loginuser: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      var url = '/api/login';
      console.log('loginData: ', loginData)
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      if(!response.ok)
        throw new Error('Login falou');

      const { token } = await response.json();

      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationDate = new Date(payload.exp * 1000);
      
      Cookies.set('authToken', token, {
        expires: expirationDate,
        secure: true,
        sameSite: 'Strict'
      })
      
      router.push('/default');      
    } catch (error) {
      setError('Erro ao fazer o login. Verificar syas credenciais.');    
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="loginuser" className="sr-only">Usuário</label>
              <input
                id="loginuser"
                name="loginuser"
                type="text"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 
                placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
                focus:z-10 sm:text-sm"
                placeholder="Usuário"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Senha</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 
                  text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium 
                rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-indigo-500"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};