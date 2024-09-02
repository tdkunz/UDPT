import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useAuth } from '../../services/auth';
import axios from 'axios';

import './Header.scss';
import avatar from '../../assets/avatar.png';

const Header = () => {
    const { isLoggedIn, login, logout } = useAuth();
    const [fullName, setFullName] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const role = localStorage.getItem('role');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Sửa lại thành localhost
            const response = await axios.post('http://localhost:8081/api/users/login', formData);
            if (response.status === 200) {
                localStorage.setItem('userid', response.data.id);
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('isLoggedIn', true);
                login();
                navigate('/');
            } else {
                const message = response.data.message || 'An error occurred while logging in';
                alert(message);
            }
        } catch (error) {
            const message = error.response?.data?.message || 'An error occurred while logging in';
            alert(message);
        }
    };

    useEffect(() => {
        const fetchFullName = async () => {
            try {
                const userId = localStorage.getItem('userid');
                const response = await axios.get(`http://localhost:8081/api/employees/name/${userId}`);
                setFullName(response.data);
            } catch (error) {
                console.error('Error fetching full name:', error);
            }
        };

        fetchFullName();
    }, []);

    const handleLogout = async () => {
        localStorage.setItem('userid', '');
        localStorage.setItem('role', '');
        localStorage.setItem('isLoggedIn', false);
        navigate('/');
    }

    return (
        <header className='header-homepage'>
            <div className='d-flex align-items-center text-center py-3 background-top-nav'>
                <div className='header-top-nav'>
                    <div className='logo-banner-frame'>
                        <NavLink to='/'>
                            <h2>Project</h2>
                        </NavLink>
                    </div>
                    {!isLoggedIn ? (
                        <div className='header-login-frame'>
                            <Form className='login-form' onSubmit={handleSubmit}>
                                <FormControl
                                    type="text"
                                    name='username'
                                    placeholder="Username"
                                    className="mr-sm-2"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                                <FormControl
                                    type="password"
                                    name='password'
                                    placeholder="Password"
                                    className="mr-sm-2"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <Button type='submit' variant="warning">Login</Button>
                            </Form>
                        </div>
                    ) : (
                        <div>
                            <NavLink to="/profile">
                                <div className="mini-profile">
                                    <p>
                                        <b>{fullName}</b>
                                    </p>
                                    
                                </div>
                            </NavLink>
                            <a class="btn btn-dark logout-btn" onClick={handleLogout}>
                                Đăng xuất
                            </a>
                        </div>
                    )}
                </div>
            </div>
            <div className='header-menu'>
                <NavLink to='/' className='child-content'>
                    Thông báo
                </NavLink>
                <NavLink to='/leave' className='child-content'>
                    Nghỉ phép
                </NavLink>
                <NavLink to='/update-time-sheet' className='child-content'>
                    Update Time-sheet
                </NavLink>
                <NavLink to='/work-from-home' className='child-content'>
                    Work from home
                </NavLink>
                {role === "Manager" &&(
                    <NavLink to='/approve' className='child-content'>
                        Approve
                    </NavLink>
                )}
                <NavLink to='/activities' className='child-content'>
                    Activities
                </NavLink>
                {localStorage.getItem('role') == 'Manager' ? (
                    <NavLink to='/create-account' className='child-content'>
                        Create Account
                    </NavLink>
                ) : (
                    <></>
                )}
                
            </div>
        </header>
    );
};

export default Header;