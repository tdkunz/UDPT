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
  today.setHours(0, 0, 0, 0);

  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [errorTimeStart, setErrorTimeStart] = useState('');
  const [errorTimeEnd, setErrorTimeEnd] = useState('');
  const [leaveData, setLeaveData] = useState({
    time_start: today,
    time_end: today,
    reason: ''
  });

  const handleShowDetail = () => {
    setIsOpenDetail(true);
  }

  const handleCloseDetail = () => {
    setIsOpenDetail(false);
  }

  const handleConfirmDetail = () => {
    handleCloseDetail()
  }

  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const leaveInfo = {
    "Họ tên": "Nguyễn Văn A",
    "Bộ phận": "Phòng kế toán",
    "Phone": "0123456789",
    "time_start": formatDateTime(new Date(leaveData.time_start)),
    "time_end": formatDateTime(new Date(leaveData.time_end)),
    "Lý do": leaveData.reason
  }

  const handleDateChange = (date, name) => {
    if (leaveMethod === 'oneday') {
      // Đặt giờ phút cho time_start là 00:00 và time_end là 23:59
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
  
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
  
      setLeaveData({
        ...leaveData,
        time_start: startDate,
        time_end: endDate
      });
    } else {
      const updatedDate = new Date(date);
      if (name === 'time_start') {
        updatedDate.setHours(0, 0, 0, 0);
      } else if (name === 'time_end') {
        updatedDate.setHours(23, 59, 59, 999);
      }
  
      setLeaveData({
        ...leaveData,
        [name]: updatedDate
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLeaveData({
        ...leaveData,
        [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const timeStart = new Date(leaveData.time_start);
    const timeEnd = new Date(leaveData.time_end);
    setErrorTimeStart('');
    setErrorTimeEnd('');
    if (timeStart < today) {
      setErrorTimeStart('Ngày bắt đầu không được nhỏ hơn ngày hiện tại.');
      return;
    }

    if (timeEnd < timeStart) {
      setErrorTimeEnd('Chọn ngày kết thúc lớn hơn ngày bắt đầu.');
      return;
    }
    console.log("Leave Info: ", leaveInfo);
  };

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
                <label className="form-check-label" htmlFor="oneday" onClick={() => setLeaveMethod('oneday')}>
                  Nghỉ một ngày
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" id="severaldays"
                        onClick={() => setLeaveMethod('severaldays')}
                        checked={leaveMethod === 'severaldays'}/>
                <label className="form-check-label" htmlFor="severaldays">
                  Nghỉ nhiều ngày
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" id="leaveList"
                        onClick={() => setLeaveMethod('leaveList')}
                        checked={leaveMethod === 'leaveList'}/>
                <label className="form-check-label" htmlFor="leaveList">
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
            <form action="#" onSubmit={(e) => handleSubmit(e)}>
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
                      name = 'time_start'
                      selected={leaveData.time_start}
                      onChange={(date) => handleDateChange(date, 'time_start')}
                      dateFormat="dd/MM/yyyy"
                      className="form-control form-control-lg custom-datepick"
                      required
                  />
                  {errorTimeStart && <div className="text-danger mx-3">{errorTimeStart}</div>}
                </div>
                <div className={`${leaveMethod === 'severaldays' ? '' : 'd-none'}`}>
                  <div className='datepick'>
                    <label className='col-sm-3 col-form-label'>Nghỉ từ ngày:</label>
                    <DatePicker
                        name = 'time_start'
                        selected={leaveData.time_start}
                        onChange={(date) => handleDateChange(date, 'time_start')}
                        dateFormat="dd/MM/yyyy"
                        className="form-control form-control-lg custom-datepick"
                        required
                    />
                    {errorTimeStart && <div className="text-danger mx-3">{errorTimeStart}</div>}
                  </div>
                  <div className='datepick'>
                    <label className='col-sm-3 col-form-label'>Đến hết ngày:</label>
                    <DatePicker
                        name = 'time_end'
                        selected={leaveData.time_end}
                        onChange={(date) => handleDateChange(date, 'time_end')}
                        dateFormat="dd/MM/yyyy"
                        placeholder = '30/03/2024'
                        className="form-control form-control-lg custom-datepick"
                        required
                    />
                    {errorTimeEnd && <div className="text-danger mx-3">{errorTimeEnd}</div>}
                  </div>
                </div>
                <div className='reason-frame'>
                  <label>Lý do:</label>
                  <div className="form-group reason-input">
                    <textarea className="form-control" 
                              id="reason" 
                              rows="3"
                              name = 'reason'
                              onChange={handleChange}
                              required>
                          </textarea>
                  </div>
                </div>
                <Button type='submit'>Gửi</Button>
              </div>
            </form>
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