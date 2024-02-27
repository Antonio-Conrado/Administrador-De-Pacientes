import { useState, useEffect, createContext } from "react";
import PropTypes from 'prop-types';
import ClienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const[auth, setAuth] = useState({});

    useEffect( ()=>{
        const autenticarUsuario = async ()=>{
            const token = localStorage.getItem('APV_token_auth');
            if(!token) return

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
        };

        autenticarUsuario();
    },[]);

    return ( 
        <AuthContext.Provider
            value={{
                auth,
                setAuth
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
    AuthProvider
}


export default AuthProvider;