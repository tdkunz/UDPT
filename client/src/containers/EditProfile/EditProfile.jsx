import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Header from '../Header/Header';
import RightSidebar from '../RightSidebar/RightSidebar';
import './EditProfile.scss'
import avatar from '../../assets/avatar.png'


const EditProfile = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);

  return (
    <React.Fragment>
        <Header/>
        <div class="profile-section">
            <div class="row profile">
              <div class="col l-widget">
                <div class="avatar" align="center">
                  <img src={avatar}/>
                  <i class="edit-avatar fa fa-pencil-square-o" aria-hidden="true"></i>
                  {/* <input type="file" id="fileInput" class="hidden-file-input"></input> */}
                  <input class="edit-name form-control" type="text" name="name" defaultValue="Nguyễn Văn A"/>
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
                            <td><input class="form-control" type="number" name="phone" defaultValue=""/></td>
                          </tr>
                          <tr>
                            <td class="title">Địa chỉ:</td>
                            <td><input class="form-control" type="text" name="address" defaultValue=""/></td>
                          </tr>
                          <tr>
                            <td class="title">CCCD:</td>
                            <td><input class="form-control" type="number" name="indetify" defaultValue=""/></td>
                          </tr>
                          <tr>
                            <td class="title">Mã số thuế:</td>
                            <td><input class="form-control" type="number" name="tax" value=""/></td>
                          </tr>
                          <tr>
                            <td class="title">STK ngân hàng:</td>
                            <td ><input class="form-control" type="number" name="bank_account" defaultValue=""/></td>
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