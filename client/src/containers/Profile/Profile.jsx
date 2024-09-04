import React, { useEffect, useState } from 'react';
import {Modal, Button} from 'react-bootstrap';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import './Profile.scss';
import axios from 'axios';

const Profile = () => {
  const [employee, setEmployee] = useState({});
  const [point, setPoint] = useState({});

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    const employeeId = localStorage.getItem('userid'); // Retrieve employee ID from local storage
    console.log(employeeId);

    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/employees/${employeeId}`);
        console.log(response.data);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    const fetchPoint = async () => {
      try {
        const response = await axios.get(`http://localhost:8084/api/points/${employeeId}`);
        setPoint(response.data);
      } catch (error) {
        console.error('Error fetching point data:', error);
      }
    };

    fetchEmployee();
    fetchPoint(); // Call fetchPoint function here
  }, []);

  return (
      <React.Fragment>
        <Header />
        <div className="profile-section">
          <div className="row profile">
            <div className="col l-widget">
              <div className="avatar" align="center">
                {employee.avatar && <img src={`data:image/jpeg;base64,${employee.avatar}`} alt="Avatar" />}
                <h3>{employee.name}</h3>
              </div>

              <div className="point row" align="center">
                <h5> Điểm </h5>
                <h4>{point.totalPoint}</h4>

                <div className="col">
                  <button type="button" className="btn btn-danger">Đổi điểm</button>
                </div>
                <div className="col-6">
                  <Button variant="primary" onClick={handleShow}>
                    lịch sử nhận điểm 
                  </Button>
                </div>
                {localStorage.getItem('role') == 'Manager' ? (
                  <div className="col">
                    <a href="give-point" type="button" className="btn btn-success">Cho điểm</a>
                  </div>
                ) : (
                  <></>
                )}
                
              </div>
            </div>

            <div className="col-8">
              <div className="row info">
                <div align="right">
                  <a href="/edit-profile" type="button" className="btn btn-primary">Chỉnh sửa</a>
                </div>

                <table className="info-table table table-bordered" bordered>
                  <tbody>
                  <tr>
                    <td className="title">Ngày sinh:</td>
                    <td className="field">{employee.birthDate}</td>
                  </tr>
                  <tr>
                    <td className="title">Số điện thoại:</td>
                    <td className="field">{employee.phoneNumber}</td>
                  </tr>
                  <tr>
                    <td className="title">Địa chỉ:</td>
                    <td className="field">{employee.address}</td>
                  </tr>
                  <tr>
                    <td className="title">CCCD:</td>
                    <td className="field">{employee.identifyId}</td>
                  </tr>
                  <tr>
                    <td className="title">Mã số thuế:</td>
                    <td className="field">{employee.taxNumber}</td>
                  </tr>
                  <tr>
                    <td className="title">STK ngân hàng:</td>
                    <td className="field">{employee.bankNumber}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title><b>Lịch sử nhận điểm</b></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table>
              <tr>
                <th>Điểm nhận được</th>
                <th>Lời nhắn</th>
              </tr>
              <tr>
                {point.historyPoints.map((pnt) => {
                  <>
                  <td>{pnt.pointsSent}</td>
                  <td>{pnt.message}</td>
                  </>
                  
                })}
              </tr>
            </table>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
  );
};

export default Profile;