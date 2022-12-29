import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './sugerencias.css';

const Sugerencias = () => {

    let idActual = localStorage.getItem('id');
    let apiKeyActual = localStorage.getItem('key');


    const arrayTransacciones = useSelector((state) => state.transacciones.transacciones);
    const arrayMonedas = useSelector((state) => state.monedas.monedas);
    const arrayUltimasTransacciones = [];
    const arraySugerencias = [];


    const [stateMonedas2, setStateMonedas2] = useState([]);
    const [stateUltimasTransacciones, setUltimasTransacciones] = useState([]);

    let cotizacionActual;

    class UltimaTransaccion {
        constructor(moneda, tipoOperacion, valorComprado, sugerencia) {
            this.moneda = moneda;
            this.operacion = tipoOperacion;
            this.valorComprado = valorComprado;
            this.sugerencia = sugerencia;
        }
    }

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
                setStateMonedas2(result.monedas.cotizacion);
            })
            .catch(error => console.log('error', error));

        let ultimaMoneda;

        for (let m = 1; m <= 9; m++) {
            ultimaMoneda = null;
            for (let i = 0; i < arrayTransacciones.length; i++) {
                let mon = arrayTransacciones[i].moneda;
                if (mon === m) {
                    ultimaMoneda = arrayTransacciones[i];
                }
            }
            arrayUltimasTransacciones.push(ultimaMoneda);
            // console.log(arrayUltimasTransacciones);

        }

        console.log(arrayUltimasTransacciones);


        for (let i = 0; i < arrayUltimasTransacciones.length; i++) {
            let u = arrayUltimasTransacciones[i];
            cotizacionActual = stateMonedas2;

            if (u != null) {
                let tipoOperacion = u.tipoOperacion;
                let moneda = u.moneda;

                if (tipoOperacion === 1) {
                    tipoOperacion = "Compra"
                } else {
                    tipoOperacion = "Venta"
                }

                if (moneda === 1) {
                    moneda = "Vintereum"
                } else if (moneda === 2) {
                    moneda = "Pesocoin"
                } else if (moneda === 3) {
                    moneda = "Monereum"
                } else if (moneda === 4) {
                    moneda = "Finance URU"
                } else if (moneda === 5) {
                    moneda = "MvdCoin"
                } else if (moneda === 6) {
                    moneda = "Hexagon"
                } else if (moneda === 7) {
                    moneda = "Guitchain"
                } else if (moneda === 8) {
                    moneda = "Money Token"
                } else if (moneda === 9) {
                    moneda = "MDG"
                }

                let sugerencia = u.valorActual < cotizacionActual ? "Vender" : "Comprar";


                let nuevaTransaccion = new UltimaTransaccion(moneda, tipoOperacion, u.valorActual, sugerencia);
                arraySugerencias.push(nuevaTransaccion);

            }

        }
        setUltimasTransacciones(arraySugerencias)
        console.log(arraySugerencias);
    }, [arrayMonedas, arrayTransacciones])


    return (
        <>
            <div className="box">
                {stateUltimasTransacciones.map((s, i) => i < 9 ?
                    <div className="cajaTextos"><h3 className="cajaTextosH3" >{s.moneda}</h3> <p className="cajaTextosp">{s.operacion} hecha por {s.valorComprado}  <strong>{s.sugerencia}</strong></p> </div> : <></>
                )}
            </div>
        </>
    )
}

export default Sugerencias