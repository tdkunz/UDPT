import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import RightSidebar from '../RightSidebar/RightSidebar';
import './Profile.scss';
import axios from 'axios';

const Profile = () => {
  const [employee, setEmployee] = useState({});
  const [point, setPoint] = useState({});

  useEffect(() => {
    const employeeId = localStorage.getItem('userid'); // Retrieve employee ID from local storage

    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/employees/${employeeId}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    const fetchPoint = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/points/${employeeId}`);
        setPoint(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployee();
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
                <div className="col-7">
                  <button type="button" className="btn btn-success">Tham gia hoạt động</button>
                </div>
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
      </React.Fragment>
  );
};

export default Profile;