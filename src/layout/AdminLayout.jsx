import { Outlet, Navigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import useAuth from '../hooks/useAuth';

const AdminLayout = () => {
    const { auth, cargando } = useAuth();

    if (cargando) {
        return (
            <div className="sk-fading-circle ">
                <div className="sk-circle1 sk-circle"></div>
                <div className="sk-circle2 sk-circle"></div>
                <div className="sk-circle3 sk-circle"></div>
                <div className="sk-circle4 sk-circle"></div>
                <div className="sk-circle5 sk-circle"></div>
                <div className="sk-circle6 sk-circle"></div>
                <div className="sk-circle7 sk-circle"></div>
                <div className="sk-circle8 sk-circle"></div>
                <div className="sk-circle9 sk-circle"></div>
                <div className="sk-circle10 sk-circle"></div>
                <div className="sk-circle11 sk-circle"></div>
                <div className="sk-circle12 sk-circle"></div>
            </div>
        )
    }
    return (
        <>
            <Header />
            {auth?._id ? (
                <main className=" container mx-auto mt-10">
                    <Outlet />
                </main>) : <Navigate to='/' />}
            <Footer />
        </>
    )
};
export default AdminLayout;