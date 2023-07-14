import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import CryptoJS from "crypto-js"
import { toast } from 'react-toastify';



const fetchbuyer = createAsyncThunk('fetchbuyer',
    async (inforlogin) => {
        let response = await axios.get(process.env.REACT_APP_SERVER_JSON + 'buyerList')
        return {
            buyerList: response.data,
            inforlogin: inforlogin
        }
    })

const createNewUsers = createAsyncThunk(
    "createNewUsers",
    async (newUser) => {
        let res = await axios.post(process.env.REACT_APP_SERVER_JSON + 'buyerList', newUser);
        return res.data
    }
) 

const saveCart = createAsyncThunk('buyerLogin/saveCart', async (cartItems, { getState }) => {
    try {
        const buyerInfo = getState().buyerLogin.buyerInfo;
        const response = await axios.post(`${process.env.REACT_APP_SERVER_JSON}buyerList/${buyerInfo.id}`, {
            ...buyerInfo,
            cart: cartItems
        });
        return response.data.cart;
    } catch (error) {
        console.error('Error saving cart:', error);
        throw error;
    }
});

const checkTokenLocal = createAsyncThunk('checkTokenLocal',
    async (token) => {
        let response = await axios.get(process.env.REACT_APP_SERVER_JSON + 'buyerList')
        return {
            buyerList: response.data,
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


const buyerSlice = createSlice({
    name: 'buyerLogin',
    initialState: {
        loading: false,
        buyerInfo: [],
        isAuthenticated: false,
        avatar: '',
        cart:[],
        
    },
    reducers: {
        login: (state) => {
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        },
        addToCart: (state, action) => {
            const cartItem = action.payload;
            state.cart.push(cartItem);
        },
        deleteCart: (state, action)=>{
            const productId =action.payload
            console.log('action.pay', action.payload);// day la 1 obj chua price
            state.cart=state.cart.filter(item=>item.productId!== productId.productId 
              )
            
        },
        
       /*  editCart: (state, action) => {
            const { id, isEditing } = action.payload;
            state.cart = state.cart.map((item) =>
                item.id === id ? { ...item, isEditing } : item
            );
        },
        updateCart: (state, action) => {
            const { id, quantity } = action.payload;
            state.cart = state.cart.map((item) =>
                item.id === id ? { ...item, quantity, isEditing: false } : item
            );
        }, */
        
          
    },

    extraReducers: (builder) => {
        //login:
        builder.addCase(fetchbuyer.fulfilled, (state, action) => {
            let buyer = action.payload.buyerList.find(user => user.name === action.payload.inforlogin.name)
            if (!buyer) {
                toast.error('User is not found. ');
            } else {
                if (buyer.password !== action.payload.inforlogin.password) {
                    toast.error('Password is incorrect')
                }
                else {
                    state.buyerInfo = buyer
                    state.isAuthenticated = true; // Cập nhật trạng thái đã đăng nhập
                    state.avatar = buyer.avatar; // Cập nhật hình ảnh avatar
                    // tạo token và lưu vào local storage, mã hóa dữ liệu
                    let token = createToken(buyer, process.env.REACT_APP_JWT_KEY);
                    localStorage.setItem("token", token);
                }
            }
        })

        //logout: 
        builder.addCase(logout, (state) => {
            state.isAuthenticated = false;
        });

        // create new user
        builder.addCase(createNewUsers.fulfilled, (state, action) => {
            state.buyerInfo.push(action.payload)
            state.isAuthenticated = true; 
    
        });

        //cart:
        builder.addCase(saveCart.fulfilled, (state, action) => {
            state.cart = action.payload;
            console.log('action, ', action.payload);
        });

        //checktoken:
        builder.addCase(checkTokenLocal.fulfilled, (state, action) => {
            console.log("du lieu khi checktoken", action.payload)
            let deToken = checkToken(action.payload.token, process.env.REACT_APP_SERVER_JSON, process.env.REACT_APP_JWT_KEY)
            let user = action.payload.buyerList.find(user => user.name === deToken.name);
            if (deToken) {
                if (user) {
                    if (user.password === deToken.password) {
                        state.buyerInfo = user;
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

export const buyerloginActions = {
    ...buyerSlice.actions,
    fetchbuyer, checkTokenLocal, createNewUsers

}
export { saveCart }
export const { logout, login, addToCart, deleteCart, editCart, updateCart } = buyerSlice.actions;
export default buyerSlice.reducer
