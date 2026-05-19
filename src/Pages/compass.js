import React, { useState, useEffect } from 'react';

const Compass = () => {
  const [motionData, setMotionData] = useState({
    alpha: null, // вращение вокруг оси Z
    beta: null,  // наклон вперёд/назад (ось X)
    gamma: null   // наклон влево/вправо (ось Y)
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleDeviceMotion = (event) => {
      setMotionData({
        alpha: event.rotationRate.alpha,
        beta: event.rotationRate.beta,
        gamma: event.rotationRate.gamma
      });
    };

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleDeviceMotion);
    } else {
      setError('DeviceMotionEvent не поддерживается');
    }

    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion);
    };
  }, []);

  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Компас (DeviceMotion)</h2>
      <p>Alpha (Z): {motionData.alpha?.toFixed(2) || '—'} рад/с</p>
      <p>Beta (X): {motionData.beta?.toFixed(2) || '—'} рад/с</p>
      <p>Gamma (Y): {motionData.gamma?.toFixed(2) || '—'} рад/с</p>
    </div>
  );
};

export default Compass;