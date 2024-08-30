import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Navigate, Link } from 'react-router-dom';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useAuth } from '../../services/auth';

import './Header.scss';

import avatar from '../../assets/avatar.png'

const Header = () => {
    const { isLoggedIn, login, logout } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // làm với api
        // try {
        //     const response = await axios.post('http://localhost:8080/api/auth/login', formData);
        //     if (response.status === 200) {

        //         // Muốn lưu gì trong local thì làm ở đây 
        //         // localStorage.setItem('accessToken', response.data.accessToken);
        //         // localStorage.setItem('employeeId', response.data.customerId);
        //         localStorage.setItem('isLoggedIn', true);
        //         navigate('/');
        //         login();
        //     } else {
        //         const message = response.data.message || 'An error occurred while login';
        //         alert(message);
        //     }
        // } catch (error) {
        //     const message = error.response?.data?.message || 'An error occurred while login';
        //     alert(message)

        // }
        console.log("Login data: ", formData)
    };

    return (
        <header className='header-homepage'>
            <div className='d-flex align-items-center text-center py-3 background-top-nav'>
                <div className='header-top-nav'>
                    <div className='logo-banner-frame'>
                        <NavLink to = '/'>
                            <h2>Project</h2>
                        </NavLink>
                    </div>
                    { !isLoggedIn ? (
                        <div className='header-login-frame'>
                            <Form className='login-form' onSubmit={handleSubmit}>
                                <FormControl type="text" 
                                            name = 'username' 
                                            placeholder="Username" 
                                            className="mr-sm-2" 
                                            value={formData.username}
                                            onChange={handleChange}
                                            required />
                                <FormControl type="password" 
                                            name = 'password'
                                            placeholder="Password" 
                                            className="mr-sm-2"
                                            value={formData.password}
                                            onChange={handleChange} 
                                            required />
                                <Button type='submit' variant="warning">Login</Button>
                            </Form>
                        </div>
                    ) : (
                        <NavLink to="/profile"> 
                            <div class="mini-profile" >
                                <p>
                                    <b>Nguyễn Văn A</b>
                                </p>
                                <img src={avatar} />
                            </div>
                        </NavLink>
                    )}
                </div>

                
            </div>
            <div className='header-menu'>
                <NavLink to = '/' className='child-content'>
                    Thông báo
                </NavLink>
                <NavLink to = '/leave' className='child-content'>
                    Nghỉ phép
                </NavLink>
                <NavLink to = '/update-time-sheet' className='child-content'>
                    Update Time-sheet
                </NavLink>
                <NavLink to = '/work-from-home' className='child-content'>
                    Work from home
                </NavLink>
                <NavLink to = '/approve' className='child-content'>
                    Approve
                </NavLink>
                <NavLink to = '/activities' className='child-content'>
                    Activities
                </NavLink>
            </div>
        </header>
    );
}

export default Header;