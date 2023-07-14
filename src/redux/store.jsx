import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import buyerSlice from './buyerSlice'
import buyerRegisterSlice from './buyerRegisterSlice'
import adminSlice from "./adminSlice";


const store = configureStore({
    reducer: {
        product: productSlice,
        buyerLogin: buyerSlice,
        buyerRegister: buyerRegisterSlice,
        admin: adminSlice

    }
       
})

export default store