import PropTypes from 'prop-types';

const Paciente = ({paciente}) => {
    const{email, fechaAlta, nombre, propietario, sintomas, _id} = paciente;
    

    //formatear fecha sin inmutar la fecha original
    const formatearFecha = (fecha)=>{
        const nuevaFecha = new Date(fecha);
        return new Intl.DateTimeFormat('es-NI', {dateStyle: 'long'}).format(nuevaFecha);
    };
    return ( 
        <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
            <p className="font-bold uppercase text-green-800  my-2">
                Nombre: {''}
                <span className="font-normal normal-case text-black">{nombre}</span>
            </p>

            <p className="font-bold uppercase text-green-800 my-2">
                Propietario: {''}
                <span className="font-normal normal-case text-black">{propietario}</span>
            </p>

            <p className="font-bold uppercase text-green-800 my-2">
                Email: {''}
                <span className="font-normal normal-case text-black">{email}</span>
            </p>

            <p className="font-bold uppercase text-green-800 my-2">
                Fecha: {''}
                <span className="font-normal normal-case text-black">{formatearFecha(fechaAlta)}</span>
            </p>

            <p className="font-bold uppercase text-green-800 my-2">
                Sintomas: {''}
                <span className="font-normal normal-case text-black">{sintomas}</span>
            </p>

            <div className='flex justify-between flex-col md:flex-row my-5 '>
                <button
                    type='button'
                    className='py-2 px-10 bg-cyan-600 hover:bg-cyan-800 text-white rounded-md uppercase font-bold mb-2 md:mb-0'
                >Editar</button>

                <button
                    type='button'
                    className='py-2 px-10 bg-red-600 hover:bg-red-800 text-white rounded-md uppercase font-bold'
                >Eliminar</button>

            </div>
        </div>
    );
};

Paciente.propTypes={
    paciente : PropTypes.object.isRequired
}
export default Paciente;