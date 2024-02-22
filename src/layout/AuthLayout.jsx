import { Outlet } from 'react-router-dom';
const AuthLayout = () => {
    return (
        <>
            <main className="container mx-auto md:grid grid-cols-2 mt-12 gap-10 p-5 items-center">
                {/* Outlet renderizar los componentes secundarios de las rutas anidadas */}
                <Outlet />
            </main>

        </>
    );
};

export default AuthLayout
