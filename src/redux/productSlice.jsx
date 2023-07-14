import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const fetchProduct = createAsyncThunk('fetchProduct', 
async()=>{
    let response = await axios.get(process.env.REACT_APP_SERVER_JSON + 'users');
    return response.data;
})


const productSlice = createSlice({
    name: 'product',
    initialState:{
        listProduct: [],
        loading: false,
        error: null,
    },
    reducers:{
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.listProduct = action.payload;
        });
        builder.addCase(fetchProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
})

export const { setLoading, setError } =productSlice.actions;
export {fetchProduct}
export default productSlice.reducer