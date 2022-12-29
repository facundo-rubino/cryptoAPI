import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    ultima1: [],
    ultima2: [],
    ultima3: [],
    ultima4: [],
    ultima5: [],
    ultima6: [],
    ultima7: [],
    ultima8: [],
    ultima9: [],
}

export const ultimasTransaccionesSlice = createSlice({
    name: "ultimasTransacciones",
    initialState,
    reducers: {
        agregar1: (state, action) => {
            state.ultima1 = action.payload;
        },
    }
})


export const { agregar1 } = ultimasTransaccionesSlice.actions;

export default ultimasTransaccionesSlice.reducer;