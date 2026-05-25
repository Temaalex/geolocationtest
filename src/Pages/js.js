import React, { useState, useEffect } from 'react';

function SensorComponent() {
  const [orientation, setOrientation] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [error, setError] = useState(null);

  // Функция запроса разрешения для iOS
  const requestPermission = async () => {
    if (typeof DeviceMotionEvent?.requestPermission === 'function') {
      // Для iOS 13+
      try {
        const permission = await DeviceMotionEvent.requestPermission();
        if (permission === 'granted') {
          setPermissionGranted(true);
        } else {
          setError('Доступ к сенсорам отклонён');
        }
      } catch (err) {
        setError('Ошибка при запросе разрешения: ' + err.message);
      }
    } else {
      // Для других платформ или старых версий iOS
      setPermissionGranted(true);
    }
  };

  useEffect(() => {
    // Запрашиваем разрешение при монтировании компонента
    requestPermission();
  }, []);

  useEffect(() => {
    if (!permissionGranted) return;

    const handleOrientation = (event) => {
      setOrientation({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma
      });
    };

    window.addEventListener('deviceorientation', handleOrientation);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [permissionGranted]);

  if (!permissionGranted) {
    return (
      <div>
        <p>Для использования сенсоров требуется разрешение</p>
        <button onClick={requestPermission}>Разрешить доступ к сенсорам</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <h3>Гироскоп:</h3>
      {orientation ? (
        <>
          <p>Alpha: {orientation.alpha?.toFixed(2)}</p>
          <p>Beta: {orientation.beta?.toFixed(2)}</p>
          <p>Gamma: {orientation.gamma?.toFixed(2)}</p>
        </>
      ) : (
        <p>Данные гироскопа недоступны</p>
      )}
    </div>
  );
}

export default SensorComponent;
