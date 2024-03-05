import { useState, useEffect, createContext } from "react";
import PropTypes from 'prop-types';
import ClienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const[auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);//cargar la informacion antes de auth

    useEffect( ()=>{
        const autenticarUsuario = async ()=>{
            const token = localStorage.getItem('APV_token_auth');
            if(!token){
                setCargando(false);
                return
            }

            const config = {
                headers : {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`
                }
            };

            try {
                const { data} = await ClienteAxios('/veterinarios/perfil', config)
                setAuth(data);
            } catch (error) {
                setAuth({});
            }

            setCargando(false)
        };

        autenticarUsuario();
    },[]);

    const cerrarSesion = ()=>{
        localStorage.removeItem('APV_token_auth');
        setAuth({});
    };

    const actualizarPerfil = async (datos) =>{
        const token = localStorage.getItem('APV_token_auth');
        if(!token){
            setCargando(false);
            return;
        }

        const config = {
            headers:{
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            }
        };

        try {
            const url = `/veterinarios/perfil/${datos._id}`;

            const  {data } =await ClienteAxios.put(url, datos, config);
            console.log(data)

            return { 
                mensaje : 'Perfil Actualizado correctamente!'
            }
        } catch (error) {
            return {
                mensaje : error.response.data.msg,
                error : true
        };
        }

    }

    const cambiarPassword = async datos =>{
        const token = localStorage.getItem('APV_token_auth');
        if(!token){
            setCargando(false);
            return;
        }

        const config = {
            headers:{
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            }
        };

        try {
            const url = '/veterinarios/actualizar-password';

            const resultado = await ClienteAxios.put(url, datos, config);
            return { 
                mensaje : resultado.data.msg,
                status : 200
            }
        } catch (error) {
            return {
                mensaje : error.response.data.msg,
                error : true
            };
        }
    }

    return ( 
        <AuthContext.Provider
            value={{
                auth,
                cargando,
                setAuth,
                cerrarSesion,
                actualizarPerfil,
                cambiarPassword
            }}
        >  
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children : PropTypes.element
};

export{
    AuthContext
}


export default AuthProvider;