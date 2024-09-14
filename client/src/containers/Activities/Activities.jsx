import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import RightSidebar from '../RightSidebar/RightSidebar';
import Footer from '../Footer/Footer';
import "./Activities.scss";

const Activities = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [tokenExpiry, setTokenExpiry] = useState(null);
  const [isLoginPrompted, setIsLoginPrompted] = useState(false);
  const [activityList, setActivityList] = useState([]);

  const clientId = '131434';
  const clientSecret = 'd305058502da66473739f3aeaad4397c2cf165a2';
  const redirectUri = 'http://localhost:3000/activities';
  const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=activity:read`;

  useEffect(() => {
    // Check if accessToken is already in localStorage
    const storedAccessToken = localStorage.getItem('strava_access_token');
    const storedTokenExpiry = localStorage.getItem('strava_token_expiry');
    
    if (storedAccessToken && storedTokenExpiry) {
      const currentTime = new Date().getTime();
      if (currentTime < storedTokenExpiry) {
        setAccessToken(storedAccessToken);
        setTokenExpiry(storedTokenExpiry);
      } else {
        localStorage.removeItem('strava_access_token');
        localStorage.removeItem('strava_token_expiry');
        handleLogin();
      }
    } else {
      // If no token, check URL for authorization code
      const urlParams = new URLSearchParams(window.location.search);
      const authorizationCode = urlParams.get('code');
      
      if (authorizationCode) {
        fetchAccessToken(authorizationCode);
      } else {
        handleLogin();
      }
    }
  }, []);

  // Function to redirect user to Strava for authorization
  const handleLogin = () => {
    window.location.href = stravaAuthUrl;
  };

  // Function to exchange authorization code for access token
  const fetchAccessToken = async (authorizationCode) => {
    console.log("Fetching access token with code:", authorizationCode);
    try {
      const response = await fetch('/api/v3/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          code: authorizationCode,
          grant_type: 'authorization_code',
        }),
      });

      const data = await response.json();
      console.log("Response from token exchange:", data);

      if (data.access_token) {
        const expiryTime = new Date().getTime() + data.expires_in * 1000;
        setAccessToken(data.access_token);
        setTokenExpiry(expiryTime);
        localStorage.setItem('strava_access_token', data.access_token);
        localStorage.setItem('strava_token_expiry', expiryTime);
        window.history.replaceState({}, document.title, "/");
      } else {
        console.error('Failed to obtain access token:', data);
      }
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };

  useEffect(() => {
    if (!accessToken || !tokenExpiry || new Date().getTime() >= tokenExpiry) {
      return;
    }

    const fetchAthleteData = async () => {
      try {
        const response = await fetch('https://www.strava.com/api/v3/athlete/activities', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();
        setActivityList(data);
        console.log('Athlete data:', data);
      } catch (error) {
        console.error('Error fetching athlete data:', error);
      }
    };

    fetchAthleteData();
  }, [accessToken, tokenExpiry]);

  return (
    <React.Fragment>
      <Header />
      <section>
        <div className='content-frame'>
          <div className='d-flex align-items-center m-3 border-bottom border-dark'>
            <h5 className="card-title mb-3">Club Activities</h5>
          </div>
          <div className='activities-list'>
            {activityList.map((item) => (
              <div className='activity-card' key={item.id}>
                <div className='d-flex align-items justify-content-between px-2 py-2 border-bottom border-dark'>
                  <span className="card-title">Phan Thanh Minh</span>
                  <span className="card-title">{item.name}</span>
                </div>
                <div className='activity-detail'>
                  <div className='activity-info'>
                    <h6>Date: </h6>
                    <span>{item.start_date.split('T')[0]}</span>
                  </div>
                  <div className='activity-info'>
                    <h6>Distance: </h6>
                    <span>{item.distance} meters</span>
                  </div>
                  <div className='activity-info'>
                    <h6>Moving time: </h6>
                    <span>{item.moving_time} seconds</span>
                  </div>
                  <div className='activity-info'>
                    <h6>Elevation: </h6>
                    <span>{item.total_elevation_gain} seconds</span>
                  </div>
                  <div className='activity-info'>
                    <h6>Average speed: </h6>
                    <span>{item.average_speed} m/s</span>
                  </div>
                  <div className='activity-info'>
                    <h6>Max speed: </h6>
                    <span>{item.max_speed} m/s</span>
                  </div>
                  <div className='activity-info'>
                    <h6>Elapsed time: </h6>
                    <span>{item.elapsed_time} seconds</span>
                  </div>
                  <div className='activity-info'>
                    <h6>Type: </h6>
                    <span>{item.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <RightSidebar />
      </section>
      <Footer/>
    </React.Fragment>
  );
};

export default Activities;