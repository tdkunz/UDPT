import React, { useEffect, useState } from 'react';
import { Form, Button, Modal } from "react-bootstrap";
import axios from 'axios';

import Header from '../Header/Header';
import RightSidebar from '../RightSidebar/RightSidebar';
import Footer from '../Footer/Footer';
import './GivePoint.scss';

const GivePoint = () => {
    const [employees, setEmployees] = useState([]);
    const [show, setShow] = useState(false);
    const [curEmp, setCurEmp] = useState({
        'id': 0,
        'name': '',
        'point': 0,
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formData, setFormData] = useState({
        point: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const employeeResponse = await axios.get(`http://localhost:8080/api/employees`);
                const pointResponse = await axios.get(`http://localhost:8080/api/points`);
                const loggedInUserId = localStorage.getItem('userid');

                if (employeeResponse.status === 200 && pointResponse.status === 200) {
                    const employees = employeeResponse.data;
                    const points = pointResponse.data;

                    // Map points to employees and filter out the logged-in user
                    const updatedEmployees = employees
                        .filter(employee => employee.id !== parseInt(loggedInUserId))
                        .map(employee => {
                            const pointRecord = points.find(point => point.uid === employee.id);
                            return {
                                ...employee,
                                point: pointRecord ? pointRecord.totalPoint : 0
                            };
                        });

                    setEmployees(updatedEmployees);
                } else {
                    console.error("Error fetching data");
                }
            } catch (error) {
                console.error("Error during API request:", error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const managerId = localStorage.getItem('userid');
        const { id: employeeId } = curEmp;

        try {
            const response = await axios.post(`http://localhost:8080/api/points/send`, null, {
                params: {
                    managerId,
                    employeeId,
                    points: formData.point,
                    message: formData.message
                }
            });
            console.log('Response:', response.data);
            if (response.status === 200) {
                alert('Gửi yêu cầu thành công');
            } else {
                const message = response.data.message || 'An error occurred while updating';
                alert(message);
            }
        } catch (error) {
            const message = error.response?.data?.message || 'An error occurred while updating';
            alert(message);
        }
        handleClose();
    };

    return (
        <React.Fragment>
            <Header />
            <section>
                <div className='content-frame'>
                    <div className="d-flex align-items-center m-3 update-timesheet-header">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <h5 className="card-title">Danh sách nhân viên</h5>
                            </div>
                        </div>
                    </div>
                    <div className="list-frame">
                        <div className="col-lg-12">
                            <div className="update-timesheet-history">
                                <table className="table uts-table table-nowrap align-middle table-borderless">
                                    <thead className='sticky-header'>
                                    <tr>
                                        <th scope="col">Tên</th>
                                        <th scope="col">Ngày sinh</th>
                                        <th scope="col">Địa chỉ</th>
                                        <th scope="col">Vị trí</th>
                                        <th scope="col">Bộ phận</th>
                                        <th scope="col">Điểm</th>
                                        <th scope="col"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {employees.length > 0 ? (
                                        employees.map((employee) => (
                                            <tr key={employee.id}>
                                                <td>{employee.name}</td>
                                                <td>{employee.birthDate}</td>
                                                <td>{employee.address}</td>
                                                <td>{employee.position}</td>
                                                <td>{employee.department}</td>
                                                <td className="point">{employee.point}</td>
                                                <td>
                                                    <Button variant="primary" onClick={() => {
                                                        handleShow();
                                                        setCurEmp({
                                                            'id': employee.id,
                                                            'name': employee.name,
                                                            'point': employee.point
                                                        });
                                                    }}>
                                                        Thêm điểm
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5">Không có dữ liệu</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <RightSidebar />
            </section>
            <Footer />

            <Modal show={show} onHide={handleClose}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Modal.Header>
                        <Modal.Title className="row modal-add-point">
                            <div className="col">
                                {curEmp.name}
                            </div>
                            <div className="col" align="right">
                                Điểm: <b>{curEmp.point}</b>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className='fw-bold'>Điểm được cho: </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="point"
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className='fw-bold'>Lời nhắn: </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="message"
                                    row={3}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" onClick={handleClose}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </React.Fragment>
    );
}

export default GivePoint;