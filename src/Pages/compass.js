import React, { useState, useEffect } from 'react';
import Board from './img/Bord.jpg';

const Compass = () => {
  const [orientation, setOrientation] = useState({
    alpha: null, // вращение вокруг оси Z (азимут)
    beta: null,  // наклон вперёд/назад (ось X)
    gamma: null   // наклон влево/вправо (ось Y)
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleOrientation = (event) => {
      setOrientation({
        alpha: event.alpha,
        beta: 0,//event.beta,
        gamma: 0,//event.gamma
      });
    };

    // Проверка поддержки DeviceOrientationEvent
    // if (window.DeviceOrientationEvent) {
    //   // Запрос разрешения на iOS 13+
    //   if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    //     DeviceOrientationEvent.requestPermission()
    //       .then((permissionState) => {
    //         if (permissionState === 'granted') {
    //           window.addEventListener('deviceorientation', handleOrientation);
    //           setIsLoading(false);
    //         } else {
    //           setError('Разрешение на доступ к датчикам отклонено');
    //         }
    //       })
    //       .catch(() => setError('Ошибка запроса разрешения'));
    //   } else {
        // Для устройств без запроса разрешений
        window.addEventListener('deviceorientation', handleOrientation);
        setIsLoading(false);

      // }
    // } else {
    //   setError('DeviceOrientationEvent не поддерживается вашим устройством');
    //   setIsLoading(false);
    // }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  // Визуализация данных
  if (isLoading) return <div>Загрузка датчиков...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      {/* <h2>Компас (DeviceOrientation)</h2> */}
      
      <div style={{ margin: '10px 0', color: "green", marginTop: "100px"}}>
        <p>
          <strong>Азимут (Alpha/Z):</strong>{' '}
          {orientation.alpha !== null
            ? `${orientation.alpha.toFixed()}°`
            : '—'}
        </p>
        <p>
          <strong>Наклон вперёд/назад (Beta/X):</strong>{' '}
          {orientation.beta !== null
            ? `${orientation.beta.toFixed()}°`
            : '—'}
        </p>
        <p>
          <strong>Наклон влево/вправо (Gamma/Y):</strong>{' '}
          {orientation.gamma !== null
            ? `${orientation.gamma.toFixed()}°`
            : '—'}
        </p>
      </div>

      {/* Визуальный индикатор азимута */}

        <img style={{
          
          //backgroundColor: "red",
            zIndex: '9',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) rotate(${orientation.alpha || 0}deg)`,
            width: '60px',
            //height: '4px',
            //backgroundColor: 'red',
            transformOrigin: 'center'
          }} src={Board} alt="Persone"/>
        {/* <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) rotate(${orientation.alpha || 0}deg)`,
            width: '50%',
            height: '4px',
            backgroundColor: 'red',
            transformOrigin: 'center'
          }}
        /> */}
        {/* <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          N
        </div> */}
    
    </div>
  );
};

export default Compass;
