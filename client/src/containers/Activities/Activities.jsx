import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../Header/Header';
import RightSidebar from '../RightSidebar/RightSidebar';
import Footer from '../Footer/Footer';

import "./Activities.scss";

const Activities = () => {

  const rankList = [
    "Nguyễn Văn A",
    "Nguyễn Văn A",
    "Nguyễn Văn A",
    "Nguyễn Văn A",
    "Nguyễn Văn A",
    "Nguyễn Văn A",
    "Nguyễn Văn A",
    "Nguyễn Văn A",
    "Nguyễn Văn A",
    "Nguyễn Văn A"
  ];

  return (
    <React.Fragment>
      <Header />
      <section>
        <div className='content-frame no-bg'>
          <div className='rank'>
            <div className='d-flex align-items-center justify-content-center py-2 border-bottom border-dark'>
              <h5 className="card-title">Rank</h5>
            </div>
            <div className='rank-list'>
              {rankList.map((name, index) => (
                <div className='rank-list-child' key={index}>
                  <span>{index + 1}</span>
                  <h6>{name}</h6>
                </div>
              ))}
            </div>
          </div>
          <div className='activity'>
            <div className='d-flex align-items-center justify-content-start py-2 px-5 border-bottom border-dark'>
              <h5 className="card-title">Your Rank: <span>15</span></h5>
            </div>
            <div className='activities-list'>
              <div className='activity-card'>
                <div className='d-flex align-items-center justify-content-center py-2 border-bottom border-dark'>
                  <h5 className="card-title">Evening Ride</h5>
                </div>
                <div className='activity-detail'>
                  <div className='activity-info'>
                    <h6>Distance: </h6>
                    <span>3422.2 meters</span>
                  </div>
                  <div className='activity-info'>
                    <h6>Moving time: </h6>
                    <span>591 seconds</span>
                  </div>
                  <div className='activity-info'>
                    <h6>Elapsed time: </h6>
                    <span>704 seconds</span>
                  </div>
                  <div className='activity-info'>
                    <h6>Type: </h6>
                    <span>Ride</span>
                  </div>
                </div>
              </div>
              <div className='activity-card'>
                <div className='d-flex align-items-center justify-content-center py-2 border-bottom border-dark'>
                  <h5 className="card-title">Evening Ride</h5>
                </div>
                <div className='activity-detail'>
                  <div className='activity-info'>
                    <h6>Distance: </h6>
                    <span>3422.2 meters</span>
                  </div>
                  <div className='activity-info'>
                    <h6>Moving time: </h6>
                    <span>591 seconds</span>
                  </div>
                  <div className='activity-info'>
                    <h6>Elapsed time: </h6>
                    <span>704 seconds</span>
                  </div>
                  <div className='activity-info'>
                    <h6>Type: </h6>
                    <span>Ride</span>
                  </div>
                </div>
              </div>
              <div className='activity-card'>
                <div className='d-flex align-items-center justify-content-center py-2 border-bottom border-dark'>
                  <h5 className="card-title">Evening Ride</h5>
                </div>
                <div className='activity-detail'>
                  <div className='activity-info'>
                    <h6>Distance: </h6>
                    <span>3422.2 meters</span>
                  </div>
                  <div className='activity-info'>
                    <h6>Moving time: </h6>
                    <span>591 seconds</span>
                  </div>
                  <div className='activity-info'>
                    <h6>Elapsed time: </h6>
                    <span>704 seconds</span>
                  </div>
                  <div className='activity-info'>
                    <h6>Type: </h6>
                    <span>Ride</span>
                  </div>
                </div>
              </div>
              <div className='activity-card'>
                <div className='d-flex align-items-center justify-content-center py-2 border-bottom border-dark'>
                  <h5 className="card-title">Evening Ride</h5>
                </div>
                <div className='activity-detail'>
                  <div className='activity-info'>
                    <h6>Distance: </h6>
                    <span>3422.2 meters</span>
                  </div>
                  <div className='activity-info'>
                    <h6>Moving time: </h6>
                    <span>591 seconds</span>
                  </div>
                  <div className='activity-info'>
                    <h6>Elapsed time: </h6>
                    <span>704 seconds</span>
                  </div>
                  <div className='activity-info'>
                    <h6>Type: </h6>
                    <span>Ride</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RightSidebar />
      </section>
      <Footer />
    </React.Fragment>
  );
};

export default Activities;