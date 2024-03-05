
import { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";

const EditarPerfil =  () => {
    const[alerta, setAlerta] = useState({});
    const [perfil, setPerfil] = useState({});
    const{auth, actualizarPerfil} = useAuth();

    useEffect( ()=>{
        setPerfil(auth)
    },[auth]);

    const handleSubmit = async  e =>{
        e.preventDefault();
        const{nombre,email} = perfil;

        if([email, nombre].includes('')){
            setAlerta({mensaje : "Nombre y email son obligatorios!", error: true});
            return;
        }

        const resultado = await actualizarPerfil(perfil);
        setAlerta(resultado);
    };

    const {mensaje} = alerta;
    return (
        <>
            <AdminNav />

            <h2 className="font-black text-center mt-10 text-3xl">Editar Perfil</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''}
                <span className="text-green-600 font-bold">información aquí!</span>
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                    
                    {mensaje && 
                        <Alerta
                            alerta = {alerta}
                        />
                    }
                    
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="my-3">
                            <label
                                htmlFor="nombre"
                                className="uppercase font-bold text-gray-600"
                            >Nombre</label>
                            <input
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="nombre"
                                value={perfil.nombre || ''}
                                onChange={ e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>

                        <div className="my-3">
                            <label
                                htmlFor="web"
                                className="uppercase font-bold text-gray-600"
                            >Sitio Web</label>
                            <input
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="web"
                                value={perfil.web || ''}
                                onChange={ e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>

                        <div className="my-3">
                            <label
                                htmlFor="telefono"
                                className="uppercase font-bold text-gray-600"
                            >Teléfono</label>
                            <input
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="telefono"
                                value={perfil.telefono || ''}
                                onChange={ e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>

                        <div className="my-3">
                            <label
                                htmlFor="email"
                                className="uppercase font-bold text-gray-600"
                            >Email</label>
                            <input
                                type="email"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="email"
                                value={perfil.email || ''}
                                onChange={ e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>

                        <div className="flex justify-center">
                            <input
                                type="submit"
                                value='Guardar Cambios'
                                className="bg-cyan-700 mt-5 px-10 py-3 font-bold text-white rounded-lg uppercase w-full md:w-auto cursor-pointer"
                            />
                        </div>


                    </form>
                </div>
            </div>
        </>

    );
};

export default EditarPerfil;