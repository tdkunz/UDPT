import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import Header from '../Header/Header';
import RightSidebar from '../RightSidebar/RightSidebar';
import RequestDetail from './Request_Detail';
import "./Approve.scss";
import "../UpdateTimeSheet/UpdateTimeSheet.scss";

const Approve = () => {
    const [listType, setListType] = useState('requested');
    const [isOpenDetail, setIsOpenDetail] = useState(false);

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
                            <div className="d-flex flex-wrap align-items-center justify-content-start gap-2 mb-3 button-switch">
                                <FontAwesomeIcon icon={faArrowLeft} className={`${listType === 'approved' ? '' : 'd-none'}`}/>
                                <span 
                                    className={`card-title ${listType === 'requested' ? 'selected' : ''}`}
                                    id="requested"
                                    onClick={() => setListType('requested')}
                                    checked={listType === 'requested'}>
                                    Requested List
                                </span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3 button-switch">
                                <span 
                                    className={`${listType === 'approved' ? 'selected' : ''}`}
                                    id="approved"
                                    onClick={() => setListType('approved')}
                                    checked={listType === 'approved'}>
                                        Approved List
                                </span>
                                <FontAwesomeIcon icon={faArrowRight} className={`${listType === 'requested' ? '' : 'd-none'}`}/>
                            </div>
                        </div>
                    </div>
                    <div className={`${listType === 'requested' ? 'list-frame' : 'd-none'}`}>
                        <div className="col-lg-12">
                            <div className="update-timesheet-history">
                                <table className="table uts-table table-nowrap align-middle table-borderless">
                                <thead className='sticky-header'>
                                    <tr>
                                    <th scope="col">Ngày</th>
                                    <th scope="col">Nhân viên</th>
                                    <th scope="col">Loại yêu cầu</th>
                                    <th scope="col">Trạng thái</th>
                                    <th scope="col">Chi tiết</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>03/07/2024</td>
                                    <td>Nguyễn Văn A</td>
                                    <td>Xin nghỉ</td>
                                    <td>
                                        <span className="badge badge-soft-warning mb-0">
                                        Chưa duyệt
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
                    <div className={`${listType === 'approved' ? 'list-frame' : 'd-none'}`}>
                        <div className="col-lg-12">
                            <div className="update-timesheet-history">
                                <table className="table uts-table table-nowrap align-middle table-borderless">
                                <thead className='sticky-header'>
                                    <tr>
                                    <th scope="col">Ngày</th>
                                    <th scope="col">Nhân viên</th>
                                    <th scope="col">Loại yêu cầu</th>
                                    <th scope="col">Trạng thái</th>
                                    <th scope="col">Chi tiết</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>20/06/2024</td>
                                    <td>Nguyễn Văn A</td>
                                    <td>Xin nghỉ</td>
                                    <td>
                                        <span className="badge badge-soft-danger mb-0">
                                        Từ chối
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
                <RightSidebar />
           </section>
           <RequestDetail show = {isOpenDetail}
                      handleClose = {handleCloseDetail}
                      handleConfirm = {handleConfirmDetail}
            />
       </React.Fragment>
     );
}

export default Approve;