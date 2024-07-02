import React, { useEffect, useState, useRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from 'react-bootstrap';

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
                  <label className='col-sm-2 col-form-label'>Nghỉ từ ngày:</label>
                  <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="dd/MM/yyyy"
                      placeholder = '30/03/2024'
                      className="form-control form-control-lg custom-datepick"
                  />
                </div>
                <div className='datepick'>
                  <label className='col-sm-2 col-form-label'>Đến hết ngày:</label>
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