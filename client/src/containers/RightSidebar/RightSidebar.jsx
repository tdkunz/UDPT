import React, { useContext, useEffect, useState } from 'react';
import { CheckInContext } from '../../services/CheckInProvider';
import { CheckOutContext } from '../../services/CheckOutProvider';
import { Button } from 'react-bootstrap';
import './RightSidebar.scss';

const RightSidebar = () => {
    const [currentDate, setCurrentDate] = useState('');
    const { checkInTime, setCheckInTime } = useContext(CheckInContext);
    const { checkOutTime, setCheckOutTime, hasLoggedInfo, setHasLoggedInfo } = useContext(CheckOutContext);
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const checkInInfo = {
        "Mã nhân viên": "123",
        "Họ tên": "Nguyễn Văn A",
        "Bộ phận": "Phòng kế toán",
        "Phone": "0123456789",
        "Loại yêu cầu": "Check-in, Check-out",
        "Time_start": timeStart,
        "Time_end": timeEnd
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
        return formatDateTime(now);
    };

    const handleCheckIn = () => {
        if (!checkInTime) {
            const timeString = getCurrentTime();
            setCheckInTime(timeString);
            setTimeStart(timeString);
            setErrorMessage(''); // Reset thông báo lỗi nếu có
        }
    };

    const handleCheckOut = () => {
        if (!checkInTime) {
            setErrorMessage('Bạn phải Check-in trước khi Check-out!');
        } else if (!checkOutTime) {
            const timeString = getCurrentTime();
            setCheckOutTime(timeString);
            setTimeEnd(timeString);
        }
    };

    // Kiểm soát việc in ra console chỉ 1 lần duy nhất
    useEffect(() => {
        if (checkOutTime !== '' && !hasLoggedInfo) {
            console.log("CheckIn Info: ", checkInInfo);
            setHasLoggedInfo(true); // Đánh dấu là đã log
        }
    }, [checkOutTime, hasLoggedInfo, setHasLoggedInfo]);

    return (
        <React.Fragment>
            <div className='checkin-checkout'>
                <div className='title'>
                    Thời gian làm việc: 
                    <span> {currentDate}</span>
                </div>
                <div className='py-3 ps-3'>
                    <div className='d-flex align-items-center text-center pb-3'>
                        <Button onClick={handleCheckIn} disabled={checkInTime !== ''}>Check-in</Button>
                        <div className={`ps-2 fs-5 ${checkInTime ? '' : 'd-none'}`}>
                            {checkInTime}
                        </div>
                    </div>
                    <div className='d-flex align-items-center text-center pb-3'>
                        <Button onClick={handleCheckOut} disabled={checkOutTime !== ''}>Check-out</Button>
                        <div className={`ps-2 fs-5 ${checkOutTime ? '' : 'd-none'}`}>
                            {checkOutTime}
                        </div>
                    </div>
                </div>
                {errorMessage && <div className="text-danger ps-3">{errorMessage}</div>}
            </div>
        </React.Fragment>
    );
}

export default RightSidebar;