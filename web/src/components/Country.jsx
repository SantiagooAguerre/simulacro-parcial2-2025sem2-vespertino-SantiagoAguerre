import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Options from "./Options";

export default function Country() {
    let { id } = useParams();
    const [info, setInfo] = useState([]);
    const [dificultad, setDificultad] = useState(() => {
        const datoGuardado = localStorage.getItem('miDato');
        return datoGuardado ? JSON.parse(datoGuardado) : null;
    });

    useEffect(() => {
        const datoGuardado = localStorage.getItem('miDato');
        if (datoGuardado) {
            setDificultad(JSON.parse(datoGuardado));
        }
    }, [id]);


    useEffect(() => {
        fetch(`/api/countries/${id}`).then((response) => response.json()).then((data) => setInfo(data));
    }, [id]);

    console.log(info)

    return (
        <div className='min-h-screen min-y-screen flex justify-center items-center'>
            <div className='pb-18 border-[2px] border-black flex flex-col items-center rounded-3xl px-5 w-[20%] h-120 '>
                <h1 className="mb-4 font-bold text-2xl">Flag Trivia</h1>
                <img src={info?.flag?.svg} width="100px" />
                <p className="my-2">¿Cuál de los siguientes paises es fronterizo?</p>
                <Options id={id} info={info} />

                <p>Usted puede errarle {dificultad} veces</p>
            </div>
        </div>
    );
}