import React, { useState, useEffect, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import './DetailUpdate.scss';

export function DetailUpdate({show, handleClose, handleConfirm}) {

    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Thêm thời gian làm việc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Mã nhân viên:</Form.Label>
                <Form.Control
                    type="text"
                    value={"123"}
                    autoFocus
                    disabled
                    style={{ backgroundColor: '#fff', color: '#000' }}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Họ tên:</Form.Label>
                <Form.Control
                    type="text"
                    value={"Nguyễn Văn A"}
                    autoFocus
                    disabled
                    style={{ backgroundColor: '#fff', color: '#000' }}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Bộ phận:</Form.Label>
                <Form.Control
                    type="text"
                    value={"Phòng kế toán"}
                    disabled
                    style={{ backgroundColor: '#fff', color: '#000' }}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Cập nhật ngày:</Form.Label>
                <Form.Control
                    type="text"
                    value={"26/07/2024"}
                    disabled
                    style={{ backgroundColor: '#fff', color: '#000' }}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Bắt đầu:</Form.Label>
                <Form.Control
                    type="text"
                    value={"08:00"}
                    disabled
                    style={{ backgroundColor: '#fff', color: '#000' }}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Kết thúc:</Form.Label>
                <Form.Control
                    type="text"
                    value={"17:00"}
                    disabled
                    style={{ backgroundColor: '#fff', color: '#000' }}
                />
            </Form.Group>
            <Form.Group className="mb-3 d-none" controlId="exampleForm.ControlInput2">
                <Form.Label>Lý do từ chối:</Form.Label>
                <Form.Control
                    as="textarea"
                    value={"abc"}
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

export default DetailUpdate;