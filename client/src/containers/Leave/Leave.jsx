import React, { useEffect, useState, useRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Header from '../Header/Header';
import RightSidebar from '../RightSidebar/RightSidebar';
import './Leave.scss';

const Leave = () => {
  const [leaveMethod, setLeaveMethod] = useState('oneday');
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);

  return (
    <React.Fragment>
        <Header />
        <section>
          <div className='leave-frame'>
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
            </div>
            <div className='datepick-frame'>
              <div className='datepick'>  
                <label className='col-sm-3 col-form-label'>Họ tên:</label>
                <Container>
                    <Row>
                        <Form.Group>
                            <Form.Control type='text' placeholder='Họ tên nhân viên'
                                          name='phoneNumber'
                                          // value={formLookupInvoice.phoneNumber}
                                          // onChange={handleChange}
                                          required
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
                            <Form.Control type='text' placeholder='Bộ phận làm việc'
                                          name='phoneNumber'
                                          // value={formLookupInvoice.phoneNumber}
                                          // onChange={handleChange}
                                          required
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
                            <Form.Control type='text' placeholder='Số điện thoại liên lạc'
                                          name='phoneNumber'
                                          // value={formLookupInvoice.phoneNumber}
                                          // onChange={handleChange}
                                          required
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
    </React.Fragment>
  );
}

export default Leave;