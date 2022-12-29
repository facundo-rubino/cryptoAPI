import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
//import { agregarVenta, agregarCompra, montoFinal } from '../../../../features/montoFinalSlice';
import './comprar.css';
import { guardarMonedas } from '../../../../features/monedasSlice';

const Comprar = () => {

    let idActual = localStorage.getItem('id');
    let apiKeyActual = localStorage.getItem('key');

    const [stateMonedas, setMonedas] = useState([]);
    const dispatch = useDispatch();

    const slcMonedas = useRef(null);
    const cantidadCompra = useRef(null);
    const slcTipo = useRef(null);

    useEffect(() => {

        fetch("https://crypto.develotion.com/monedas.php", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "apikey": apiKeyActual
            },
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setMonedas(result.monedas);
                dispatch(guardarMonedas(result.monedas));
            })
            .catch(error => console.log('error', error));

    }, [])

    const realizarTransaccion = e => {
        const tipoElegido = slcTipo.current.value;
        const monedaElegida = slcMonedas.current.value;
        const cantidadElegida = cantidadCompra.current.value;
        const cotizacionMoneda = stateMonedas[monedaElegida].cotizacion;

        fetch("https://crypto.develotion.com/transacciones.php", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "apikey": apiKeyActual
            },
            body: JSON.stringify({
                "idUsuario": idActual,
                "tipoOperacion": tipoElegido,
                "moneda": monedaElegida,
                "cantidad": cantidadElegida,
                "valorActual": cotizacionMoneda,
            })
        })
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));


    }

    return (
        <div className="compras">
            <h1>Compra/venta de monedas</h1>
            <select ref={slcTipo}>
                <option disabled selected defaultValue="" value="">Seleccione un tipo de operación</option>
                <option value="1">Compra</option>
                <option value="2">Venta</option>
            </select>
            <select ref={slcMonedas}>
                <option disabled selected>
                    Seleccione una moneda
                </option>
                {stateMonedas.map((moneda) => (
                    <option value={moneda.id} key={moneda.id}>
                        {moneda.nombre}
                    </option>
                ))}
            </select>
            <input type="number" placeholder="Ingrese la cantidad" ref={cantidadCompra} />
            <input type="button" value="Realizar transacción" onClick={realizarTransaccion} />


        </div>

    )
}

export default Comprar