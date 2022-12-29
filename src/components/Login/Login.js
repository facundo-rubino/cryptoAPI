import React from 'react';
import { useRef, useState, useEffect, } from "react";
import './registro-inicio.css';
import logo from '../../img/logoApp.png';
import { useNavigate } from "react-router-dom";


const Login = () => {

    const [isSignUp, setSignUp] = useState(false);
    const [stateDeptos, setDeptos] = useState([]);
    const [stateCiudades, setCiudades] = useState([]);

    const usuario = useRef(null);
    const password = useRef(null);
    const nuevoUsuario = useRef(null);
    const nuevoPass = useRef(null);
    const slcDeptos = useRef(null);
    const slcCiudades = useRef(null);

    let navigate = useNavigate();

    document.title = "Iniciar Sesión - Crear Cuenta";


    useEffect(() => {

        let usuarioActual = localStorage.getItem("id");
        console.log(usuarioActual);
        //  if (usuarioActual !== undefined) {
        // navigate("/dashboard/comprar");
        //}


        fetch("https://crypto.develotion.com/departamentos.php")
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setDeptos(result.departamentos);

            })

    }, [])


    const listadoCiudades = () => {
        let codigoDepto = slcDeptos.current.value;
        fetch(`https://crypto.develotion.com/ciudades.php?idDepartamento=${codigoDepto}`)
            .then(response => response.json())
            .then(result => {
                setCiudades(result.ciudades);
            })

    }

    const ingresar = e => {

        let usuarioCampo = usuario.current.value;
        let passwordCampo = password.current.value;

        fetch("https://crypto.develotion.com/login.php", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                usuario: usuarioCampo,
                password: passwordCampo,
            }),

        })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.codigo === 200) {
                    navigate("/dashboard/comprar");
                    localStorage.setItem("id", result.id);
                    localStorage.setItem("key", result.apiKey);
                    console.log(result.id);
                    console.log(result.apiKey);
                }
            })
            .catch(error => console.log('error', error));

    }

    const registrar = e => {

        let usuarioRegistro = nuevoUsuario.current.value;
        let passwordRegistro = nuevoPass.current.value;
        let deptoElegido = slcDeptos.current.value;
        let ciudadElegida = slcCiudades.current.value;

        fetch("https://crypto.develotion.com/usuarios.php", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "usuario": usuarioRegistro,
                "password": passwordRegistro,
                "idDepartamento": deptoElegido,
                "idCiudad": ciudadElegida,
            }),
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result.codigo === 200) {
                    navigate("/dashboard/comprar");
                    localStorage.setItem("id", result.id);
                    localStorage.setItem("key", result.apiKey);
                } else {
                    alert("Error")
                }
            })
    }
    return (
        <div id="container" className={`container ${isSignUp ? "right-panel-active" : ""}`}>
            <div className="form-container sign-up-container">
                <form>
                    <img src={logo} id="logoApp" alt="logoApp" />
                    <h1>Crear cuenta</h1>
                    <input type="text" placeholder="Usuario" ref={nuevoUsuario} />
                    <input type="text" placeholder="Contraseña" ref={nuevoPass} />

                    <select placeholder="Departamentos" ref={slcDeptos} onChange={listadoCiudades}>
                        <option defaultValue="" value="" disabled selected>
                            Seleccione un departamento
                        </option>
                        {stateDeptos.map((departamento) => (
                            <option value={departamento.id} key={departamento.id}>
                                {departamento.nombre}
                            </option>
                        ))}
                    </select>
                    <select placeholder="Ciudades" ref={slcCiudades}>
                        <option defaultValue="" value="" disabled selected>
                            Seleccione una ciudad
                        </option>
                        {stateCiudades.map((ciudad) => (
                            <option value={ciudad.id} key={ciudad.id}>
                                {ciudad.nombre}
                            </option>
                        ))}
                    </select>
                    <input type="button" value="Crear cuenta" className="button" onClick={registrar} />
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form>
                    <img src={logo} id="logoApp" alt="logoApp" />
                    <h1>Iniciar sesión</h1>

                    <input type="user" placeholder="Usuario" ref={usuario} />
                    <input type="password" placeholder="Password" ref={password} />

                    <input type="button" value="Iniciar sesión" className="button" onClick={ingresar} />
                </form>
            </div>

            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>¡Bienvenido otra vez!</h1>
                        <p>
                            Para seguir conectado con nosotros, logueate con tus credenciales
                        </p>
                        <input type="button" value="Iniciar sesión" className="ghost button" id="signIn" onClick={() => setSignUp(false)} />
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>¡Hola!</h1>
                        <p>¿Sos nuevo por acá?</p>
                        <input type="button" value="Crear cuenta" className="ghost button" id="signUp" onClick={() => setSignUp(true)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login