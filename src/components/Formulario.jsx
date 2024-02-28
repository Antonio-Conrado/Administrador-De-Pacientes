

const Formulario = () => {
    return (
        <>
            <p className="text-lg text-center mb-10">
                Agrega tus pacientes y {''}
                <span className="text-green-600 font-bold">Administralos</span>
            </p>

            <form 
            
                className="py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md bg-white"
            >
                <div className="mb-5"> 
                    <label 
                        htmlFor="mascota" 
                        className="text-gray-700 uppercase font-bold"    
                    > Nombre Mascota:</label>
                    <input 
                        type="text"
                        id="mascota"
                        placeholder="Nombre de la mascota"
                        className="border-2 w-full p-2 mt-2 rounded-md"   
                        name="mascota" 
                    />
                </div>

                <div className="mb-5"> 
                    <label 
                        htmlFor="propietario" 
                        className="text-gray-700 uppercase font-bold"    
                    > Nombre Propietario:</label>
                    <input 
                        type="text"
                        id="propietario"
                        placeholder="Nombre del Propietario"
                        className="border-2 w-full p-2 mt-2 rounded-md"   
                        name="propietario" 
                    />
                </div>

                <div className="mb-5"> 
                    <label 
                        htmlFor="email" 
                        className="text-gray-700 uppercase font-bold"    
                    > Email Propietario:</label>
                    <input 
                        type="text"
                        id="email"
                        placeholder="Email Propietario"
                        className="border-2 w-full p-2 mt-2 rounded-md"   
                        name="email" 
                    />
                </div>

                <div className="mb-5"> 
                    <label 
                        htmlFor="fecha" 
                        className="text-gray-700 uppercase font-bold"    
                    > Fecha:</label>
                    <input 
                        type="date"
                        id="fecha"
                        className="border-2 w-full p-2 mt-2 rounded-md"   
                        name="fecha" 
                    />
                </div>

                <div className="mb-5"> 
                    <label 
                        htmlFor="sintomas" 
                        className="text-gray-700 uppercase font-bold"    
                    >Sintomas:</label>
                    <textarea 
                        name="sintomas" 
                        id="sintomas" 
                        placeholder="Describe los sintomas"
                        className="border-2 w-full p-2 mt-2 rounded-md"
                    ></textarea>
                </div>

                <input 
                    type="submit" 
                    className="bg-cyan-600 hover:bg-cyan-800 w-48 mx-auto block text-white uppercase font-bold transition-colors cursor-pointer rounded-md p-3"
                    value='Agregar Paciente'
                />



            </form>
        </>

    );
};

export default Formulario;