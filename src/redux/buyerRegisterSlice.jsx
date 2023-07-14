import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import CryptoJS from "crypto-js"
import { toast } from 'react-toastify';




const findAllUsers = createAsyncThunk(
    "findAllUsers",
    async () => {
        let res = await axios.get(process.env.REACT_APP_SERVER_JSON + 'buyerList');
        return res.data
    }
)

const deleteUserById = createAsyncThunk(
    "deleteUserByid",
    async (userId) => {
        let res = await axios.delete(process.env.REACT_APP_SERVER_JSON + 'buyerList/' + userId);
        return userId
    }
)

const updateUser = createAsyncThunk(
    "updateUser",
    async (dataObj) => {
        console.log("dataObj dataObj", dataObj)
        let res = await axios.put(process.env.REACT_APP_SERVER_JSON + 'buyerList/' + dataObj.userId, dataObj.editData);
        return res.data
    }
)


const setStatusUser = createAsyncThunk(
    "setStatusUser",
    async (dataObj) => {
        console.log("dataObj dataObj", dataObj)
        let res = await axios.patch(process.env.REACT_APP_SERVER_JSON + 'buyerList/' + dataObj.userId, dataObj.patchData);
        return res.data
    }
)

const buyerRegisterSlice = createSlice({
    name: 'buyerRegister',
    initialState: {
        loading: false,
        users: []
    },
    reducers: {
       
    },
    extraReducers: (builder) => {
        // find all users
        builder.addCase(findAllUsers.fulfilled, (state, action) => {
            state.users = [...action.payload]
        });
        
        // delete user
        builder.addCase(deleteUserById.fulfilled, (state, action) => {
            console.log("đã vào fulfilled", action.payload)
            state.users = state.users.filter(user => user.id != action.payload)
        });
        // edit user
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.users = state.users.map(user => {
                if (user.id == action.payload.id) {
                    return action.payload
                }
                return user
            })
        });
        // set status user
        builder.addCase(setStatusUser.fulfilled, (state, action) => {
            state.users = state.users.map(user => {
                if (user.id == action.payload.id) {
                    return action.payload
                }
                return user
            })
        });
        // xử lý các pending và rejected
        builder.addMatcher(
            (action) => {
                if (action.meta) {
                    return action
                }
            },
            (state, action) => {
                if (action.meta) {
                    if (action.meta.requestStatus == "pending") {
                        console.log("đã vào pending của api: ", action.type)
                        // if (action.type == "deleteUserByid/pending") {
                        //     console.log("trường hợp pending của api delete")
                        // }
                        state.loading = true;
                    }
                    if (action.meta.requestStatus == "rejected") {
                        //console.log("đã vào rejected của api: ", action.type)
                        state.loading = false;
                    }
                    if (action.meta.requestStatus == "fulfilled") {
                        //console.log("đã vào fulfilled của api: ", action.type)
                        state.loading = false;
                    }
                }
            }
        );
    }
}
)

export const buyerRegisterActions = {
    ...buyerRegisterSlice.actions,
    findAllUsers,
       deleteUserById,
    updateUser,
    setStatusUser
}
export default buyerRegisterSlice.reducer;