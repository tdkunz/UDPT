import React, { useState, useEffect, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import './DetailLeave.scss';

export function DetailLeave({show, handleClose, handleConfirm}) {

    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Đơn xin nghỉ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Mã nhân viên:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="123"
                    autoFocus
                    disabled
                    style={{ backgroundColor: '#fff', color: '#000' }}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Họ tên:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nguyễn Văn A"
                    autoFocus
                    disabled
                    style={{ backgroundColor: '#fff', color: '#000' }}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Bộ phận:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Bộ phận làm việc"
                    disabled
                    style={{ backgroundColor: '#fff', color: '#000' }}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Nghỉ từ ngày:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="26/07/2024"
                    disabled
                    style={{ backgroundColor: '#fff', color: '#000' }}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Đến hết ngày:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="26/07/2024"
                    disabled
                    style={{ backgroundColor: '#fff', color: '#000' }}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Lý do:</Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder="Đi bệnh viện"
                    disabled
                    style={{ backgroundColor: '#fff', color: '#000' }}
                />
            </Form.Group>
            <Form.Group className="mb-3 d-none" controlId="exampleForm.ControlInput2">
                <Form.Label>Lý do từ chối:</Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder="abc"
                    disabled
                    style={{ backgroundColor: '#fff', color: '#000' }}
                />
            </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Thoát
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
            Xác nhận
        </Button>
        </Modal.Footer>
    </Modal>
     );
}

export default DetailLeave;