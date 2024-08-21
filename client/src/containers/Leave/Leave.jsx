import React, { useEffect, useState, useRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DetailLeave from './DetailLeave';

import Header from '../Header/Header';
import RightSidebar from '../RightSidebar/RightSidebar';
import Footer from '../Footer/Footer';
import './Leave.scss';

const Leave = () => {
  const [leaveMethod, setLeaveMethod] = useState('oneday');
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);

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
            <div className='leave-check'>
              <div className="form-check">
                <input className="form-check-input" type="radio" id="oneday"
                        onClick={() => setLeaveMethod('oneday')}
                        checked={leaveMethod === 'oneday'}/>
                <label className="form-check-label" for="oneday" onClick={() => setLeaveMethod('oneday')}>
                  Nghỉ một ngày
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" id="severaldays"
                        onClick={() => setLeaveMethod('severaldays')}
                        checked={leaveMethod === 'severaldays'}/>
                <label className="form-check-label" for="severaldays">
                  Nghỉ nhiều ngày
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" id="leaveList"
                        onClick={() => setLeaveMethod('leaveList')}
                        checked={leaveMethod === 'leaveList'}/>
                <label className="form-check-label" for="leaveList">
                  Lịch sử xin nghỉ
                </label>
              </div>
            </div>
            <div className={`list-frame-leave ${leaveMethod === 'leaveList' ? '' : 'd-none'}`}>
              <div className="col-lg-12">
                <div className="leave-history">
                  <table className="table leave-table table-nowrap align-middle table-borderless">
                    <thead className='sticky-header'>
                      <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Nghỉ từ ngày</th>
                        <th scope="col">Đến hết ngày</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Chi tiết</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>26/07/2024</td>
                        <td>26/07/2024</td>
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
                      <tr>
                        <td>2</td>
                        <td>26/07/2024</td>
                        <td>26/07/2024</td>
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
            <div className={`datepick-frame ${leaveMethod !== 'leaveList' ? '' : 'd-none'}`}>
              <div className='datepick'>  
                <label className='col-sm-3 col-form-label'>Họ tên:</label>
                <Container>
                    <Row>
                        <Form.Group>
                            <Form.Control type='text'
                                          value={"Nguyễn Văn A"}
                                          disabled
                            ></Form.Control>
                        </Form.Group>
                    </Row>
                </Container>
              </div>
              <div className='datepick'>  
                <label className='col-sm-3 col-form-label'>Bộ phận:</label>
                <Container>
                    <Row>
                        <Form.Group>
                            <Form.Control type='text'
                                          value={"Phòng kế toán"}
                                          disabled
                            ></Form.Control>
                        </Form.Group>
                    </Row>
                </Container>
              </div>
              <div className='datepick'>  
                <label className='col-sm-3 col-form-label'>Số điện thoại:</label>
                <Container>
                    <Row>
                        <Form.Group>
                            <Form.Control type='text'
                                          value={"0123456789"}
                                          disabled
                            ></Form.Control>
                        </Form.Group>
                    </Row>
                </Container>
              </div>
              <div className= {`datepick ${leaveMethod === 'oneday' ? '' : 'd-none'}`}>
                <label className='col-sm-3 col-form-label'>Chọn ngày nghỉ:</label>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholder = '30/03/2024'
                    className="form-control form-control-lg custom-datepick"
                />
              </div>
              <div className={`${leaveMethod === 'severaldays' ? '' : 'd-none'}`}>
                <div className='datepick'>
                  <label className='col-sm-3 col-form-label'>Nghỉ từ ngày:</label>
                  <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="dd/MM/yyyy"
                      placeholder = '30/03/2024'
                      className="form-control form-control-lg custom-datepick"
                  />
                </div>
                <div className='datepick'>
                  <label className='col-sm-3 col-form-label'>Đến hết ngày:</label>
                  <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="dd/MM/yyyy"
                      placeholder = '30/03/2024'
                      className="form-control form-control-lg custom-datepick"
                  />
                </div>
              </div>
              <div className='reason-frame'>
                <label>Lý do:</label>
                <div className="form-group reason-input">
                  <textarea className="form-control" id="reason" rows="3"></textarea>
                </div>
              </div>
              <Button>Gửi</Button>
            </div>
          </div>
          <RightSidebar/>
        </section>
        <Footer />
        <DetailLeave show = {isOpenDetail}
                      handleClose = {handleCloseDetail}
                      handleConfirm = {handleConfirmDetail}
        />
    </React.Fragment>
  );
}

export default Leave;