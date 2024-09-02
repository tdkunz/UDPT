import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

import Header from '../Header/Header';
import RightSidebar from '../RightSidebar/RightSidebar';
import './EditProfile.scss'
import avatar from '../../assets/avatar.png'


const EditProfile = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
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

    setSelectedDate(employee.birthDate);
  }, []);

  const uploadAvatar = async() =>{
    document.getElementById('fileInput').click();
  }

  const handleUpload = async (event) => {
    const file = event.target.files[0]; // Lấy file đầu tiên được chọn
    console.log(file);
    if (file) {
        const formData = new FormData();
        formData.append('file', file); 

        fetch(`http://localhost:8081/api/employees/${localStorage.getItem('userid')}/avatar`, { 
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
  }

  return (
    <React.Fragment>
        <Header/>
        <div class="profile-section">
            <div class="row profile">
              <div class="col l-widget">
                <div class="avatar" align="center">
                  {employee.avatar && <img src={`data:image/jpeg;base64,${employee.avatar}`} alt="Avatar" />} 
                  
                  <i class="edit-avatar fa fa-pencil-square-o" aria-hidden="true" onClick={uploadAvatar}></i>
                  <input type="file" id="fileInput" class="visually-hidden" accept="image/*" onChange={handleUpload()}></input>

                  <h3>{employee.name}</h3>
                </div>

                <div class="point row" align="center">
                  <h5> Điểm </h5>
                  <h4>{point.totalPoint}</h4>
        
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

                    <a href="/profile" type="button" class="btn btn-secondary">Trở về</a>
                  </div>
                  <form>
                    <table class="info-table table table-bordered" bordered>         
                        <tbody>
                          <tr>
                            <td class="title">Ngày sinh:</td>
                            <td>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="dd/MM/yyyy"
                                className="form-control"
                            />
                            </td>
                          </tr>
                          <tr>
                            <td class="title">Số điện thoại:</td>
                            <td><input class="form-control" type="number" name="phone" defaultValue={employee.phoneNumber}/></td>
                          </tr>
                          <tr>
                            <td class="title">Địa chỉ:</td>
                            <td><input class="form-control" type="text" name="address" defaultValue={employee.address}/></td>
                          </tr>
                          <tr>
                            <td class="title">CCCD:</td>
                            <td><input class="form-control" type="number" name="indetify" defaultValue={employee.identifyId}/></td>
                          </tr>
                          <tr>
                            <td class="title">Mã số thuế:</td>
                            <td><input class="form-control" type="number" name="tax" defaultValue={employee.taxNumber}/></td>
                          </tr>
                          <tr>
                            <td class="title">STK ngân hàng:</td>
                            <td ><input class="form-control" type="number" name="bank_account" defaultValue={employee.bankNumber}/></td>
                          </tr>
                        </tbody>
                    </table>
                  </form>
                </div>
              </div>
            </div>

          {/* <RightSidebar/> */}
        </div>
    </React.Fragment>
  );
}

export default EditProfile;