import React, { useState } from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from '../Header/Header';
import RightSidebar from '../RightSidebar/RightSidebar';
import './Voucher.scss';

const Voucher = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <React.Fragment>
            <Header />
            <section>
                
                <div className='content-frame'>
                    <div className="d-flex align-items-center m-3 update-timesheet-header">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <h5 className="card-title">Danh sách Voucher</h5>
                            </div>
                        </div>
                        {localStorage.getItem('role') == 'Manager' ? (
                            <>
                            <div className="col-md-6">
                                <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
                                    <Button onClick={handleShow}>Thêm mới</Button>
                                </div>
                            </div>

                            <Modal size="lg" show={show} onHide={handleClose}>
                                <Form >
                                    <Modal.Header>
                                        <Modal.Title>Thêm Voucher</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        
                                            <Form.Group className="mb-3" controlId="Voucher-name">
                                                <Form.Label className='fw-bold'>Tên voucher:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="name"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="Voucher-code">
                                                <Form.Label className='fw-bold'>Mã Voucher:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="code"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="Voucher-date">
                                                <Form.Label className="row fw-bold">Ngày:</Form.Label>
                                                <DatePicker
                                                    name = 'date'
                                                    dateFormat="dd/MM/yyyy"
                                                    className="form-control"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="Voucher-point">
                                                <Form.Label className='fw-bold'>Số Point:</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="point"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="Voucher-detail">
                                                <Form.Label className='fw-bold'>Mô tả</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows="3"
                                                    name="identifyId"
                                                />
                                            </Form.Group>
                                            
                                        
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button type="submit" variant="primary" onClick={handleClose}>
                                            Thêm
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal>
                            </>
                        ): (<></>)}

                    </div>

                    <Nav variant="tabs" className="voucher-type" defaultActiveKey="link-1">
                        <Nav.Item>
                            <Nav.Link eventKey="link-1">Ăn uống</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-2">Thanh toán hóa đơn</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-3">Giải trí</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    
                    <table class="table table-hover" id="link-1">
                        <thead>
                            <tr>
                            <th scope="col">Tên Voucher</th>
                            <th scope="col">Mã Voucher</th>
                            <th scope="col">Nội dung</th>
                            <th scope="col">Ngày hết hạn</th>
                            <th scope="col">Point</th>
                            <th scope="col"></th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><b>Voucher 1</b></td>
                                <td><i>ABCXYZ</i></td>
                                <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit. <br />Voluptas nulla beatae nihil aut fugit, obcaecati, unde saepe, rerum incidunt<br /> inventore illo pariatur natus deserunt error magni? Fuga rerum ea reiciendis?</td>
                                <td>1/1/1970</td>
                                <td class="point">123</td>
                                <td><button class="btn btn-primary">Đổi voucher</button></td>
                            </tr>
                        
                        </tbody>
                    </table>

                    {/* <table class="table table-hover" id="link-2">
                        <thead>
                            <tr>
                            <th scope="col">Tên Voucher</th>
                            <th scope="col">Mã Voucher</th>
                            <th scope="col">Nội dung</th>
                            <th scope="col">Ngày hết hạn</th>
                            <th scope="col">Point</th>
                            <th scope="col"></th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><b>Voucher 1</b></td>
                                <td><i>ABCXYZ</i></td>
                                <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit. <br />Voluptas nulla beatae nihil aut fugit, obcaecati, unde saepe, rerum incidunt<br /> inventore illo pariatur natus deserunt error magni? Fuga rerum ea reiciendis?</td>
                                <td>1/1/1970</td>
                                <td class="point">123</td>
                                <td><button class="btn btn-primary">Đổi voucher</button></td>
                            </tr>
                        
                        </tbody>
                    </table>

                    <table class="table table-hover" id="link-3" >
                        <thead>
                            <tr>
                            <th scope="col">Tên Voucher</th>
                            <th scope="col">Mã Voucher</th>
                            <th scope="col">Nội dung</th>
                            <th scope="col">Ngày hết hạn</th>
                            <th scope="col">Point</th>
                            <th scope="col"></th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><b>Voucher 1</b></td>
                                <td><i>ABCXYZ</i></td>
                                <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit. <br />Voluptas nulla beatae nihil aut fugit, obcaecati, unde saepe, rerum incidunt<br /> inventore illo pariatur natus deserunt error magni? Fuga rerum ea reiciendis?</td>
                                <td>1/1/1970</td>
                                <td class="point">123</td>
                                <td><button class="btn btn-primary">Đổi voucher</button></td>
                            </tr>
                        
                        </tbody>
                    </table> */}
                    
                </div>
                <RightSidebar />
            </section>
        </React.Fragment>
    );
};

export default Voucher;