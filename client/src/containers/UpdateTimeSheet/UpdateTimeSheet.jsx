import React, { useEffect, useState, useRef } from 'react';
import { Form, Button } from "react-bootstrap";

import Header from '../Header/Header';
import RightSidebar from '../RightSidebar/RightSidebar';
import Footer from '../Footer/Footer';
import AddNewTimeSheet from './AddNewTimeSheet';
import DetailUpdate from './DetailUpdate';
import './UpdateTimeSheet.scss';

const UpdateTimeSheet = () => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);

  const handleShowAdd = () => {
    setIsOpenAdd(true);
  }

  const handleCloseAdd = () => {
    setIsOpenAdd(false);
  }

  const handleConfirmAdd = () => {
    handleCloseAdd()
  }

  const handleShowDetail = () => {
    setIsOpenDetail(true);
  }

  const handleCloseDetail = () => {
    setIsOpenDetail(false);
  }

  const handleConfirmDetail = () => {
    handleCloseDetail()
  }

  return (
    <React.Fragment>
      <Header />
      <section>
        <div className='content-frame'>
          <div className="d-flex align-items-center m-3 update-timesheet-header">
            <div className="col-md-6">
              <div className="mb-3">
                  <h5 className="card-title">Update Time-sheet List</h5>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
                <Button onClick={handleShowAdd}>Thêm mới</Button>
              </div>
            </div>
          </div>
          <div className="list-frame">
            <div className="col-lg-12">
              <div className="update-timesheet-history">
                <table className="table uts-table table-nowrap align-middle table-borderless">
                  <thead className='sticky-header'>
                    <tr>
                      <th scope="col">Ngày</th>
                      <th scope="col">Bắt đầu</th>
                      <th scope="col">Kết thúc</th>
                      <th scope="col">Trạng thái</th>
                      <th scope="col">Chi tiết</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>03/07/2024</td>
                      <td>8:00</td>
                      <td>17:00</td>
                      <td>
                        <span className="badge badge-soft-success mb-0">
                          Đã duyệt
                        </span>
                      </td>
                      <td>
                        <span className='text-decoration-underline detail'
                              onClick={handleShowDetail}>
                          Xem thêm
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <RightSidebar/>
      </section>
      <Footer />
      <AddNewTimeSheet show = {isOpenAdd}
                      handleClose = {handleCloseAdd}
                      handleConfirm = {handleConfirmAdd}
      />
      <DetailUpdate show = {isOpenDetail}
                      handleClose = {handleCloseDetail}
                      handleConfirm = {handleConfirmDetail}
      />
    </React.Fragment>
  );
}

export default UpdateTimeSheet;