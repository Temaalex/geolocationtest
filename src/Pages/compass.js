import React, { useState, useEffect } from 'react';

const Compass = () => {
  const [rotationData, setRotationData] = useState({
    beta: null,
    gamma: null,
    alpha: null
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const handleDeviceMotion = (event) => {
      const rotationRate = event.rotationRate;

      if (rotationRate && (rotationRate.beta !== null || rotationRate.gamma !== null || rotationRate.alpha !== null)) {
        setRotationData({
          beta: rotationRate.beta,
          gamma: rotationRate.gamma,
          alpha: rotationRate.alpha
        });
        setIsLoading(false);
      }
    };

    if (typeof window === 'undefined') {
      setError('Window object недоступен');
      return;
    }

    if (!window.DeviceMotionEvent) {
      setError('DeviceMotionEvent не поддерживается этим браузером/устройством');
      setIsLoading(false);
      return;
    }

    window.addEventListener('devicemotion', handleDeviceMotion, true);

    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion, true);
    };
  }, []);

  if (isLoading) {
    return <div>Ожидание данных с датчиков...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

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