import './dashboard.css'
import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SideNav from './SideNav';
import React from 'react';
import NavPrinci from './NavPrinci';
import { guardarMonedas } from '../../features/monedasSlice';


const Dashboard = () => {

    let navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        let usuarioActual = localStorage.getItem("id");
        let apiKeyActual = localStorage.getItem("key");


        if (!usuarioActual) {
            navigate("/", { replace: true });
        }

        fetch("https://crypto.develotion.com/monedas.php", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "apikey": apiKeyActual
            },
        })
            .then(response => response.json())
            .then(result => {
                dispatch(guardarMonedas(result.monedas));

            })
            .catch(error => console.log('error', error));

        fetch(`https://crypto.develotion.com/transacciones.php?idUsuario=${usuarioActual}`, {
            method: 'GET',
            headers: {
                "apikey": apiKeyActual,
            },
        })
            .then(response => response.json())
            .then(result => { console.log(result) })
            .catch(error => console.log('error', error));

    }, [])


    return (
        <>
            <div className="dashboard">
                <SideNav />
                <NavPrinci />
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default Dashboard