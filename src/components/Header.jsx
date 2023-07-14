import React, { useContext, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import '../styles/Header.scss'
import img1 from '../img/telephone.png'
import img2 from '../img/logo.png'
import img3 from '../img/cart.png'
import img10 from '../img/logo2.jpg'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/buyerSlice';
import {logoutadmin} from '../redux/adminSlice'
import { SearchContext } from './SearchContext'

export default function Header() {
    const buyerLogin = useSelector((state) => state.buyerLogin)
    const adminlogin = useSelector((state) => state.admin)
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout())
        localStorage.removeItem('token');
    }
    const handleLogoutAdmin = () => {
        dispatch(logoutadmin())
        localStorage.removeItem('token');
    }

    //search, menu
    const [searchInput, setSearchInput] = useState('');
    const { setSearch, setDropdownValue }=useContext(SearchContext)
    const handleSearch =(e)=>{
        const keyword = e.target.value;
        setSearchInput(keyword);
        setSearch(keyword);
   }
    const handleDropdownChange = (value) => {
        setDropdownValue(value);
    };

   

    return (
        <>
            <div className='container1'>
                <div className='item1'>
                    <div className='callButton1'>
                        <img src={img1} alt="" width="32" height="32" />
                    </div>
                    <div className='texts1'>
                        <div className='texts1'>ORDER NOW!</div>
                        <div className='texts1'>08 999 58568</div>
                    </div>
                </div>
                <div className='item1'>
                    <ul className='list1'>
                        <Link to={'/'}><li className='listItem1'>Homepage</li></Link>
                        <li className='listItem1'>
                            <Dropdown onSelect={handleDropdownChange}>
                                <Dropdown.Toggle style={{ backgroundColor: 'transparent', border: 'none' }}>
                                    Menu
                                </Dropdown.Toggle>
                                <Dropdown.Menu >
                                    <Dropdown.Item eventKey="">All</Dropdown.Item>
                                    <Dropdown.Item eventKey="Cookie" >Cookie</Dropdown.Item>
                                    <Dropdown.Item eventKey="Cake">Cake</Dropdown.Item>
                                    <Dropdown.Item eventKey="Cheesecake">Cheesecake</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                       

                        <li className='listItem1'>Blogs</li>

                        {!adminlogin.isAuthenticated ? (
                            <Link to={'/admin'} >
                                <img src={img2} alt="" width="160px" height="69px" className="transparent-image" />
                            </Link>
                        ) :
                            (<Link to={'/'} onClick={handleLogoutAdmin}>
                                <img src={img10} alt="" width="160px" height="69px" className="transparent-image">
                                </img></Link>)}
                        <li className='listItem1'>Events</li>


                        <Link to={'/buyerregister'}> <li className='listItem1'>Register</li></Link>

                        {buyerLogin.isAuthenticated ? (
                            <Link to={'/'}><li className='listItem1' onClick={handleLogout}>
                                <img src={buyerLogin.avatar} alt={buyerLogin.name} className='avatar-image' />
                            </li></Link>

                        ) : (<Link to={'/buyerlogin'}><li className='listItem1'>Login</li></Link>)}


                    </ul>
                </div>

                <div className='item1'>
                    <div className='search1'>
                        <input placeholder='Search...'
                            onInput={handleSearch}
                            value={searchInput}
                        ></input>
                    </div>
                    <div className='cart1'>
                        <img src={img3} alt="" width="30px" height="30px" />
                        <div className='counter1'>2</div>
                    </div>
                </div>
            </div>
        </>
    )
}
