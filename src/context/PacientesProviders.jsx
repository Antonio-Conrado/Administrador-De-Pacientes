import { createContext, useState, useEffect } from "react";
import ClienteAxios from "../config/axios";
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const PacientesContext = createContext()

const PacientesProvider = ({ children }) => {
    const [pacientes, setpacientes] = useState([]);
    const [paciente, setPaciente] = useState({});

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('APV_token_auth');
                const config = {
                    headers: {
                        "Content-Type": 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                const { data } = await ClienteAxios('/pacientes', config);
                setpacientes(data);

            } catch (error) {
                console.log(error.response.data.msg);
            }
        };
        obtenerPacientes();

    }, []);

    const guardarPaciente = async (paciente) => {

        const token = localStorage.getItem('APV_token_auth');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        if (paciente.id) {
            try {
                const { data } = await ClienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);

                const pacienteModificado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState);

                setpacientes(pacienteModificado);
                setPaciente({});

            } catch (error) {
                console.log(error.response.data.msg);
            }

        } else {
            try {

                const { data } = await ClienteAxios.post('/pacientes', paciente, config);

                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;//crear un nuevo objeto omitiendo algunos campos

                setpacientes([pacienteAlmacenado, ...pacientes]);

            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
    };

    const setEdicion = (paciente) => {
        setPaciente(paciente)
    };

    const eliminarPaciente = (id) => {
        Swal.fire({
            title: "¿Estás Seguro?",
            text: "Sí eliminas esta cita, no podrás recuperarla!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, Eliminar!",
            cancelButtonText: "Cancelar"
        }).then( async (result) => {
            if (result.isConfirmed) {
                
                try {
                    const token = localStorage.getItem('APV_token_auth');
                    const config = {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    };
                    await ClienteAxios.delete(`/pacientes/${id}`, config);

                    const pacientesActualizados = pacientes.filter(pacienteState => pacienteState._id !== id);

                    setpacientes(pacientesActualizados)
                } catch (error) {
                    console.log(error.response.data.msg);
                }
                Swal.fire({
                    title: "Eliminado!",
                    text: "Tu cita ha sido eliminada correctamente.",
                    icon: "success"
                });
            }
        });
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                paciente,
                guardarPaciente,
                setEdicion,
                eliminarPaciente
            }}
        >

            {children}
        </PacientesContext.Provider>

    );
};
PacientesProvider.propTypes = {
    children: PropTypes.element
};

export { PacientesContext }

export default PacientesProvider;