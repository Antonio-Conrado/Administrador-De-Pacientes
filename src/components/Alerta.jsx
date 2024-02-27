import PropTypes from 'prop-types';

const Alerta = ({alerta}) => {
    return (
        <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-green-400 to-green-600'}  bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm mb-10`}>
            {alerta.mensaje}
        </div>
    );
};

Alerta.propTypes = {
    alerta : PropTypes.object.isRequired
}

export default Alerta;