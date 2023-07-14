import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import CryptoJS from "crypto-js"
import { toast } from 'react-toastify';



const fetchAdmin = createAsyncThunk('fetchAdmin',
    async (inforlogin) => {
        let response = await axios.get(process.env.REACT_APP_SERVER_JSON + 'admin')
        return {
            admin: response.data,
            inforlogin: inforlogin
        }
    })


const checkTokenLocal = createAsyncThunk('checkTokenLocal',
    async (token) => {
        let response = await axios.get(process.env.REACT_APP_SERVER_JSON + 'admin')
        return {
            admin: response.data,
            token: token
        }
    })
//dựa vào buyerObj và privateKey tạo ra token xác thực và phân quyền người dùng
function createToken(buyerObj, privateKey) {
    return CryptoJS.AES.encrypt(JSON.stringify(buyerObj), privateKey).toString()
}

function checkToken(token, privateKey, keyEnv) {
    try {
        if (privateKey !== keyEnv) {
            return false
        }
        // giải mã
        const decryptedData = CryptoJS.AES.decrypt(token, privateKey).toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedData)
    }
    catch {
        console.log('key loi');
        return false
    }
}


const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        loading: false,
        admin: {},
        isAuthenticated: false,
        avatar: '',

    },
    reducers: {
        loginadmin: (state) => {
            state.isAuthenticated = true;
        },
        logoutadmin: (state) => {
            state.isAuthenticated = false;
        },
    },

    extraReducers: (builder) => {
        //login:
        builder.addCase(fetchAdmin.fulfilled, (state, action) => {
            let admin = action.payload.admin.find(user => user.name === action.payload.inforlogin.name)
            if (!admin) {
                toast.error('User is not found. ');
            } else {
                if (admin.password !== action.payload.inforlogin.password) {
                    toast.error('Password is incorrect')
                }
                else {
                    state.admin = admin
                    state.isAuthenticated = true; // Cập nhật trạng thái đã đăng nhập
                    state.avatar = admin.avatar; // Cập nhật hình ảnh avatar
                    // tạo token và lưu vào local storage, mã hóa dữ liệu
                    let token = createToken(admin, process.env.REACT_APP_JWT_KEY);
                    localStorage.setItem("token", token);
                }
            }
        })

        //logout: 
        builder.addCase(logoutadmin, (state) => {
            state.isAuthenticated = false;
        });

        //checktoken:
        builder.addCase(checkTokenLocal.fulfilled, (state, action) => {
            console.log("du lieu khi checktoken", action.payload)
            let deToken = checkToken(action.payload.token, process.env.REACT_APP_SERVER_JSON, process.env.REACT_APP_JWT_KEY)
            let user = action.payload.admin.find(user => user.name === deToken.name);
            if (deToken) {
                if (user) {
                    if (user.password === deToken.password) {
                        state.admin = user;
                    } else {
                        localStorage.removeItem("token")
                    }
                } else {
                    localStorage.removeItem("token")
                }
            } else {
                localStorage.removeItem("token")
            }

        })

        // xử lý các pending và rejected
        builder.addMatcher(
            (action) => {
                if (action.meta) {
                    return action
                }
            },
            (state, action) => {
                if (action.meta) {
                    if (action.meta.requestStatus === "pending") {
                        //console.log("đã vào pending của api: ", action.type)
                        // if (action.type == "deleteUserByid/pending") {
                        //     console.log("trường hợp pending của api delete")
                        // }
                        state.loading = true;
                    }
                    if (action.meta.requestStatus === "rejected") {
                        //console.log("đã vào rejected của api: ", action.type)
                        state.loading = false;
                    }
                    if (action.meta.requestStatus === "fulfilled") {
                        //console.log("đã vào fulfilled của api: ", action.type)
                        state.loading = false;
                    }
                }
            }
        );

    }
})

export const adminloginActions = {
    ...adminSlice.actions,
    fetchAdmin, checkTokenLocal

}
export const { logoutadmin, loginadmin } = adminSlice.actions;
export default adminSlice.reducer
