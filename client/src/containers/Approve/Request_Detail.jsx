import React, { useState, useEffect, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import './Request_Detail.scss';

export function RequestDetail({show, handleClose, handleConfirm}) {

    const [rejectionReason, setRejectionReason] = useState('');
    const [accept, setAccept] = useState('Chưa duyệt');
    const [error, setError] = useState('');

    const requestInfo = {
        "Mã nhân viên": "123",
        "Họ tên": "Nguyễn Văn A",
        "Bộ phận": "Phòng kế toán",
        "Phone": "0123456789",
        "Loại yêu cầu": "Xin nghỉ",
        "Tình trạng": accept,
        "Time_start": "26/07/2024",
        "Time_end": "26/07/2024",
        "Lý do": "abc",
        "Thiết bị yêu cầu": "abc",
        "Lý do từ chối": rejectionReason
    }

    const handleSubmit = () => {
        setAccept("Chấp thuận");
        handleConfirm();
    }

    const handleReject = () => {
        if (rejectionReason.trim() === '') {
            setError('Lý do từ chối không được để trống.');
        } else {
            setError('');
            setAccept("Từ chối");
            handleClose();
        }
    };

    useEffect(() => {
        if (accept !== "Chưa duyệt") {
            console.log("Request Info: ", requestInfo)
        }
    }, [accept]);

    return (
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết yêu cầu</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column">
                <div className="first-info">
                    <Form className="d-flex justify-content-between flex-wrap">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Mã nhân viên:</Form.Label>
                            <Form.Control
                                type="text"
                                value={"123"}
                                autoFocus
                                disabled
                                // style={{ backgroundColor: '#fff', color: '#000' }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Họ tên:</Form.Label>
                            <Form.Control
                                type="text"
                                value={"Nguyễn Văn A"}
                                autoFocus
                                disabled
                                // style={{ backgroundColor: '#fff', color: '#000' }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Bộ phận:</Form.Label>
                            <Form.Control
                                type="text"
                                value={"Phòng kế toán"}
                                disabled
                                // style={{ backgroundColor: '#fff', color: '#000' }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Mã yêu cầu:</Form.Label>
                            <Form.Control
                                type="text"
                                value={"123"}
                                disabled
                                // style={{ backgroundColor: '#fff', color: '#000' }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Loại yêu cầu:</Form.Label>
                            <Form.Control
                                type="text"
                                value={"Xin nghỉ"}
                                disabled
                                // style={{ backgroundColor: '#fff', color: '#000' }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Trạng thái:</Form.Label>
                            <Form.Control
                                type="text"
                                value={accept}
                                disabled
                                className={
                                    accept === 'Chưa duyệt'
                                      ? 'badge-soft-warning'
                                      : accept === 'Chấp thuận'
                                      ? 'badge-soft-success'
                                      : accept === 'Từ chối'
                                      ? 'badge-soft-danger'
                                      : ''
                                }
                            />
                        </Form.Group>
                    </Form>
                </div>
                <div>
                    <Form className="d-flex justify-content-between flex-wrap">
                        <Form.Group className="mb-3 date-info" controlId="exampleForm.ControlInput1">
                            <Form.Label>Từ ngày:</Form.Label>
                            <Form.Control
                                type="text"
                                value={"26/07/2024"}
                                autoFocus
                                disabled
                                style={{ backgroundColor: '#fff', color: '#000' }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 date-info" controlId="exampleForm.ControlInput1">
                            <Form.Label>Đến hết ngày:</Form.Label>
                            <Form.Control
                                type="text"
                                value={"26/07/2024"}
                                autoFocus
                                disabled
                                style={{ backgroundColor: '#fff', color: '#000' }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 w-75" controlId="exampleForm.ControlInput2">
                            <Form.Label>Lý do yêu cầu:</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={"abc"}
                                disabled
                                style={{ backgroundColor: '#fff', color: '#000' }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 w-75" controlId="exampleForm.ControlInput2">
                            <Form.Label>Thiết bị yêu cầu:</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={"abc"}
                                disabled
                                style={{ backgroundColor: '#fff', color: '#000' }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 w-75" controlId="exampleForm.ControlInput2">
                            <Form.Label>Lý do từ chối:</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Lý do từ chối"
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                disabled={accept !== 'Chưa duyệt'}
                                style={{
                                    backgroundColor: accept !== 'Chưa duyệt' ? '' : '#fff',
                                    color: accept !== 'Chưa duyệt' ? '#000' : '#888',
                                    cursor: accept !== 'Chưa duyệt' ? 'not-allowed' : 'text'
                                }}
                            />
                        </Form.Group>
                        {error && <div className="text-danger">{error}</div>}
                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Thoát
                </Button>
                <Button variant="danger" className={`${accept !== 'Chưa duyệt' ? 'd-none' : ''}`} onClick={handleReject}>
                    Từ chối
                </Button>
                <Button variant="primary" className={`${accept !== 'Chưa duyệt' ? 'd-none' : ''}`} onClick={handleSubmit}>
                    Duyệt
                </Button>
            </Modal.Footer>
        </Modal>
     );
}

export default RequestDetail;