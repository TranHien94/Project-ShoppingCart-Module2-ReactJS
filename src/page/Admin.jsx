//đây là trang đăng nhập admin

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading';
import '../styles/Buyerlogin.scss'
import { toast } from 'react-toastify';
import { adminloginActions } from '../redux/adminSlice';

import { Link, useNavigate } from 'react-router-dom';



export default function Admin() {

    const dispatch = useDispatch();
    const navigate = useNavigate()


    const adminLogin = useSelector((state) => state.admin)
    useEffect(() => {
        if (adminLogin.admin == null || !adminLogin.isAuthenticated) {
            if (localStorage.getItem('token')) {
                dispatch(adminloginActions.checkTokenLocal(localStorage.getItem("token")))
            }

        }
        else {
            navigate('/admin/manager')
        }
    }, [adminLogin.admin])

    return (

        <>
            <div className='login-container'>
                {
                    adminLogin.loading ? <Loading></Loading> : <></>
                }
                <form
                    onSubmit={(eventForm) => {
                        eventForm.preventDefault();
                        if (eventForm.target.inputUserName.value === '' ||
                            eventForm.target.inputPassword.value === '') {

                            toast.error('Please complete all information fields.');
                            return
                        }
                        dispatch(adminloginActions.fetchAdmin(
                            {
                                name: eventForm.target.inputUserName.value,
                                password: eventForm.target.inputPassword.value
                            }
                        ))

                    }}
                    className='login-form'>
                    <p className='form-title'>ADMIN LOGIN</p>
                    {/* input User Name */}
                    <div className="form-input input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">
                                username
                            </span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            name='inputUserName'
                        />
                    </div>
                    {/* input User Name */}
                    <div className="form-input input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">
                                password
                            </span>
                        </div>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            name='inputPassword'
                        />
                    </div>
                    <div className='form-title'>
                        <button type="submit" className="submit btn btn-primary ">Login</button>
                        <Link to={"/"}>
                            <button type="submit" className="submit btn btn-primary">
                                Cancle
                            </button>
                        </Link>
                    </div>


                </form>
            </div>

        </>
    )
}

