import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import RightSidebar from '../RightSidebar/RightSidebar';
import Footer from '../Footer/Footer';
import "./Activities.scss";

const Activities = () => {

  const [accessToken, setAccessToken] = useState(null);
  const [tokenExpiry, setTokenExpiry] = useState(null);

  const clientId = '131434';
  const clientSecret = 'd305058502da66473739f3aeaad4397c2cf165a2';
  const redirectUri = 'http://localhost:3000/activities'; // Your React app's redirect URI
  const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=activity:read`;

  useEffect(() => {
    // Check if accessToken is already in localStorage
    const storedAccessToken = localStorage.getItem('strava_access_token');
    const storedTokenExpiry = localStorage.getItem('strava_token_expiry');
    if (storedAccessToken && storedTokenExpiry && new Date().getTime() < storedTokenExpiry) {
      setAccessToken(storedAccessToken);
      setTokenExpiry(storedTokenExpiry);
      return;
    }

    // Step 3: After redirect, get authorization code from URL
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');
    console.log("Authorization code from URL:", authorizationCode);

    if (authorizationCode) {
      // Exchange authorization code for access token
      fetchAccessToken(authorizationCode);
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
        // Clear the URL parameters to avoid re-triggering the useEffect
        window.history.replaceState({}, document.title, "/");
      } else {
        console.error('Failed to obtain access token:', data);
      }
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };

  // Function to make an API request to Strava with access token
  // Neu token het han thi se thong bao va yeu cau dang nhap lai
  const fetchAthleteData = async () => {
    if (!accessToken || new Date().getTime() >= tokenExpiry) {
      console.error('Access token not available or expired');
      handleLogin();
      return;
    }

    try {
      const response = await fetch('https://www.strava.com/api/v3/athlete/activities', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      console.log('Athlete data:', data);
    } catch (error) {
      console.error('Error fetching athlete data:', error);
    }
  };

  return (
      <React.Fragment>
        <Header />
        <section>
          <div>
            <h1>Strava OAuth2 Authentication</h1>
            {!accessToken ? (
                <button onClick={handleLogin}>Login with Strava</button>
            ) : (
                <div>
                  <p>Access Token: {accessToken}</p>
                  <button onClick={fetchAthleteData}>Fetch Athlete Data</button>
                </div>
            )}
          </div>
        </section>
        <Footer/>
      </React.Fragment>
  );
};

export default Activities;