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

    return ( 
        <AuthContext.Provider
            value={{
                auth,
                cargando,
                setAuth,
                cerrarSesion
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