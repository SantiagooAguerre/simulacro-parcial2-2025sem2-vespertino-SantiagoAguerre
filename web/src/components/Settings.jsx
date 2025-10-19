import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import functionRandom from '../functions/FunctionRandom'

export default function Settings() {
    const [paises, setPaises] = useState([])
    const [pais, setPais] = useState([])
    const [miDato, setMiDato] = useState(() => {
        try {
            const datoGuardado = localStorage.getItem('miDato');
            return datoGuardado ? JSON.parse(datoGuardado) : '';
        } catch {
            return '';
        }
    });

    const [paisesVisitados, setPaisesVisitados] = useState(() => {
        try {
            const datoGuardado = localStorage.getItem('paisesVisitados');
            return datoGuardado ? JSON.parse(datoGuardado) : [];
        } catch {
            return '';
        }
    });

    useEffect(() => {
        fetch('/api/countries').then((response) => response.json()).then((data) => setPaises(data))
    }, [])

    console.log(paises);

    useEffect(() => {
        setPaisesVisitados([]);
        if (paises.length > 0) {
            const nuevoPais = paises[functionRandom(0, paises.length)];
            setPais(nuevoPais);

            setPaisesVisitados(prev => {
                const actualizado = [...(Array.isArray(prev) ? prev : []), nuevoPais];
                localStorage.setItem('paisesVisitados', JSON.stringify(actualizado));
                return actualizado;
            });
        }
    }, [paises]);


    console.log(pais)

    useEffect(() => {
        localStorage.setItem('miDato', JSON.stringify(miDato));
    }, [miDato]);

    const handleCambio = (nivel) => {
        setMiDato(nivel);
        localStorage.setItem('miDato', JSON.stringify(nivel));
    };


    return (
        <>
            <div className='pb-18 border-[2px] border-black flex flex-col items-center rounded-3xl px-5 w-[20%] h-120 '>
                <h1 className="mb-4 font-bold text-2xl">Flag Trivia</h1>
                <div className="justify-center items-center flex flex-col">
                    <p className="mb-2">Elija la dificultad del juego:</p>
                    {<Link to={`/${pais}`}><button className="border-[2px] p-1 w-28 rounded-xl cursor-pointer" onClick={() => handleCambio(8)}>Facil</button></Link>}
                    {<Link to={`/${pais}`}><button className="border-[2px] p-1 w-28 rounded-xl m-2 cursor-pointer" onClick={() => handleCambio(5)}>Medio</button></Link>}
                    {<Link to={`/${pais}`}><button className="border-[2px] p-1 w-28 rounded-xl cursor-pointer" onClick={() => handleCambio(3)}>Dificil</button></Link>}
                </div>
            </div>
        </>
    );
}