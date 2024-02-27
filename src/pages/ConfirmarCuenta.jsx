import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import Alerta from '../components/Alerta';
import ClienteAxios from "../config/axios";

const ConfirmarCuenta = () => {
    const params = useParams();
    const { id } = params;

    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState({});
    

    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const url = `/veterinarios/confirmar-cuenta/${id}`;
                const{data} = await ClienteAxios(url);
                
                setCuentaConfirmada(true);
                
                setTimeout(() => {
                    setAlerta({ mensaje: data.msg})
                }, 10);

            } catch (error) {
                setAlerta({ mensaje: error.response.data.msg, error: true });
            }
            setCargando(false);
        };
        confirmarCuenta();

    }, []);

    return (
        <>
            <div>
                <h1 className="text-cyan-600 font-black text-6xl">
                    Confirma tu cuenta y empieza a administrar tus {""}
                    <span className="text-green-600">Pacientes</span>
                </h1>
            </div>

            <div className="mt-20 md:5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {!cargando &&
                    <Alerta
                        alerta={alerta}
                    />
                }

                {cuentaConfirmada && (
                    <Link 
                    to={'/'}
                    className="block text-center my-5 text-white mx-auto bg-cyan-700 w-36 rounded p-3 hover:bg-cyan-900"
                    >Iniciar sesión</Link>
                )}
            </div>
        </>
    );
};
export default ConfirmarCuenta;