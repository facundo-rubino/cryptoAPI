import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavPrinci = () => {

    let navigate = useNavigate();
    const resultado = useSelector(state => state.montoFinal.montoFinal)


    let cerrarSesion = e => {
        navigate("/");
        localStorage.clear();
    }

    return (
        <div className="navPrinci">
            <h2>Monto final: {resultado} </h2>
            <a onClick={cerrarSesion}>Cerrar sesión</a>
        </div>
    )
}

export default NavPrinci