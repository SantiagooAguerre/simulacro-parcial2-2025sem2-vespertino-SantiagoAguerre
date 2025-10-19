import { useEffect, useState } from "react";

export default function CountriesVisited() {
    const [paises, setPaises] = useState([]);
    const [paisesVisitados, setPaisesVisitados] = useState(() => {
        try {
            const datoGuardado = localStorage.getItem('paisesVisitados');
            return datoGuardado ? JSON.parse(datoGuardado) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        for (let i=0; i < paisesVisitados.length; i++) {
            fetch(`/api/countries/${paisesVisitados[i]}`).then((response) => response.json()).then((data) => setPaises((prev) => [...prev, data]))
        }
    }, [])

    console.log(paises)

    return (
        <div className="grid grid-cols-5">
            {paises.map((data, index) => (
                <img src={data?.flag?.svg} key={index} alt={data?.name} width='50px' className="cursor-pointer p-2 border-[2px] m-2 rounded-xl" />
            ))}
        </div>
    );
}