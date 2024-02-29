import { useContext } from "react";
import { PacientesContext } from "../context/PacientesProviders";

const usePacientes = () =>{
    return useContext(PacientesContext);
};

export default usePacientes;