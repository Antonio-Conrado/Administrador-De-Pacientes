import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import usePacientes  from "../hooks/usePacientes";

const Header = () => {
    const{cerrarSesion} = useAuth();
    const{setpacientes} = usePacientes();
    const handleCerrarSesion = ()=>{
        setpacientes([]);
        cerrarSesion();
    }
    return (
        <header className="py-10 bg-cyan-600">
            <div className="container mx-auto flex flex-col  lg:flex-row justify-between items-center">
                <h1 className="font-bold text-white text-2xl text-center">Administrador de Pacientes de Veterinaria
                </h1>

                <nav className="flex  flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0">
                    <Link to={"/admin"} className="text-white text-sm font-bold">Pacientes</Link>
                    <Link to={"/admin/perfil"} className="text-white text-sm font-bold">Perfil</Link>

                    <button
                        type="button"
                        className="text-white text-sm font-bold"
                        onClick={handleCerrarSesion}
                    >Cerrar Sesión</button>
                </nav>


            </div>



        </header>
    );
};
export default Header;