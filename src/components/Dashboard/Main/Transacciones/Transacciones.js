import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { agregarVenta, agregarCompra, montoFinal } from '../../../../features/montoFinalSlice';
import './transacciones.css'
import { guardarTransaccion } from '../../../../features/transaccionesSlice';

const Transacciones = () => {

    let idActual = localStorage.getItem('id');
    let apiKeyActual = localStorage.getItem('key');

    const [stateTransacciones, setTransacciones] = useState([]);
    const dispatch = useDispatch();

    const transacciones = useSelector(state => state.transacciones.transacciones);
    const listaMonedas = useSelector((state) => state.monedas.monedas);

    useEffect(() => {
        fetch(`https://crypto.develotion.com/transacciones.php?idUsuario=${idActual}`, {
            method: 'GET',
            headers: {
                "apikey": apiKeyActual,
            },
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result.codigo === 200) {
                    if (result.transacciones.length != stateTransacciones.length) {

                        let ultimaTransaccion = result.transacciones[transacciones.length];

                        if (ultimaTransaccion.tipoOperacion === 1) {
                            dispatch(agregarCompra((ultimaTransaccion.cantidad * ultimaTransaccion.valorActual)));
                        } else if (ultimaTransaccion.tipoOperacion === 2) {
                            dispatch(agregarVenta((ultimaTransaccion.cantidad * ultimaTransaccion.valorActual)));
                        }
                        dispatch(montoFinal());


                        for (let i = 0; i < result.transacciones.length; i++) {
                            let t = result.transacciones[i];

                            dispatch(guardarTransaccion(result.transacciones));
                            setTransacciones([...stateTransacciones, t]);

                        }

                    }
                }
            })
            .catch(error => console.log('error', error));

    }, [])

    return (
        <div className="container" id="containerTransacciones">
            <h1 className="titular">Transacciones del usuario</h1>
            <table id="tablaTransacciones">
                <thead>
                    <tr>
                        <th>Moneda</th>
                        <th>Tipo de operación</th>
                        <th>Cantidad</th>
                        <th>Valor de la moneda</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transacciones.map((transaccion) => <tr key={transaccion.id}>
                            <td>{transaccion.moneda}</td>
                            <td>{transaccion.tipoOperacion}</td>
                            <td>{transaccion.cantidad}</td>
                            <td>{transaccion.valorActual}</td>
                        </tr>)
                    }
                </tbody>

            </table>

        </div >
    )
}

export default Transacciones