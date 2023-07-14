import React, { Fragment, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { buyerRegisterActions } from '../redux/buyerRegisterSlice'
import Loading from '../components/Loading'
import UserForm from '../components/UserForm'


export default function AdminManager() {
    const dispatch = useDispatch();
    const counterStore = useSelector(store => store.buyerRegister)

    useEffect(() => {
        dispatch(buyerRegisterActions.findAllUsers())
    }, [])

    // điều khiển user form
    const [showUserForm, setShowUserForm] = useState(false);
    const [dataForm, setDataForm] = useState(null);
    return (
        <div>
            {
                counterStore.loading ? <Loading /> : <></>
            }
            {
                showUserForm ? <UserForm dataForm={dataForm}></UserForm> : <></>
            }
            <h1>ADMIN MANAGE</h1>
          
            {
                counterStore.users.map((user) =>
                    <Fragment key={user.id}>
                        <div onContextMenu={(e) => {
                            e.preventDefault() // hủy hành vi mặc định của chuột phải
                            dispatch(buyerRegisterActions.setStatusUser(
                                {
                                    userId: user.id,
                                    patchData: {
                                        block: !user.block
                                    }
                                }
                            ))
                        }} style={{ textDecoration: user.block ? "line-through" : "" }}>UserName: {user.name}, UserId: {user.id}, UserEmail: {user.email}, User Phone Number: {user.phoneNumber}</div>
                        <button onClick={() => {
                            console.log("delete", user.id)
                            dispatch(buyerRegisterActions.deleteUserById(user.id))
                        }} type="button" className="btn btn-danger">Delete</button>
                        <button onClick={() => {
                            setShowUserForm(true)
                            setDataForm({
                                functionCloseForm: setShowUserForm,
                                type: 'update', // loại form: add: thêm, update: cập nhật
                                functionSubmit: buyerRegisterActions.updateUser,
                                preData: user
                            })
                        }} type="button" className="btn btn-success">Edit</button>
                    </Fragment>
                )
            }
            <br></br>
            <Outlet></Outlet>
        </div>
    )
}