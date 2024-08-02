import React, { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Header from '../Header/Header';
import RightSidebar from '../RightSidebar/RightSidebar';
import './WorkFromHome.scss';

const WorkFromHome = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [equipment, setEquipment] = useState('yes');

  return (
    <React.Fragment>
      <Header />
      <section>
        <div className='content-frame'>
          <div className="d-flex align-items-center justify-content-center m-3 wfh-header">
            <div className="mb-3">
                <h5 className="card-title">Work From Home Form</h5>
            </div>
          </div>
          <div className='wfh-info'>
            <div className='wfh-info-content'>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label className='fw-bold'>Họ tên:</Form.Label>
                  <Form.Control
                      type="text"
                      value={"Nguyễn Văn A"}
                      disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                  <Form.Label className='fw-bold'>Bộ phận:</Form.Label>
                  <Form.Control
                      type="text"
                      value={"Phòng kế toán"}
                      disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                  <Form.Label className='fw-bold'>Số điện thoại:</Form.Label>
                  <Form.Control
                      type="text"
                      value={"0123456789"}
                      disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                  <Form.Label className="row fw-bold">Ngày:</Form.Label>
                  <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="dd/MM/yyyy"
                      className="form-control"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                  <Form.Label className="row fw-bold">Lý do:</Form.Label>
                  <textarea className="form-control" id="reason" rows="3"></textarea>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                  <Form.Label className="row fw-bold">Thiết bị:</Form.Label>
                  <div className='mb-2'>
                    <input className="form-check-input me-2" type="radio" id="yes"
                          onClick={() => setEquipment('yes')}
                          checked={equipment === 'yes'}/>
                    <label className="form-check-label" for="yes" onClick={() => setEquipment('yes')}>
                      Tôi đã có thiết bị đáp ứng nhu cầu công việc
                    </label>
                  </div>
                  <div className='mt-2'>
                    <input className="form-check-input me-2" type="radio" id="no"
                          onClick={() => setEquipment('no')}
                          checked={equipment === 'no'}/>
                    <label className="form-check-label" for="no">
                      Tôi cần công ty hỗ trợ thiết bị
                    </label>
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                  <Form.Label className="row fw-bold">Loại thiết bị bạn cần cho công việc làm tại nhà:</Form.Label>
                  <textarea className="form-control" id="reason" rows="3"></textarea>
                </Form.Group>
              </Form>
              <Button>Gửi</Button>
            </div>
          </div>
        </div>
        <RightSidebar />
      </section>
    </React.Fragment>
  );
}

export default WorkFromHome;