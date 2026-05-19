import React, { useState, useEffect } from 'react';
import useGyroscope from 'react-hook-gyroscope';


const Compass = () => {
  const gyroscope = useGyroscope({ frequency: 60 });

  return !gyroscope.error ? (
    <ul>
      <li>X: {gyroscope.x}</li>
      <li>Y: {gyroscope.y}</li>
      <li>Z: {gyroscope.z}</li>
    </ul>
  ) : (
    <p>Нет гироскопа.</p>
  );
};

export default Compass;
