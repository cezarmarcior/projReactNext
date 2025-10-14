'use client'
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import Principal from '../components/principal';
import Parametro from '../components/parametro'
import { Texto1, Texto2, Texto3 } from '../components/parametro'
import { useEffect } from 'react';

export default function Default() {
    const router = useRouter();

    useEffect(()=> {
        try {
            const token = Cookies.get('authToken');
            if(!token) {
                router.push('/login');
                return;
            }
        } catch (error) {
            
        }
    },[router]);

    const handleLogout = () =>{
        Cookies.remove('authToken');
        router.push('/login');
    };
    return (
        <div>
            <Principal />
            <Parametro />
            <Texto1 />
            <Texto2 />
            <Texto1 />
            <Texto2 />
            <Texto3 cor='red' tipo='bold'>
                .... Texto texto 3 ....
            </Texto3>
            <button onClick={handleLogout}
                className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                transtion-colors'>Sair ...</button>
        </div>
    );
}