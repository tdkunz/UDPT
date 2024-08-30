import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import RightSidebar from '../RightSidebar/RightSidebar';
import './Profile.scss'
import avatar from '../../assets/avatar.png'


const Profile = () => {
  return (
    <React.Fragment>
        <Header/>
        <div class="profile-section">
            <div class="row profile">
              <div class="col l-widget">
                <div class="avatar" align="center">
                  <img src={avatar}/>
                  <h3>Nguyễn Văn A</h3>
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

                  <table class="info-table table table-bordered" bordered>
                    <tbody>
                      <tr>
                        <td class="title">Ngày sinh:</td>
                        <td class="field">1/1/1970</td>
                      </tr>
                      <tr>
                        <td class="title">Số điện thoại:</td>
                        <td class="field">0123456789</td>
                      </tr>
                      <tr>
                        <td class="title">Địa chỉ:</td>
                        <td class="field">227 Nguyễn Văn Cừ, Q5, TP HCM</td>
                      </tr>
                      <tr>
                        <td class="title">CCCD:</td>
                        <td class="field">012345678910</td>
                      </tr>
                      <tr>
                        <td class="title">Mã số thuế:</td>
                        <td class="field">0987654321</td>
                      </tr>
                      <tr>
                        <td class="title">STK ngân hàng:</td>
                        <td class="field">012345678910</td>
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