import React, { useState, useEffect, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-bootstrap-time-picker';

import './AddNewTimeSheet.scss';

export function AddNewTimeSheet({show, handleClose, handleConfirm}) {
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(today);

    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Thêm thời gian làm việc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Họ tên:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Họ tên"
                    autoFocus
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Bộ phận:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Bộ phận làm việc"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label className="row">Ngày:</Form.Label>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                <Form.Label>Bắt đầu:</Form.Label>
                <TimePicker start="08:00" end="21:00" step={30} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                <Form.Label>Kết thúc:</Form.Label>
                <TimePicker start="08:00" end="21:00" step={30} />
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

export default AddNewTimeSheet;