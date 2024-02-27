import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import ClienteAxios from "../config/axios";


const OlvidePassword = () => {
    const[email, setEmail] = useState('');
    const[alerta, setAlerta] = useState({});

    const handleSubmit = async e =>{
        e.preventDefault();

        if(email === ''){
            setAlerta({mensaje : 'El email es Obligatorio', error: true});
            return; 
        }

        try {
            const {data}= await ClienteAxios.post('/veterinarios/reset-password', {email});

            setAlerta({ mensaje : data.msg})
        } catch (error) {
            setAlerta({mensaje : error.response.data.msg , error : true});
        }
    }

    const{mensaje} = alerta;
    return (
        <>
            <div>
                <h1 className="text-cyan-600 font-black text-6xl">
                    Recupera tu cuenta y Administra tus{""}<span className="text-green-600">Pacientes</span>
                </h1>
            </div>

            <div className="mt-20 md:5 shadow-lg px-5 py-10 rounded-xl bg-white">
                
                {mensaje && <Alerta 
                    alerta={alerta}
                />}
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >Email</label>

                        <input
                            type="email"
                            className="w-full border p-3 mt-3 bg-gray-50 rounded-xl"
                            placeholder="Ingresa tu Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center">
                        <input
                            type="submit"
                            value="Recuperar cuenta"
                            className="bg-cyan-700 rounded-xl w-full py-3 px-10 text-white mt-5 uppercase font-bold hover:cursor-pointer hover:bg-cyan-900 md:w-auto"
                        />
                    </div>

                </form>
                <nav className="mt-10 md:flex md:justify-between">
                    <Link
                        to={"/"}
                        className="block text-center my-5 text-gray-500"
                    >¿Ya tienes una cuenta? Inicia Sesión!</Link>
                    <Link
                        to={"/registrar"}
                        className="block text-center my-5 text-gray-500"
                    >¿No tienes una cuenta? Registrate!</Link>
                </nav>
            </div>



        </>


    );
};

export default OlvidePassword;