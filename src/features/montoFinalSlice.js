import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    montoFinal: 0,
    totalVentas: 0,
    totalCompras: 0,
}

export const montoFinalSlice = createSlice({
    name: "resultado",
    initialState,
    reducers: {
        agregarVenta: (state, action) => {
            state.totalVentas = state.totalVentas + action.payload;
            console.log(action.payload);
        },
        agregarCompra: (state, action) => {
            console.log(action.payload);
            state.totalCompras = state.totalCompras + action.payload;
        },
        montoFinal: (state) => {
            state.montoFinal = state.totalVentas - state.totalCompras;
            console.log(state.montoFinal);
        }
    }

})

export const { agregarVenta, agregarCompra, montoFinal } = montoFinalSlice.actions;

export default montoFinalSlice.reducer;