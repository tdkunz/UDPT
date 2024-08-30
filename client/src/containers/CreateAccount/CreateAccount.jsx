import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Header from '../Header/Header';
import RightSidebar from '../RightSidebar/RightSidebar';
import './CreateAccount.scss'

const CreateAccount = () => {
  return (
    <React.Fragment>
        <Header/>
        <section>
        <div className='content-frame'>
          <div className="d-flex align-items-center justify-content-center m-3 wfh-header">
            <div className="mb-3">
                <h5 className="card-title">Create Account</h5>
            </div>
          </div>
          <div className='wfh-info'>
            <div className='wfh-info-content'>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label className='fw-bold'>Họ tên:</Form.Label>
                  <Form.Control
                      type="text"
                      name="name"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label className="fw-bold">Giới tính:</Form.Label>
                  <div>
                      <Form.Check
                          type="radio"
                          label="Nam"
                          name="gender"
                      />
                      <Form.Check
                          type="radio"
                          label="Nữ"
                          name="gender"
                      />
                      {/* Add more radio options here if needed */}
                  </div>
              </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label className='fw-bold'>Mã số thuế:</Form.Label>
                  <Form.Control
                      type="number"
                      name="tax"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label className='fw-bold'>CMND/CCCD:</Form.Label>
                  <Form.Control
                      type="number"
                      name="indentify"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label className='fw-bold'>Vị trí:</Form.Label>
                  <Form.Control
                      type="text"
                      name="position"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label className='fw-bold'>Bộ phận:</Form.Label>
                  <Form.Control
                      type="text"
                      name="department"
                  />
                </Form.Group>

              </Form>
              <Button>Tạo</Button>
            </div>
          </div>
        </div>
        <RightSidebar />
      </section>
    </React.Fragment>
  );
}

export default CreateAccount;