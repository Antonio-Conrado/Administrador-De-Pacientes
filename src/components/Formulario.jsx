import { useState, useEffect } from "react";
import Alerta from './Alerta';
import usePacientes from "../hooks/usePacientes";
import formatearFecha from "../helpers/formatearFecha";

const Formulario = () => {
    const [datos, setDatos] = useState({
        id: '',
        nombre: '',
        propietario: '',
        email: '',
        fechaAlta: '',
        sintomas: ''
    });
    const [alerta, setAlerta] = useState({});

    const guardarDatos = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    };

    const { guardarPaciente , paciente} = usePacientes();
    
    useEffect( ()=>{
        if(paciente?.nombre){

            setDatos({
                id : paciente._id,
                nombre : paciente.nombre,
                propietario : paciente.propietario,
                email : paciente.email,
                fechaAlta : formatearFecha(paciente.fechaAlta),
                sintomas : paciente.sintomas
            })
        }
        
    }, [paciente]);

    const handleSubmit = e => {
        e.preventDefault();
        const { nombre, propietario, email, fechaAlta, sintomas } = datos;

        if ([nombre, propietario, email, fechaAlta, sintomas].includes("")) {
            setAlerta({
                mensaje: 'Todos los campos son obligatorios',
                error: true
            });
            return;
        }

        {paciente._id ?  
            setAlerta({mensaje : 'Editado correctamente!'}) 
            : 
            setAlerta({mensaje : 'Guardado correctamente!'}
        )}

        setTimeout(() => {
            setAlerta({});
        }, 3000);

        guardarPaciente(datos);

        setDatos({
            id : '',
            nombre: '',
            propietario: '',
            email: '',
            fechaAlta: '',
            sintomas: ''
        });
    };

    const { mensaje } = alerta;
    return (
        <>

            <h2 className="font-black text-2xl text-center">Administrador de Pacientes</h2>
            <p className='text-xl mt-5 mb-10 text-center'>Agrega tus pacientes y {''}
                <span className='text-green-600 font-bold'>Administralos</span>
            </p>

            <form
                onSubmit={handleSubmit}
                className="py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md bg-white"
            >
                {mensaje &&
                    <Alerta
                        alerta={alerta}
                    />
                }
                <div className="mb-5">
                    <label
                        htmlFor="nombre"
                        className="text-gray-700 uppercase font-bold"
                    > Nombre Mascota:</label>
                    <input
                        type="text"
                        id="nombre"
                        placeholder="Nombre de la mascota"
                        className="border-2 w-full p-2 mt-2 rounded-md"
                        name="nombre"
                        onChange={guardarDatos}
                        value={datos.nombre}
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="propietario"
                        className="text-gray-700 uppercase font-bold"
                    > Nombre Propietario:</label>
                    <input
                        type="text"
                        id="propietario"
                        placeholder="Nombre del Propietario"
                        className="border-2 w-full p-2 mt-2 rounded-md"
                        name="propietario"
                        onChange={guardarDatos}
                        value={datos.propietario}
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="text-gray-700 uppercase font-bold"
                    > Email Propietario:</label>
                    <input
                        type="text"
                        id="email"
                        placeholder="Email Propietario"
                        className="border-2 w-full p-2 mt-2 rounded-md"
                        name="email"
                        onChange={guardarDatos}
                        value={datos.email}
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="fecha"
                        className="text-gray-700 uppercase font-bold"
                    > Fecha:</label>
                    <input
                        type="date"
                        id="fecha"
                        className="border-2 w-full p-2 mt-2 rounded-md"
                        name="fechaAlta"
                        onChange={guardarDatos}
                        value={datos.fechaAlta}
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="sintomas"
                        className="text-gray-700 uppercase font-bold"
                    >Sintomas:</label>
                    <textarea
                        name="sintomas"
                        id="sintomas"
                        placeholder="Describe los sintomas"
                        className="border-2 w-full p-2 mt-2 rounded-md"
                        onChange={guardarDatos}
                        value={datos.sintomas}
                    ></textarea>
                </div>

                <input
                    type="submit"
                    className="bg-cyan-600 hover:bg-cyan-800 w-48 mx-auto block text-white uppercase font-bold transition-colors cursor-pointer rounded-md p-3"
                    value={paciente._id ? 'Editar Paciente' :'Agregar Paciente'}
                />



            </form>
        </>

    );
};

export default Formulario;