import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Navigate, Link } from 'react-router-dom';
import { Form, FormControl, Button } from 'react-bootstrap';

import './Header.scss';

const Header = () => {
  return (
    <header className='header-homepage'>
        <div className='d-flex align-items-center text-center py-3 background-top-nav'>
            <div className='header-top-nav'>
                <div className='logo-banner-frame'>
                    <NavLink to = '/'>
                        <h2>Project</h2>
                    </NavLink>
                </div>
                <div className='header-login-frame'>
                    <Form className='login-form'>
                        <FormControl type="text" placeholder="Username" className="mr-sm-2" />
                        <FormControl type="password" placeholder="Password" className="mr-sm-2" />
                        <Button variant="warning">Login</Button>
                    </Form>
                </div>
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
        </div>
    </header>
  );
}

export default Header;