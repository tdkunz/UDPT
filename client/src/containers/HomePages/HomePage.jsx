import React, { useEffect, useState } from 'react';

import Header from '../Header/Header';
import RightSidebar from '../RightSidebar/RightSidebar';
import Footer from '../Footer/Footer';
import './HomePage.scss'

const HomePage = () => {
  return (
    <React.Fragment>
        <Header/>
        <section>
          <div className='content-frame'>
            <div className='notification'>
              <ul className='display-listing'>
                <li className='listing-item'>
                  <div className='d-flex justify-content-start'>
                    <div className='item-title'>Kế hoạch nghỉ lễ 2/9 </div>
                    <span>27/08/2024</span>
                  </div>
                </li>
                <li className='listing-item'>
                  <div className='d-flex justify-content-start'>
                    <div className='item-title'>Danh sách các nhân viên tham gia hoạt động tốt tháng 07 </div>
                    <span>02/08/2024</span>
                  </div>
                </li>
                <li className='listing-item'>
                  <div className='d-flex justify-content-start'>
                    <div className='item-title'>Điều chỉnh danh sách nhân viên của các phòng ban </div>
                    <span>01/08/2024</span>
                  </div>
                </li>
                <li className='listing-item'>
                  <div className='d-flex justify-content-start'>
                    <div className='item-title'>Danh sách khen thưởng nhân viên xuất sắc quý II </div>
                    <span>10/07/2024</span>
                  </div>
                </li>
                <li className='listing-item'>
                  <div className='d-flex justify-content-start'>
                    <div className='item-title'>Danh sách các nhân viên tham gia hoạt động tốt tháng 06 </div>
                    <span>02/07/2024</span>
                  </div>
                </li>
                <li className='listing-item'>
                  <div className='d-flex justify-content-start'>
                    <div className='item-title'>Kế hoạch tổ chức du lịch </div>
                    <span>25/06/2024</span>
                  </div>
                </li>
                <li className='listing-item'>
                  <div className='d-flex justify-content-start'>
                    <div className='item-title'>Tọa đàm chia sẻ kinh nghiệm quản lý dự án </div>
                    <span>20/06/2024</span>
                  </div>
                </li>
                <li className='listing-item'>
                  <div className='d-flex justify-content-start'>
                    <div className='item-title'>Hoạt động mới: Chạy bộ </div>
                    <span>01/06/2024</span>
                  </div>
                </li>
                <li className='listing-item'>
                  <div className='d-flex justify-content-start'>
                    <div className='item-title'>Hướng dẫn sử dụng trang web nội bộ mới của công ty </div>
                    <span>15/05/2024</span>
                  </div>
                </li>
                <li className='listing-item'>
                  <div className='d-flex justify-content-start'>
                    <div className='item-title'>Thông báo nâng cấp trang web nội bộ </div>
                    <span>15/05/2024</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <RightSidebar/>
        </section>
        <Footer />
    </React.Fragment>
  );
}

export default HomePage;