import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/store';

import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import NoEncontrado from './components/NoEncontrado/NoEncontrado';
import Comprar from "./components/Dashboard/Main/Comprar/Comprar";
import Transacciones from "./components/Dashboard/Main/Transacciones/Transacciones";
import Sugerencias from "./components/Dashboard/Main/Sugerencias/Sugerencias";
import Graficas from "./components/Dashboard/Main/Graficas/Graficas";

function App() {
  return (

    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NoEncontrado />} />

          <Route path="/dashboard" element={<Dashboard />} >
            <Route path="comprar" element={<Comprar />} />
            <Route path="transacciones" element={<Transacciones />} />
            <Route path="sugerencias" element={<Sugerencias />} />
            <Route path="graficas" element={<Graficas />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>


  );
}

export default App;
