import React, { useEffect, useState } from 'react';

import Header from '../Header/Header';
import RightSidebar from '../RightSidebar/RightSidebar';
import Footer from '../Footer/Footer';
import './HomePage.scss'

const HomePage = () => {
  return (
    <React.Fragment>
        <Header/>
        <section>
          <div>
            Thông báo section
          </div>
          <RightSidebar/>
        </section>
        <Footer />
    </React.Fragment>
  );
}

export default HomePage;