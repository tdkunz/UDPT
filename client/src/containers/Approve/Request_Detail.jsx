import React, { useState, useEffect, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

import './Request_Detail.scss';

export function RequestDetail({show, id, handleClose, handleConfirm}) {

    const [rejectionReason, setRejectionReason] = useState(null);
    const [accept, setAccept] = useState('Chưa duyệt');
    const [error, setError] = useState('');
    const [requestData, setRequestData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // API lấy thông tin chi tiết request
                const response = await axios.get(`https://localhost:8080/api/requests/${id}`);
                if (response.status === 200) {
                    
                    setRequestData(response.data);
                    
                } else {
                    console.error("Error fetching user data");
                }
            } catch (error) {
                console.error("Error during API request:", error);
            }
        };
        fetchData();
    }, []);

    const requestInfo = {
        "id": requestData.id,
        "status": accept,
        "reasonReject": rejectionReason
    }

    const handleSubmit = async (event) => {
        setAccept("Chấp thuận");
        try {
            // API cập nhật trường Status của request thành "Chấp thuận"
            const response = await axios.put(`http://localhost:8080/api/requests/${id}`, requestInfo);
            console.log('Response:', response.data);
            if (response.status === 200) {
                alert('Cập nhật thành công');
            } else {
                const message = response.data.message || 'An error occurred while login';
                alert(message);
            }
        } catch (error) {
            const message = error.response?.data?.message || 'An error occurred while update';
            alert(message)
        }
        handleConfirm();
    }

    const handleReject = async (event) => {
        if (rejectionReason.trim() === '') {
            setError('Lý do từ chối không được để trống.');
        } else {
            setError('');
            setAccept("Từ chối");
            try {
                // API cập nhật trường Status của request thành "Từ chối" và cập nhật lý do từ chối
                const response = await axios.put(`http://localhost:8080/api/requests/${id}`, requestInfo);
                console.log('Response:', response.data);
                if (response.status === 200) {
                    alert('Cập nhật thành công');
                } else {
                    const message = response.data.message || 'An error occurred while login';
                    alert(message);
                }
            } catch (error) {
                const message = error.response?.data?.message || 'An error occurred while update';
                alert(message)
            }
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
                        <Form.Group className="mb-3 custom-width">
                            <Form.Label>Mã nhân viên:</Form.Label>
                            <Form.Control
                                type="text"
                                value={requestData.employeeId}
                                autoFocus
                                disabled
                                // style={{ backgroundColor: '#fff', color: '#000' }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 custom-width">
                            <Form.Label>Họ tên:</Form.Label>
                            <Form.Control
                                type="text"
                                value={requestData.employeeName}
                                autoFocus
                                disabled
                                // style={{ backgroundColor: '#fff', color: '#000' }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 custom-width">
                            <Form.Label>Loại yêu cầu:</Form.Label>
                            <Form.Control
                                type="text"
                                value={requestData.requestType}
                                disabled
                                // style={{ backgroundColor: '#fff', color: '#000' }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 custom-width">
                            <Form.Label>Trạng thái:</Form.Label>
                            <Form.Control
                                type="text"
                                value={requestData.status}
                                disabled
                                className={
                                    requestData.status === 'Chưa duyệt'
                                      ? 'badge-soft-warning'
                                      : requestData.status === 'Chấp thuận'
                                      ? 'badge-soft-success'
                                      : requestData.status === 'Từ chối'
                                      ? 'badge-soft-danger'
                                      : ''
                                }
                            />
                        </Form.Group>
                    </Form>
                </div>
                <div>
                    <Form className="d-flex justify-content-between flex-wrap">
                        {requestData.requestType !== 'Update' ? (
                        <>
                            <Form.Group className="mb-3 custom-width">
                                <Form.Label>Bắt đầu:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={requestData.timeStart}
                                    autoFocus
                                    disabled
                                    style={{ backgroundColor: '#fff', color: '#000' }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 custom-width">
                                <Form.Label>Kết thúc:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={requestData.timeEnd}
                                    autoFocus
                                    disabled
                                    style={{ backgroundColor: '#fff', color: '#000' }}
                                />
                            </Form.Group>
                        </>
                        ) : (
                        <>
                            <Form.Group className="mb-3 d-none w-25">
                                <Form.Label>Ngày:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={requestData.day}
                                    autoFocus
                                    disabled
                                    style={{ backgroundColor: '#fff', color: '#000' }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 d-none w-25">
                                <Form.Label>Bắt đầu:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={requestData.timeStart}
                                    autoFocus
                                    disabled
                                    style={{ backgroundColor: '#fff', color: '#000' }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 d-none w-25">
                                <Form.Label>Kết thúc:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={requestData.timeEnd}
                                    autoFocus
                                    disabled
                                    style={{ backgroundColor: '#fff', color: '#000' }}
                                />
                            </Form.Group>
                        </>
                        )}
                        <Form.Group className="mb-3 w-75">
                            <Form.Label>Lý do yêu cầu:</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={requestData.reasonRequest}
                                disabled
                                style={{ backgroundColor: '#fff', color: '#000' }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 w-75">
                            <Form.Label>Thiết bị yêu cầu:</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={requestData.device}
                                disabled
                                style={{ backgroundColor: '#fff', color: '#000' }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 w-75">
                            <Form.Label>Lý do từ chối:</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Lý do từ chối"
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                disabled={accept !== 'Chưa duyệt'}
                                style={{
                                    backgroundColor: requestData.status !== 'Chưa duyệt' ? '' : '#fff',
                                    color: requestData.status !== 'Chưa duyệt' ? '#000' : '#888',
                                    cursor: requestData.status !== 'Chưa duyệt' ? 'not-allowed' : 'text'
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