import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Header from '../Header/Header';
import RightSidebar from '../RightSidebar/RightSidebar';
import './Voucher.scss';

const Voucher = () => {
    const [show, setShow] = useState(false);
    const [mainCampaigns, setMainCampaigns] = useState([]);
    const [subCampaigns, setSubCampaigns] = useState([]);
    const [activeMainCampaign, setActiveMainCampaign] = useState(null);
    const [employeePoints, setEmployeePoints] = useState(0);
    const apiKey = '44ea1ba880c3d4df6a9954bfb44644177b6efdc2b605151d5ca64696f7d365c2';

    const [showAddVoucherModal, setShowAddVoucherModal] = useState(false);
    const [voucherFormData, setVoucherFormData] = useState({
        codeType: 'digits',
        giftCardValue: '',
        prefix: 'BILL',
        randomPartLength: 4,
        size: ''
    });
    const [selectedSubCampaignId, setSelectedSubCampaignId] = useState(null);

    const handleAddVoucher = async () => {
        const { codeType, giftCardValue, prefix, randomPartLength, size } = voucherFormData;
        const requestBody = {
            code_type: codeType,
            gift_card_value: parseInt(giftCardValue),
            prefix: prefix,
            random_part_length: randomPartLength,
            size: parseInt(size)
        };

        try {
            const response = await axios.post(`https://university-of-science.sandbox.vouchery.app/api/v2.1/campaigns/${selectedSubCampaignId}/vouchers/batch`, requestBody, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            });
            console.log('Response status:', response.status);
            console.log('Response data:', response.data);
            if (response.status === 202) {
                alert(`Vouchers added successfully!`);
                setShowAddVoucherModal(false);
            } else {
                alert('Error adding vouchers. Please try again.');
            }
        } catch (error) {
            console.error('Error adding vouchers:', error.response ? error.response.data : error.message);
            alert(`Error adding vouchers: ${error.response ? error.response.data.message : error.message}. Please try again.`);
        }
    };

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const mainResponse = await axios.get('https://university-of-science.sandbox.vouchery.app/api/v2.1/campaigns?per_page=10', {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`
                    }
                });
                const subResponse = await axios.get('https://university-of-science.sandbox.vouchery.app/api/v2.1/campaigns/sub?per_page=20', {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`
                    }
                });
                const mainCampaigns = mainResponse.data.filter(campaign => campaign.type === 'MainCampaign');
                setMainCampaigns(mainCampaigns);
                setSubCampaigns(subResponse.data);
                console.log('Main Campaigns:', mainCampaigns);
                console.log('Sub Campaigns:', subResponse.data);
            } catch (error) {
                console.error('Error fetching campaigns:', error);
            }
        };

        const fetchEmployeePoints = async () => {
            const employeeId = localStorage.getItem('userid');
            try {
                const response = await axios.get(`http://localhost:8080/api/points/${employeeId}`);
                setEmployeePoints(response.data.totalPoint);
            } catch (error) {
                console.error('Error fetching employee points:', error);
            }
        };

        fetchCampaigns();
        fetchEmployeePoints();
    }, [apiKey]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSelect = (selectedKey) => {
        setActiveMainCampaign(selectedKey);
        console.log('Selected Main Campaign ID:', selectedKey);
    };

    const handleRedeem = async (subCampaignId, voucherCost) => {
        const employeeId = localStorage.getItem('userid');
        if (employeePoints < voucherCost) {
            alert('Not enough points to redeem this voucher.');
            return;
        }

        try {
            const response = await axios.get(`https://university-of-science.sandbox.vouchery.app/api/v2.1/campaigns/${subCampaignId}/vouchers?per_page=50`, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            });

            const availableVouchers = response.data.filter(voucher => voucher.status === 'created');
            if (availableVouchers.length === 0) {
                alert('Đã hết voucher!');
                return;
            }

            const randomVoucher = availableVouchers[Math.floor(Math.random() * availableVouchers.length)];
            const voucherCode = randomVoucher.code;

            console.log("voucherCode", voucherCode);
            console.log("voucherCost", voucherCost);

            try {
                // Redeem the voucher
                await axios.put(`https://university-of-science.sandbox.vouchery.app/api/v2.1/customers/${employeeId}/vouchers`, {
                    vouchers: [voucherCode]
                }, {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`
                    }
                });
            } catch (error) {
                console.error('Error redeeming voucher:', error.response ? error.response.data : error.message);
                alert('Error redeeming voucher. Please try again.');
                return;
            }

            try {
                // Deduct points and add history
                await axios.post(`http://localhost:8084/api/points/redeem`, null, {
                    params: {
                        employeeId,
                        points: voucherCost,
                        message: `Redeemed voucher: ${randomVoucher.campaign.name}`
                    }
                });
            } catch (error) {
                console.error('Error updating points:', error.response ? error.response.data : error.message);
                alert('Error updating points. Please try again.');
                return;
            }

            // Update the employee points state
            setEmployeePoints(prevPoints => prevPoints - voucherCost);
            alert('Voucher redeemed successfully!');
        } catch (error) {
            console.error('Error redeeming voucher:', error);
            alert('Error redeeming voucher. Please try again.');
        }
    };

    const filteredSubCampaigns = subCampaigns.filter(sub => sub.parent_id === parseInt(activeMainCampaign));
    console.log('Filtered Sub Campaigns:', filteredSubCampaigns);

    return (
        <React.Fragment>
            <Header />
            <section>
                <div className='content-frame'>
                    <div className="d-flex align-items-center m-3 update-timesheet-header">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <h5 className="card-title">Danh sách Voucher</h5>
                            </div>
                        </div>
                    </div>

                    <Nav variant="tabs" className="voucher-type" defaultActiveKey="link-1" onSelect={handleSelect}>
                        {mainCampaigns.map((campaign, index) => (
                            <Nav.Item key={campaign.id}>
                                <Nav.Link eventKey={campaign.id}>{campaign.name}</Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>

                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">Tên Voucher</th>
                            <th scope="col">Nội dung</th>
                            <th scope="col">Giá trị thẻ quà tặng</th>
                            <th scope="col">Số lượng Voucher</th>
                            <th scope="col">Ngày hết hạn</th>
                            {localStorage.getItem('role') === 'Employee' && <th scope="col">Hành động</th>}
                        </tr>
                        </thead>
                        <tbody>
                        {filteredSubCampaigns.map(sub => (
                            <tr key={sub.id}>
                                <td><b>{sub.name}</b></td>
                                <td>{sub.description}</td>
                                <td>{sub.gift_card_value}</td>
                                <td>{sub.vouchers_count - sub.vouchers_distributed_count}</td>
                                <td>{sub.expires_at ? new Date(sub.expires_at).toLocaleDateString() : 'N/A'}</td>
                                {localStorage.getItem('role') === 'Employee' && (
                                    <td>
                                        <Button onClick={() => handleRedeem(sub.id, sub.gift_card_value)}>Đổi Voucher</Button>
                                    </td>
                                )}
                                {localStorage.getItem('role') === 'Manager' && (
                                    <td>
                                        <Button onClick={() => {
                                            setSelectedSubCampaignId(sub.id);
                                            setShowAddVoucherModal(true);
                                        }}>Thêm Voucher</Button>
                                    </td>
                                )}
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <Modal size="lg" show={show} onHide={handleClose}>
                        <Form>
                            <Modal.Header>
                                <Modal.Title>Thêm Voucher</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group className="mb-3" controlId="Voucher-name">
                                    <Form.Label className='fw-bold'>Tên voucher:</Form.Label>
                                    <Form.Control type="text" name="name" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="Voucher-code">
                                    <Form.Label className='fw-bold'>Mã Voucher:</Form.Label>
                                    <Form.Control type="text" name="code" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="Voucher-date">
                                    <Form.Label className="row fw-bold">Ngày:</Form.Label>
                                    <DatePicker name='date' dateFormat="dd/MM/yyyy" className="form-control" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="Voucher-point">
                                    <Form.Label className='fw-bold'>Số Point:</Form.Label>
                                    <Form.Control type="number" name="point" />
                                </Form.Group>
                                <Form.Group className="mb3" controlId="Voucher-detail">
                                    <Form.Label className='fw-bold'>Mô tả</Form.Label>
                                    <Form.Control as="textarea" rows="3" name="identifyId" />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>Close</Button>
                                <Button type="submit" variant="primary" onClick={handleClose}>Thêm</Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>

                    <Modal show={showAddVoucherModal} onHide={() => setShowAddVoucherModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thêm Voucher</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="voucherCode">
                                    <Form.Label>Mã Voucher</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={voucherFormData.prefix}
                                        onChange={(e) => setVoucherFormData({ ...voucherFormData, prefix: e.target.value })}
                                        disabled
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="voucherValue">
                                    <Form.Label>Giá trị Voucher</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={voucherFormData.giftCardValue}
                                        onChange={(e) => setVoucherFormData({ ...voucherFormData, giftCardValue: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="numberOfVouchers">
                                    <Form.Label>Số lượng Voucher</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={voucherFormData.size}
                                        onChange={(e) => setVoucherFormData({ ...voucherFormData, size: e.target.value })}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowAddVoucherModal(false)}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleAddVoucher}>
                                Thêm Voucher
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <RightSidebar />
            </section>
        </React.Fragment>
    );
};

export default Voucher;