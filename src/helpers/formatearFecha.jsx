const formatearFecha = (fecha)=>{
    const fechaActual = new Date(fecha);
    const formatoHTML = fechaActual.toISOString().split('T')[0];
    return formatoHTML;

};
export default formatearFecha;