import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

import Header from '../Header/Header';
import './EditProfile.scss';
import avatar from '../../assets/avatar.png';

const EditProfile = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [employee, setEmployee] = useState({});
  const [point, setPoint] = useState({});

  useEffect(() => {
    const employeeId = localStorage.getItem('userid');

    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/employees/${employeeId}`);
        const employeeData = response.data;
        setEmployee(employeeData);
        const [day, month, year] = employeeData.birthDate.split('/');
        const birthDate = new Date(`${year}-${month}-${day}`);
        if (!isNaN(birthDate)) {
          setSelectedDate(birthDate);
        } else {
          console.error('Invalid birthDate value:', employeeData.birthDate);
        }
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
    fetchPoint();
  }, []);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post(`http://localhost:8081/api/employees/${localStorage.getItem('userid')}/avatar`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setEmployee({ ...employee, avatar: response.data.avatar });
      } catch (error) {
        console.error('Error uploading avatar:', error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee({
        ...employee,
        [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const employeeId = localStorage.getItem('userid');
    console.log("Update Info: ", employee);
    // API gửi edit profile
    try {
      const response = await axios.put(`http://localhost:8081/api/employees/${employeeId}`, employee);
      console.log('Response:', response.data);
      if (response.status === 200) {
          alert('Gửi yêu cầu thành công');
      } else {
          const message = response.data.message || 'An error occurred while update';
          alert(message);
      }
    } catch (error) {
        const message = error.response?.data?.message || 'An error occurred while update';
        alert(message)
    }
  };

  return (
      <React.Fragment>
        <Header />
        <div className="profile-section">
          <div className="row profile">
            <div className="col l-widget">
              <div className="avatar" align="center">
                {employee.avatar ? (
                    <img src={`data:image/jpeg;base64,${employee.avatar}`} alt="Avatar" />
                ) : (
                    <img src={avatar} alt="Avatar" />
                )}
                <i className="edit-avatar fa fa-pencil-square-o" aria-hidden="true" onClick={() => document.getElementById('fileInput').click()}></i>
                <input type="file" id="fileInput" className="visually-hidden" accept="image/*" onChange={handleUpload} />
                <h3>{employee.name}</h3>
              </div>
              <div className="point row" align="center">
                <h5>Điểm</h5>
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
                  <NavLink to="/profile" className="btn btn-secondary">Trở về</NavLink>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <table className="info-table table table-bordered">
                    <tbody>
                    <tr>
                      <td className="title">Ngày sinh:</td>
                      <td>
                        <DatePicker
                            selected={selectedDate}
                            // onChange={(date) => setSelectedDate(date)}
                            dateFormat="dd/MM/yyyy"
                            className="form-control"
                            disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="title">Số điện thoại:</td>
                      <td>
                        <input 
                            className="form-control" 
                            type="number" 
                            name="phoneNumber" 
                            defaultValue={employee.phoneNumber} 
                            onChange={handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="title">Địa chỉ:</td>
                      <td>
                        <input 
                            className="form-control" 
                            type="text" 
                            name="address" 
                            defaultValue={employee.address} 
                            onChange={handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="title">CCCD:</td>
                      <td>
                        <input 
                            className="form-control" 
                            type="number" 
                            name="identifyId" 
                            defaultValue={employee.identifyId} 
                            onChange={handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="title">Mã số thuế:</td>
                      <td>
                        <input 
                            className="form-control" 
                            type="number" 
                            name="taxNumber" 
                            defaultValue={employee.taxNumber} 
                            onChange={handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="title">STK ngân hàng:</td>
                      <td>
                        <input 
                            className="form-control" 
                            type="number" 
                            name="bankNumber" 
                            defaultValue={employee.bankNumber} 
                            onChange={handleChange}
                        />
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <div align="right">
                    <button class="btn btn-primary" type="submit">
                      Xác nhận
                    </button>
                  </div>
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
  );
};

export default EditProfile;