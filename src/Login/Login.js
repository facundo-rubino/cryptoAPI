import { useRef } from react


const Login = () => {

    const transicionLogin = () => {
        container.classList.add("right-panel-active");
    }
    const transicionRegistro = () => {
        container.classList.remove("right-panel-active");
    }
    /*   const signUpButton = document.querySelector('#signUp');
      const signInButton = document.querySelector('#signIn');
      const container = document.querySelector('#container'); */
    /* 
            signUpButton.addEventListener('click', () => {
                container.classList.add("right-panel-active");
            });
    
            signInButton.addEventListener('click', () => {
                container.classList.remove("right-panel-active");
            }); */
}

return (
    <div className="container">
        <div className="form-container sign-up-container">
            <form>
                <img src="./img/logoApp@2x.png" id="logoApp" alt="logoApp" />
                <h1>Crear cuenta</h1>
                <input type="text" placeholder="Usuario" />
                <input type="text" placeholder="Contraseña" />

                <select placeholder="Departamentos" >
                    <option value="1">Montevideo</option>
                    <option value="2">Rivera</option>
                    <option value="3">Maldonado</option>
                </select>
                <select placeholder="Ciudades" >
                    <option value="1">Pocitos</option>
                    <option value="2">Aires puros</option>
                    <option value="3">Cordón</option>
                </select>

                <button>Crear cuenta</button>
            </form>
            <div className="form-container sign-in-container">
                <form>
                    <img src="./img/logoApp@2x.png" id="logoApp" alt="logoApp" />
                    <h1>Iniciar sesión</h1>

                    <input type="user" placeholder="Usuario" />
                    <input type="password" placeholder="Password" />
                    <button>Iniciar sesión</button>
                </form>
            </div>
        </div>
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1>¡Bienvenido otra vez!</h1>
                    <p>
                        Para seguir conectado con nosotros, logueate con tus credenciales
                    </p>
                    <button className="ghost" id="signIn" onClick={transicionLogin}>Iniciar sesión</button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h1>¡Hola!</h1>
                    <p>¿Sos nuevo por acá?</p>
                    <button className="ghost" id="signUp" onClick={transicionRegistro} >Crear cuenta</button>
                </div>
            </div>
        </div>



    </div>
)


export default Login