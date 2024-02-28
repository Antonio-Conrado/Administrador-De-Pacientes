import { Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import ClienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const navigate = useNavigate();
    const[datos, setDatos] = useState({
        email : '',
        password : ''
    });
    const[alerta, setAlerta] = useState({});

    const guardarDatos = e =>{
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const{setAuth} = useAuth();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const{email, password} = datos;
        if([email, password].includes('')){
            setAlerta({mensaje: 'Todos los campos son obligatorios!' ,error:true})
            return;
        }

        try {
            const url = '/veterinarios/login'
            const{data} =await ClienteAxios.post(url,datos);
            localStorage.setItem('APV_token_auth', data.token);
            setDatos({
                email : '',
                password : ''
            })

            setAuth(data);
            navigate('/admin');
        } catch (error) {
            setAlerta({mensaje: error.response.data.msg, error:true});
        }
    }
    const{mensaje} = alerta;
    return (
        <>
            <div>
                <h1 className="text-cyan-600 font-black text-6xl">
                    Inicia Sesión y Administra tus{""}<span className="text-green-600">Pacientes</span>
                </h1>
            </div>

            <div className="mt-20 md:5 shadow-lg px-5 py-10 rounded-xl bg-white">

                {mensaje && <Alerta
                        alerta = {alerta}
                    />    
                }
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
                            placeholder="Email de Registro"
                            name="email"
                            value={datos.email}
                            onChange={guardarDatos}
                        />
                    </div>

                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >Password</label>

                        <input
                            type="password"
                            className="w-full border p-3 mt-3 bg-gray-50 rounded-xl"
                            placeholder="Password"
                            name="password"
                            value={datos.password}
                            onChange={guardarDatos}
                        />
                    </div>

                    <div className="flex justify-center">
                        <input
                            type="submit"
                            value="Iniciar Sesión"
                            className="bg-cyan-700 rounded-xl w-full py-3 px-10 text-white mt-5 uppercase font-bold hover:cursor-pointer hover:bg-cyan-900 md:w-auto"
                        />
                    </div>

                </form>

                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link 
                        to={"/registrar"}
                        className="block text-center my-5 text-gray-500"
                    >¿No tienes una cuenta? Registrate!</Link>
                    <Link 
                        to={"/reset-password"}
                        className="block text-center my-5 text-gray-500"
                    >Olvidé mi Password!</Link>
                </nav>

            </div>

        </>
    );
};
export default Login;