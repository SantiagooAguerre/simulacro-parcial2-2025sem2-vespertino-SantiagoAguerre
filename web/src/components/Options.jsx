import { useEffect, useState } from "react";
import FunctionRandom from "../functions/FunctionRandom";
import { useNavigate } from 'react-router-dom';

export default function Options({ id, info }) {
    const [fronteras, setFronteras] = useState([]);
    const [todoslospaises, setTodoslospaises] = useState([]);
    const [paises, setPaises] = useState([]);
    const [yaGenerado, setYaGenerado] = useState(false);
    const navigate = useNavigate();
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
        fetch("/api/countries").then((res) => res.json()).then((data) => setTodoslospaises(data));
    }, []);

    useEffect(() => {
        if (!todoslospaises.length || !info || yaGenerado) return;

        setYaGenerado(true);
        setPaises([]);

        let temporales = [];

        for (let i = 0; i < 9; i++) {
            let paisrandom;

            if (FunctionRandom(0, 2) === 1 && info.borders?.length) {
                paisrandom = info.borders[FunctionRandom(0, info?.borders?.length)];
                setFronteras((prev) => [...prev, paisrandom])
                if (temporales.includes(paisrandom)) {
                    do {
                        paisrandom = todoslospaises[FunctionRandom(0, todoslospaises.length)];
                    } while (temporales.includes(paisrandom));
                }
            } else {
                do {
                    paisrandom = todoslospaises[FunctionRandom(0, todoslospaises.length)];
                } while (temporales.includes(paisrandom));
            }

            temporales.push(paisrandom);

            fetch(`/api/countries/${paisrandom}`).then((response) => response.json()).then((data) => setPaises((prev) => [...prev, data]));
        }
    }, [todoslospaises, info, yaGenerado]);


    console.log("Hola, yo soy el pais visitado" + paisesVisitados)

    function confirmarFrontera(pais) {
        let nuevoValor = parseInt(miDato);
        let paisRandom = pais;

        if (pais === null) {
            const fronterasReales = info.borders || [];
            const opcionesConFrontera = paises
                .map((p) => p.cca3)
                .filter((p) => fronterasReales.includes(p));

            if (opcionesConFrontera.length === 0) {
            } else {
                nuevoValor -= 1;
            }

            if (nuevoValor > 0) {
                do {
                    paisRandom = todoslospaises[FunctionRandom(0, todoslospaises.length)];
                } while (paisesVisitados.includes(paisRandom));
            }
        } else {
            const fronterasReales = info.borders || [];
            if (!fronterasReales.includes(pais)) {
                nuevoValor -= 1;
            }
        }

        setMiDato(nuevoValor);
        localStorage.setItem('miDato', JSON.stringify(nuevoValor));

        if (paisRandom) {
            setPaisesVisitados((prev) => {
                const nuevosVisitados = [...prev, paisRandom];
                localStorage.setItem('paisesVisitados', JSON.stringify(nuevosVisitados));
                return nuevosVisitados;
            });
        }

        setYaGenerado(false);

        if (nuevoValor <= 0) {
            navigate('/end');
        } else if (paisRandom) {
            navigate(`/${paisRandom}`);
        }
    }


    return (
        <>
            <div className="grid grid-cols-3">
                {paises.map((data, index) => (
                    <button key={index} className="cursor-pointer p-2 border-[2px] m-2 rounded-xl" onClick={() => confirmarFrontera(data?.cca3)}><img src={data?.flag?.svg} alt={data?.name} width='50px' /></button>
                ))}
            </div>
            <button className="cursor-pointer p-2 border-[2px] m-2 px-5 rounded-xl font-bold text-sm" onClick={() => confirmarFrontera(null)}>Ninguno</button>
        </>
    );
}
