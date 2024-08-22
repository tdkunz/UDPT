import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-bootstrap-time-picker';

import './AddNewTimeSheet.scss';

export function AddNewTimeSheet({show, handleClose, handleConfirm}) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [sendSuccessful, setSendSuccessful] = useState(false);
    const [errorTimeEnd, setErrorTimeEnd] = useState('');
    const [timeSheetData, setTimeSheetData] = useState({
        date: today,
        time_start: "08:00",
        time_end: "08:00"
    });

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formatTime = (timeString) => {
        if (typeof timeString === 'string') {
            const [hours, minutes] = timeString.split(':');
            const seconds = '00';
            return `${hours}:${minutes}:${seconds}`;
        }
        if (typeof timeString === 'number') {
            const hours = Math.floor(timeString / 3600);
            const minutes = Math.floor((timeString % 3600) / 60);
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
        }
        return '00:00:00';
    };

    const formatDateTime = (date, timeString) => {
        const formattedDate = formatDate(date);
        const formattedTime = formatTime(timeString);
        return `${formattedDate} ${formattedTime}`;
    };

    const timeSheetInfo = {
        "Họ tên": "Nguyễn Văn A",
        "Bộ phận": "Phòng kế toán",
        "time_start": formatDateTime(timeSheetData.date, timeSheetData.time_start),
        "time_end": formatDateTime(timeSheetData.date, timeSheetData.time_end)
    };

    const handleDateChange = (date, name) => {
        setTimeSheetData({
          ...timeSheetData,
          [name]: date
        });
    };

    const handleChange = (value, name) => {
        const hours = Math.floor(value / 3600);
        const minutes = Math.floor((value % 3600) / 60);
        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

        setTimeSheetData({
            ...timeSheetData,
            [name]: formattedTime
        });
    };

    const handleSubmit = () => {
        const start = formatTime(timeSheetData.time_start);
        const end = formatTime(timeSheetData.time_end);
        if (end < start) {
            setErrorTimeEnd('Giờ kết thúc phải lớn hơn giờ bắt đầu.');
            return;
        }
        console.log("Update Info: ", timeSheetInfo);
        setSendSuccessful(true);
    }

    useEffect(() => {
        if (sendSuccessful) {
            handleConfirm();
        }
    }, [sendSuccessful, handleConfirm]);

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
                            value={"Nguyễn Văn A"}
                            disabled
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Bộ phận:</Form.Label>
                        <Form.Control
                            type="text"
                            value={"Phòng kế toán"}
                            disabled
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label className="row">Ngày:</Form.Label>
                        <DatePicker
                            name = 'date'
                            selected={timeSheetData.date}
                            onChange={(date) => handleDateChange(date, 'date')}
                            dateFormat="dd/MM/yyyy"
                            className="form-control"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                        <Form.Label>Bắt đầu:</Form.Label>
                        <TimePicker name = 'time_start' format = '24' start="08:00" end="21:00" step={30}
                                    value = {timeSheetData.time_start} 
                                    onChange={(value) => handleChange(value, 'time_start')} 
                                    required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                        <Form.Label>Kết thúc:</Form.Label>
                        <TimePicker name = 'time_end' start="08:00" end="21:00" step={30}
                                    value = {timeSheetData.time_end} 
                                    onChange={(value) => handleChange(value, 'time_end')}  
                                    required/>
                        {errorTimeEnd && <div className="text-danger mx-3">{errorTimeEnd}</div>}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Thoát
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Lưu
                </Button>
            </Modal.Footer>
        </Modal>
     );
}

export default AddNewTimeSheet;