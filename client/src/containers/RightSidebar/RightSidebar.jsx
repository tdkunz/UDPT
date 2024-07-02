import React, { useContext, useEffect, useState } from 'react';
import { CheckInContext } from '../../services/CheckInProvider';
import { Button } from 'react-bootstrap';

import './RightSidebar.scss'

const RightSidebar = () => {
    const [currentDate, setCurrentDate] = useState('');
    const { checkInTime, setCheckInTime } = useContext(CheckInContext);
    const [checkOutTime, setCheckOutTime] = useState('');

    useEffect(() => {
        const today = new Date();
        const date = today.toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
        setCurrentDate(date);
    }, []);

    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleTimeString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
        });
    };

    const handleCheckIn = () => {
        if (!checkInTime) {
            const timeString = getCurrentTime();
            setCheckInTime(timeString);
        }
    };

    const handleCheckOut = () => {
        const timeString = getCurrentTime();
        setCheckOutTime(timeString);
    };

    return (
        <React.Fragment>
            <div className='checkin-checkout'>
                <div className='title'>
                    Thời gian làm việc: 
                    <span> {currentDate}</span>
                </div>
                <div className='py-3 ps-3'>
                    <div className='d-flex align-items-center text-center pb-3'>
                        <Button onClick={handleCheckIn}>Check-in</Button>
                        <div className={`ps-2 fs-5 ${checkInTime ? '' : 'd-none'}`}>
                            {checkInTime}
                        </div>
                    </div>
                    <div className='d-flex align-items-center text-center pb-3'>
                        <Button onClick={handleCheckOut}>Check-out</Button>
                        <div className={`ps-2 fs-5 ${checkOutTime ? '' : 'd-none'}`}>
                            {checkOutTime}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default RightSidebar;