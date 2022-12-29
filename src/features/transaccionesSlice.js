import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    transacciones: [],
}

export const transaccionesSlice = createSlice({
    name: "transacciones",
    initialState,
    reducers: {
        guardarTransaccion: (state, action) => {
            state.transacciones = action.payload;
        },
    }
})


export const { guardarTransaccion } = transaccionesSlice.actions;

export default transaccionesSlice.reducer;