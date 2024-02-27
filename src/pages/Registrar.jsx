import { useState } from "react";
import { Link } from "react-router-dom";

import Alerta from "../components/Alerta";
import ClienteAxios from "../config/axios";

const Registrar = () => {
    const [alerta, setAlerta] = useState({});

    const [datos, guardarDatos] = useState({
        nombre: "",
        email: "",
        password: "",
        repetirPassword: "",
    });

    const guardarInformacion = (e) => {
        guardarDatos({
            ...datos,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nombre, email, password, repetirPassword } = datos;

        if([nombre, email, password, repetirPassword].includes("")) {
            setAlerta({ mensaje: "Todos los campos son obligatorios!", error: true });
            return;
        }

        if(password.length < 6) {
            setAlerta({
                mensaje: "El password es muy corto, agrega mínimo 6 caracteres!",
                error: true,
            });
            return;
        }

        if(password !== repetirPassword) {
            setAlerta({ mensaje: "Ambos password no son iguales!", error: true });
            return;
        }

        try {
            const url = `/veterinarios/registrar`;
            await ClienteAxios.post(url, datos);
            setAlerta({mensaje : 'Usuario Registrado Correctamente. Revisa tu Email!'})

            guardarDatos({
                nombre: '',
                email : '',
                password : '',
                repetirPassword : ''
            });

            setTimeout(() => {
                setAlerta({});
            }, 5000);

        } catch (error) {
            setAlerta({mensaje : error.response.data.msg , error :true})
            console.log(error.response)
            return
        }
    
        
    };

    const { mensaje } = alerta;
    return (
        <>
            <div>
                <h1 className="text-cyan-600 font-black text-6xl">
                    Crea tu cuenta y Administra tus {""}
                    <span className="text-green-600">Pacientes</span>
                </h1>
            </div>

            <div className="mt-20 md:5 shadow-lg px-5 py-10 rounded-xl bg-white">

                {mensaje ? <Alerta alerta={alerta} /> : null}

                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Nombre
                        </label>

                        <input
                            type="text"
                            className="w-full border p-3 mt-3 bg-gray-50 rounded-xl"
                            placeholder="Ingresa tu Nombre"
                            name="nombre"
                            value={datos.nombre}
                            onChange={guardarInformacion}
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Email
                        </label>

                        <input
                            type="email"
                            className="w-full border p-3 mt-3 bg-gray-50 rounded-xl"
                            placeholder="Ingresa tu Email"
                            name="email"
                            value={datos.email}
                            onChange={guardarInformacion}
                        />
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Password
                        </label>

                        <input
                            type="password"
                            className="w-full border p-3 mt-3 bg-gray-50 rounded-xl"
                            placeholder="Ingresa tu Password"
                            name="password"
                            value={datos.password}
                            onChange={guardarInformacion}
                        />
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Repetir Password
                        </label>

                        <input
                            type="password"
                            className="w-full border p-3 mt-3 bg-gray-50 rounded-xl"
                            placeholder="Repite tu password"
                            name="repetirPassword"
                            value={datos.repetirPassword}
                            onChange={guardarInformacion}
                        />
                    </div>

                    <div className="flex justify-center">
                        <input
                            type="submit"
                            value="Crear Cuenta"
                            className="bg-cyan-700 rounded-xl w-full py-3 px-10 text-white mt-5 uppercase font-bold hover:cursor-pointer hover:bg-cyan-900 md:w-auto"
                        />
                    </div>
                </form>
                <nav className="mt-10 md:flex md:justify-between">
                    <Link to={"/"} className="block text-center my-5 text-gray-500">
                        ¿Ya tienes una cuenta? Inicia Sesión!
                    </Link>
                    <Link
                        to={"/reset-password"}
                        className="block text-center my-5 text-gray-500"
                    >
                        Olvidé mi Password!
                    </Link>
                </nav>
            </div>
        </>
    );
};

export default Registrar;
