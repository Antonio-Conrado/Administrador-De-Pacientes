import {Outlet} from 'react-router-dom';
const AuthLayout = () => {
    return (
        <>
            <h1>Desde auth layout</h1>

            {/* Outlet renderizar los componentes secundarios de las rutas anidadas */}
            <Outlet/>
        </>
    );
};

export default AuthLayout
