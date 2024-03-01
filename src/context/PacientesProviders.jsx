import { createContext, useState, useEffect } from "react";
import ClienteAxios from "../config/axios";
import PropTypes from 'prop-types';

const PacientesContext = createContext()

const PacientesProvider = ({children}) => {
    const[pacientes, setpacientes] = useState([]);

    useEffect( () =>{
        const obtenerPacientes = async ()=>{
            try {
                const token = localStorage.getItem('APV_token_auth');
                const config ={
                    headers:{
                        "Content-Type" : 'application/json',
                        Authorization : `Bearer ${token}`
                    }
                };
                const {data} = await ClienteAxios('/pacientes', config);
                setpacientes(data);

            } catch (error) {
                console.log(error.response.data.msg);
            }
        };
        obtenerPacientes();

    },[]);
    
    const guardarPaciente = async( paciente) =>{
        try {  
            const token = localStorage.getItem('APV_token_auth');
            const config = {
                headers:{
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            };

            const { data } = await ClienteAxios.post('/pacientes', paciente, config);

            const{createdAt, updatedAt, __v, ...pacienteAlmacenado} = data;//crear un nuevo objeto omitiendo algunos campos

            setpacientes([pacienteAlmacenado, ...pacientes]);
            
        } catch (error) {
            console.log(error.response.data.msg)
        }
    };

    return (  
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente
            }}
        >

            {children}
        </PacientesContext.Provider>

    );
};
PacientesProvider.propTypes = {
    children : PropTypes.element
};

export{PacientesContext}

export default PacientesProvider;