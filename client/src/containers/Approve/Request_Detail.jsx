import React, { useState, useEffect, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import './Request_Detail.scss';

export function RequestDetail({show, handleClose, handleConfirm}) {

    const [rejectionReason, setRejectionReason] = useState('');
    const [error, setError] = useState('');

    const handleReject = () => {
        if (rejectionReason.trim() === '') {
            setError('Lý do từ chối không được để trống.');
        } else {
            setError('');
            handleClose();
        }
    };

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
                            <Form.Label>Loại yêu cầu:</Form.Label>
                            <Form.Control
                                type="text"
                                value={"Xin nghỉ"}
                                disabled
                                style={{ backgroundColor: '#fff', color: '#000' }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Ngày gửi:</Form.Label>
                            <Form.Control
                                type="text"
                                value={"20/07/2024"}
                                disabled
                                style={{ backgroundColor: '#fff', color: '#000' }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Trạng thái:</Form.Label>
                            <Form.Control
                                type="text"
                                value={"Chưa chấp nhận"}
                                disabled
                                style={{ backgroundColor: 'rgba(160,173,99,.1)', color: '#ffc107' }}
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
                                style={{ backgroundColor: '#fff', color: '#000' }}
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
                <Button variant="danger" onClick={handleReject}>
                    Từ chối
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                    Duyệt
                </Button>
            </Modal.Footer>
        </Modal>
     );
}

export default RequestDetail;