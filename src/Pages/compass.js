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

    // Функция очистки — удаляет обработчик при уничтожении компонента
    // return () => {
    //   window.removeEventListener('devicemotion', handleDeviceMotion, true);
    // };
  }, []); // Пустой массив зависимостей — эффект выполняется один раз
useEffect(() => {
  console.log('useEffect запущен');

  const handleDeviceMotion = (event) => {
    console.log('Событие devicemotion получено');
    const rotationRate = event.rotationRate;
    console.log('rotationRate:', rotationRate);

    if (rotationRate) {
      console.log('beta:', rotationRate.beta);
      console.log('gamma:', rotationRate.gamma);
      console.log('alpha:', rotationRate.alpha);

      setRotationData({
        beta: rotationRate.beta,
        gamma: rotationRate.gamma,
        alpha: rotationRate.alpha
      });
    } else {
      console.log('rotationRate отсутствует');
    }
  };

  if (typeof window !== 'undefined' && window.DeviceMotionEvent) {
    console.log('DeviceMotionEvent поддерживается');
    window.addEventListener('devicemotion', handleDeviceMotion, true);
  } else {
    console.log('DeviceMotionEvent не поддерживается');
  }

  return () => {
    window.removeEventListener('devicemotion', handleDeviceMotion, true);
    console.log('Обработчик удалён');
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