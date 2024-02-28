import { useContext } from "react";
import {AuthContext} from '../context/AuthProvider';

const useAuth = () =>{
    return(
        // acceder a los valores del context
        useContext(AuthContext)
    )
};

export default useAuth;