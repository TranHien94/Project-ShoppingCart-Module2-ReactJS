import React, { Fragment, useEffect, useState } from 'react'
import '../styles/Buyerregister.scss'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { buyerloginActions } from '../redux/buyerSlice';
import { Link, useNavigate } from 'react-router-dom';


export default function BuyerRegister() {
  const navigate = useNavigate()
 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name === '' || email === '' || phoneNumber === '' || password === '') {
      toast.error('Please fill in all fields');
      return;
    }

    const newUser = {
      name,
      email,
      phoneNumber,
      password,
      block: false,
      avatar:"",
      cart: []
    };

    dispatch(buyerloginActions.createNewUsers(newUser));
   
    // Reset form fields
    setName('');
    setEmail('');
    setPhoneNumber('');
    setPassword('');
    navigate('/');
  };

  return (
    <>

      <div className="userForm-container">
        <form className="forms" onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                User Name
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon2">
                Email
              </span>
            </div>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              aria-label="Email"
              aria-describedby="basic-addon2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon3">
                Phone Number
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Phone Number"
              aria-label="Phone Number"
              aria-describedby="basic-addon3"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon4">
                Password
              </span>
            </div>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
           
            
            <Link to={"/"}>
              <button type="submit" className="btn btn-primary">
                Cancle
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
   
  )
}
