import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import axios from 'axios';
import './Profile.scss';

const Profile = () => {
  const [employee, setEmployee] = useState({});
  const [point, setPoint] = useState({});
  const [vouchers, setVouchers] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const employeeId = localStorage.getItem('userid');

    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/employees/${employeeId}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    const fetchPoint = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/points/${employeeId}`);
        setPoint(response.data);
      } catch (error) {
        console.error('Error fetching point data:', error);
      }
    };

    const fetchVouchers = async () => {
      try {
        const response = await axios.get(`https://university-of-science.sandbox.vouchery.app/api/v2.1/customers/${employeeId}/vouchers`, {
          headers: {
            'Authorization': `Bearer 44ea1ba880c3d4df6a9954bfb44644177b6efdc2b605151d5ca64696f7d365c2`
          }
        });
        setVouchers(response.data);
      } catch (error) {
        console.error('Error fetching vouchers:', error);
      }
    };

    fetchEmployee();
    fetchPoint();
    fetchVouchers();
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

                {/*<div className="col">*/}
                {/*  <button type="button" className="btn btn-danger">Đổi điểm</button>*/}
                {/*</div>*/}
                <div className="col-6">
                  <Button variant="primary" onClick={handleShow}>
                    {localStorage.getItem('role') === 'Manager' ? 'Lịch sử cho điểm' : 'Lịch sử nhận điểm'}
                  </Button>
                </div>
                {localStorage.getItem('role') === 'Manager' ? (
                    <div className="col">
                      <a href="give-point" type="button" className="btn btn-success">Cho điểm</a>
                    </div>
                ) : null}
              </div>
            </div>

            <div className="col-8">
              <div className="row info">
                <div align="right">
                  <a href="/edit-profile" type="button" className="btn btn-primary">Chỉnh sửa</a>
                </div>

                <table className="info-table table table-bordered">
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

          <div className="voucher-history">
            <h5>Danh sách voucher đã đổi</h5>
            <hr />
            <table className="table table-hover voucher-table">
              <thead>
              <tr>
                <th scope="col">Tên Voucher</th>
                <th scope="col">Mã Voucher</th>
                <th scope="col">Nội dung</th>
                <th scope="col">Ngày hết hạn</th>
              </tr>
              </thead>
              <tbody>
              {vouchers.map(voucher => (
                  <tr key={voucher.id}>
                    <td><b>{voucher.campaign.name}</b></td>
                    <td><i>{voucher.code}</i></td>
                    <td>{voucher.campaign.description}</td>
                    <td>{voucher.expires_at ? new Date(voucher.expires_at).toLocaleDateString() : 'N/A'}</td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title><b>Lịch sử nhận điểm</b></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className="table">
              <thead>
              <tr>
                <th>Điểm nhận được</th>
                <th>Lời nhắn</th>
              </tr>
              </thead>
              <tbody>
              {point.historyPoints && point.historyPoints.length > 0 ? (
                  point.historyPoints.map((pnt, index) => (
                      <tr key={index}>
                        <td>{pnt.pointsSent}</td>
                        <td>{pnt.message || 'Không có lời nhắn'}</td>
                      </tr>
                  ))
              ) : (
                  <tr>
                    <td colSpan="2">Không có dữ liệu</td>
                  </tr>
              )}
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
  );
};

export default Profile;