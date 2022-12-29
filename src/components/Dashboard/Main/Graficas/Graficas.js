import React from 'react';
import './graficas.css';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
);




const Graficas = () => {

    const arrayMonedas = useSelector((state) => state.monedas.monedas);
    const slcMonedas = useRef(null);

    const [stateNombreGrafica, setNombreGrafica] = useState(null);
    const [stateGraficoMoneda, setGraficoMoneda] = useState(null);
    const [stateLabelsAbajo, setLabelsAbajo] = useState(null);
    const [stateComprasTotales, setComprasTotales] = useState(null);
    const [stateVentasTotales, setVentasTotales] = useState(null);

    const arrayTransacciones = useSelector((state) => state.transacciones.transacciones);
    const comprasTotales = [];
    const ventasTotales = [];
    const labelsGraficoLinea = [];
    const cantLabelsAbajo = [];



    useEffect(() => {

        let montoCompra;
        for (let c = 1; c <= 9; c++) {
            montoCompra = null;
            for (let i = 0; i < arrayTransacciones.length; i++) {
                let m = arrayTransacciones[i];
                if (m.tipoOperacion === 1) {
                    let mon = m.moneda;

                    if (mon === c) {
                        montoCompra += (m.cantidad * m.valorActual)
                    }
                }
            }
            comprasTotales.push(montoCompra);

        }
        setComprasTotales(comprasTotales);

        let montoVenta;
        for (let v = 1; v <= 9; v++) {
            montoVenta = null;
            for (let i = 0; i < arrayTransacciones.length; i++) {
                let m = arrayTransacciones[i];
                if (m.tipoOperacion === 2) {
                    let mon = m.moneda;

                    if (mon === v) {
                        montoVenta += (m.cantidad * m.valorActual)
                    }
                }
            }
            ventasTotales.push(montoVenta);

        }
        setVentasTotales(ventasTotales)


    }, [])

    const graficoLinea = () => {
        let monedaElegida = Number(slcMonedas.current.value);
        let contador = 0;

        for (let i = 0; i < arrayMonedas.length; i++) {
            let m = arrayMonedas[i];
            if (m.id === monedaElegida) {
                setNombreGrafica(m.nombre)
            }
        }

        for (let i = 0; i < arrayTransacciones.length; i++) {
            let t = arrayTransacciones[i];
            if (monedaElegida === t.moneda) {
                labelsGraficoLinea.push(t.valorActual);
                contador++;
                cantLabelsAbajo.push(contador);
            }


        }
        setGraficoMoneda(labelsGraficoLinea);
        setLabelsAbajo(cantLabelsAbajo);


    }
    //Santi, se que en varios lugares, como en este sería ideal usar .find, entre otros métodos, pero no los he logrado dominar



    return <div className="Graficas">

        <div className="graficoBarras">
            <Bar options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Compras y ventas',
                    },
                },
            }} data={{
                labels: ['Vintereum', 'Pesocoin', 'Monereum', 'Finance URU', 'MvdCoin', 'Hexagon', 'Guitchain', 'Money Token', 'MDG'],
                datasets: [
                    {
                        label: 'Compras',
                        data: stateComprasTotales,
                        backgroundColor: '#F87060',
                    },
                    {
                        label: 'Ventas',
                        data: stateVentasTotales,
                        backgroundColor: '#1D4072',
                    },
                ],
            }} />
        </div>

        <div className="graficoLinea">
            <select ref={slcMonedas} onChange={graficoLinea}>
                <option disabled selected>
                    Seleccione una moneda
                </option>
                {arrayMonedas.map((moneda) => (
                    <option value={moneda.id} key={moneda.id}>
                        {moneda.nombre}
                    </option>
                ))}
            </select>

            <Line options={{
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                stacked: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Gráfico por moneda',
                    },
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        grid: {
                            drawOnChartArea: false,
                        },
                    },
                },
            }} data={{
                labels: stateLabelsAbajo,
                datasets: [
                    {
                        label: `${stateNombreGrafica === null ? 'Elegí una moneda' : stateNombreGrafica}`,
                        data: stateGraficoMoneda,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: '#F87060',
                        yAxisID: 'y',
                    },

                ],
            }} />
        </div>


    </div>
}


export default Graficas