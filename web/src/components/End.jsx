import CountriesVisited from "./CountriesVisited";
import { Link } from "react-router-dom";

export default function End() {
    return (
        <>
            <div className='min-h-screen min-y-screen flex justify-center items-center'>
                <div className='pb-18 border-[2px] border-black flex flex-col items-center rounded-3xl px-5 w-[20%] h-120 '>
                    <h1 className="mb-4 font-bold text-2xl">Fin del juego</h1>
                    <div className="justify-center items-center flex flex-col">
                        <p className="mb-2">Usted visitó los siguientes paises</p>
                        <CountriesVisited />
                        {<Link to={`/`}><button className="border-[2px] p-1 w-28 rounded-xl cursor-pointer">Continuar</button></Link>}
                    </div>
                </div>
            </div>
        </>
    );
}