import React, { useState, useEffect } from 'react';

const Compass = () => {
const [rotationData, setRotationData] = useState({
    beta: null,
    gamma: null,
    alpha: null
  });
  useEffect(() => {
    const handleDeviceMotion = (event) => {
      const rotationRate = event.rotationRate;

      if (rotationRate) {
        setRotationData({
          beta: rotationRate.beta,
          gamma: rotationRate.gamma,
          alpha: rotationRate.alpha
        });
      }
    };

    if (typeof window !== 'undefined' && window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleDeviceMotion, true);
    } else {
      console.log('DeviceMotionEvent не поддерживается');
    }
    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion, true);
    };
  }, []);

  return (
    <div>
      <h2>Данные компаса</h2>
      <p>Вращение вокруг X (beta): {rotationData.beta !== null ? `${rotationData.beta.toFixed(2)} рад/с` : 'Нет данных'}</p>
      <p>Вращение вокруг Y (gamma): {rotationData.gamma !== null ? `${rotationData.gamma.toFixed(2)} рад/с` : 'Нет данных'}</p>
      <p>Вращение вокруг Z (alpha): {rotationData.alpha !== null ? `${rotationData.alpha.toFixed(2)} рад/с` : 'Нет данных'}</p>
    </div>
  );
};


export default Compass;