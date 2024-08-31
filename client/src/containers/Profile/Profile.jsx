import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import RightSidebar from '../RightSidebar/RightSidebar';
import './Profile.scss'
import avatar from '../../assets/avatar.png'
import axios from "axios";


const Profile = () => {
  const [employee, setEmployee] = useState({});

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

    fetchEmployee();
  }, []);
  return (
    <React.Fragment>
        <Header/>
        <div class="profile-section">
            <div class="row profile">
              <div class="col l-widget">
                <div class="avatar" align="center">
                  <img src={avatar}/>
                  <h3>{employee.name}</h3>
                </div>

                <div class="point row" align="center">
                  <h5> Điểm </h5>
                  <h4>123456</h4>

                  <div class="col">
                    <button type="button" class="btn btn-danger">Đổi điểm</button>
                  </div>
                  <div class="col-7">
                    <button type="button" class="btn btn-success">Tham gia hoạt động</button>
                  </div>

                </div>

              </div>

              <div class="col-8">
                <div class=" row info">
                  <div align="right">
                    <a href="/edit-profile" type="button" class="btn btn-primary">Chỉnh sửa</a>
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

          {/* <RightSidebar/> */}
        </div>
    </React.Fragment>
  );
}

export default Profile;