
import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {
    const [alerta, setAlerta] = useState({});
    const [password, setPassword] = useState({
        passwordActual: '',
        nuevoPassword: '',
        repetirNuevoPassword: ''
    });

    const { cambiarPassword } = useAuth();

    const handleSubmit = async e => {
        e.preventDefault();

        if (Object.values(password).some(campo => campo === '')) {
            setAlerta({
                mensaje: 'Todos los campos son Obligatorios',
                error: true
            });
            return;
        }

        if (password.nuevoPassword.length < 6) {
            setAlerta({
                mensaje: 'El password es muy corto, agrega mínimo 6 caracteres!',
                error: true
            });
            return;
        }

        if (password.nuevoPassword !== password.repetirNuevoPassword) {
            setAlerta({
                mensaje: 'Las contraseñas no coinciden. Por favor, asegúrate de que ambas contraseñas sean iguales!',
                error: true
            });
            return;
        }

        const resultado = await cambiarPassword(password);
        setAlerta(resultado);
        if(resultado.status === 200){
            setPassword({
                passwordActual: '',
                nuevoPassword: '',
                repetirNuevoPassword: ''
            });
            setTimeout(() => {
                setAlerta({})
            }, 4000);
        }


    };

    const { mensaje } = alerta;
    return (
        <>
            <AdminNav />

            <h2 className="font-black text-center mt-10 text-3xl">Cambiar Password</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''}
                <span className="text-green-600 font-bold">Password</span>
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

                    {mensaje &&
                        <Alerta
                            alerta={alerta}
                        />
                    }

                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="my-3">
                            <label
                                htmlFor="password"
                                className="uppercase font-bold text-gray-600"
                            >Password Actual</label>
                            <input
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="passwordActual"
                                placeholder="Escribe tu password actual"
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name]: e.target.value
                                })}
                                value={password.passwordActual}

                            />
                        </div>

                        <div className="my-3">
                            <label
                                htmlFor="password"
                                className="uppercase font-bold text-gray-600"
                            >Password Nuevo</label>
                            <input
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="nuevoPassword"
                                placeholder="Escribe tu nuevo password"
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name]: e.target.value
                                })}
                                value={password.nuevoPassword}

                            />
                        </div>

                        <div className="my-3">
                            <label
                                htmlFor="password"
                                className="uppercase font-bold text-gray-600"
                            >Repetir Password Nuevo</label>
                            <input
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="repetirNuevoPassword"
                                placeholder="Repite tu nuevo password"
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name]: e.target.value
                                })}
                                value={password.repetirNuevoPassword}

                            />
                        </div>



                        <div className="flex justify-center">
                            <input
                                type="submit"
                                value='Cambiar Password'
                                className="bg-cyan-700 mt-5 px-10 py-3 font-bold text-white rounded-lg uppercase w-full md:w-auto cursor-pointer"
                            />
                        </div>


                    </form>
                </div>
            </div>
        </>
    );
};

export default CambiarPassword;