import { configureStore } from '@reduxjs/toolkit';
import montoFinalReducer from '../features/montoFinalSlice';
import transaccionesReducer from "../features/transaccionesSlice";
import monedasReducer from "../features/monedasSlice";

export const store = configureStore({
    reducer: {
        montoFinal: montoFinalReducer,
        transacciones: transaccionesReducer,
        monedas: monedasReducer
    },
})