import { useState, useEffect } from "react";
import Alerta from "../components/Alerta";
import ClienteAxios from "../config/axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const NuevoPassword = () => {
    const params = useParams();
    const { token } = params;

    const [alerta, setAlerta] = useState({});
    const [password, guardarPassword] = useState('');
    const [repetirPassword, guardarRepetirPassword] = useState('');
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false);

    useEffect(() => {
        const comprobarToken = async () => {

            try {
                await ClienteAxios(`/veterinarios/reset-password/${token}`);
                setAlerta({ mensaje: 'Ingresa tu nuevo password' });
                setTokenValido(true);

            } catch (error) {
                setAlerta({ mensaje: 'Hubo un error con el enlace!', error: true });
            }
        };

        comprobarToken();
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        if ([password, repetirPassword].includes("")) {
            setAlerta({ mensaje: "Todos los campos son obligatorios!", error: true });
            return;
        }

        if (password.length < 6) {
            setAlerta({
                mensaje: "El password es muy corto, agrega mínimo 6 caracteres!",
                error: true,
            });
            return;
        }

        if (password !== repetirPassword) {
            setAlerta({ mensaje: "Ambos password no son iguales!", error: true });
            return;
        }

        try {
            const url = `/veterinarios/reset-password/${token}`;
            const { data } = await ClienteAxios.post(url, { password });
            setAlerta({ mensaje: data.msg });
            setPasswordModificado(true);
            guardarPassword('');
            guardarRepetirPassword('')
        } catch (error) {
            setAlerta({ mensaje: error.response.data.msg, error: true })
        }
    }

    const { mensaje } = alerta;
    return (
        <>
            <div>
                <h1 className="text-cyan-600 font-black text-6xl">
                    Restablece tu password y Administra tus{""}<span className="text-green-600">Pacientes</span>
                </h1>
            </div>

            <div className="mt-20 md:5 shadow-lg px-5 py-10 rounded-xl bg-white">

                {mensaje && <Alerta
                    alerta={alerta}
                />}

                {tokenValido && (
                    <>
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="my-5">
                                <label className="uppercase text-gray-600 block text-xl font-bold">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    className="w-full border p-3 mt-3 bg-gray-50 rounded-xl"
                                    placeholder="Tu nuevo password"
                                    name="password"
                                    value={password}
                                    onChange={e => guardarPassword(e.target.value)}
                                />
                            </div>

                            <div className="my-5">
                                <label className="uppercase text-gray-600 block text-xl font-bold">
                                    Repetir Password
                                </label>

                                <input
                                    type="password"
                                    className="w-full border p-3 mt-3 bg-gray-50 rounded-xl"
                                    placeholder="Repite tu nuevo password"
                                    name="password"
                                    value={repetirPassword}
                                    onChange={e => guardarRepetirPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-center">
                                <input
                                    type="submit"
                                    value="Restablecer password"
                                    className="bg-cyan-700 rounded-xl w-full py-3 px-10 text-white mt-5 uppercase font-bold hover:cursor-pointer hover:bg-cyan-900 md:w-auto"
                                />
                            </div>
                        </form>

                        {passwordModificado && (
                            <Link
                                to={"/"}
                                className="block text-center my-5 text-gray-500"
                            >Iniciar Sesión!</Link>
                        )}

                    </>

                )}

            </div>


        </>
    );
};


export default NuevoPassword;