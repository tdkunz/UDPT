import React, { useEffect, useState, useRef } from 'react';
import { Form, Button, Modal } from "react-bootstrap";
import axios from 'axios';

import Header from '../Header/Header';
import RightSidebar from '../RightSidebar/RightSidebar';
import Footer from '../Footer/Footer';
import './GivePoint.scss';

const GivePoint = () => {
  const [employees, setEmployees] = useState([]);
  const [points, setPoints] = useState([]);
  
  const [show, setShow] = useState(false);
  const [curEmp, setCurEmp] = useState({
    'id': 0,
    'name': '',
    'point': 0,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
      const fetchData = async () => {
          try {
              // thêm API lấy danh sách request có loại là update time-sheet và khác "Chưa duyệt"
              const response = await axios.get(`https://localhost:8080/api/requests/update-time-sheet`);
              if (response.status === 200) {
                  
                setEmployees(response.data);
                  
              } else {
                  console.error("Error fetching user data");
              }
          } catch (error) {
              console.error("Error during API request:", error);
          }

          try {
            // thêm API lấy danh sách request có loại là update time-sheet và khác "Chưa duyệt"
            const response = await axios.get(`https://localhost:8080/api/points/${localStorage.getItem('userid')}`);
            if (response.status === 200) {
              setPoints(response.data);
                
            } else {
                console.error("Error fetching user data");
            }
        } catch (error) {
            console.error("Error during API request:", error);
        }
        employees.map((employee) => {
            var cur_point = points.filter((point) => point.id == localStorage.getItem('userid'));
            console.log(cur_point);
            try{
                employee['point'] = cur_point[0].totalPoint;
            }
            catch{
                employee['point'] = 0;
            }
        })
      };
      fetchData();
    //   setEmployees([{'name': 'Nguyễn Văn A', 'point': 123},{'name': 'Lê Văn B', 'point': 456}])
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`API_URL`, {/*data*/});
      console.log('Response:', response.data);
      if (response.status === 200) {
          alert('Gửi yêu cầu thành công');
      } else {
          const message = response.data.message || 'An error occurred while update';
          alert(message);
      }
    } catch (error) {
        const message = error.response?.data?.message || 'An error occurred while update';
        alert(message)
    }
  };

  return (
    <React.Fragment>
      <Header />
      <section>
        <div className='content-frame'>
          <div className="d-flex align-items-center m-3 update-timesheet-header">
            <div className="col-md-6">
              <div className="mb-3">
                  <h5 className="card-title">Danh sách nhân viên</h5>
              </div>
            </div>
           
          </div>
          <div className="list-frame">
            <div className="col-lg-12">
              <div className="update-timesheet-history">
                <table className="table uts-table table-nowrap align-middle table-borderless">
                  <thead className='sticky-header'>
                    <tr>
                      <th scope="col">Tên</th>
                      <th scope="col">Ngày sinh</th>
                      <th scope="col">Địa chỉ</th>
                      <th scope="col">Vị trí</th>
                      <th scope="col">Bộ phận</th>
                      <th scope="col">Điểm</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                  {employees.length > 0 ? (
                    employees.map((employee) => (
                    <tr key = {employee.id}>
                      <td>{employee.name}</td>
                      <td>{employee.birthDate}</td>
                      <td>{employee.address}</td>
                      <td>{employee.position}</td>
                      <td>{employee.department}</td>
                      <td class="point">{employee.point}</td>
                      <td>
                      <Button variant="primary" onClick={ () => {
                        handleShow(); 
                        setCurEmp({
                            'id': employee.id,
                            'name': employee.name,
                            'point': employee.point
                        });
                      }}>
                          Thêm điểm
                      </Button>
                      </td>
                    </tr>
                    ))
                    ) : (
                    <tr>
                      <td colSpan="5">Không có dữ liệu</td>
                    </tr>
                  )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <RightSidebar/>
      </section>
      <Footer />
      
      <Modal show={show} onHide={handleClose}>
        <form onSubmit={(e) => handleSubmit(e)}>
            <Modal.Header>
            <Modal.Title class="row modal-add-point">
                <div class="col">
                    {curEmp.name}
                </div>
                <div class="col" align="right">
                Điểm: <b>{curEmp.point}</b>
                </div>
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className='fw-bold'>Điểm được cho: </Form.Label>
                    <Form.Control
                        type="number"
                        name="point"
                    />
                    </Form.Group>
                </Form>
                
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleClose}>
                Confirm
            </Button>
            </Modal.Footer>
        </form>
      </Modal>

    </React.Fragment>
  );
}

export default GivePoint;