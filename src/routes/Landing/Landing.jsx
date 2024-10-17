
import React from 'react';
import Map from '../../components/Map/Map';

const Landing = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Welcome to Vento Freddo</h1>
      </header>
      <Map />
    </div>
  );
};

export default Landing;