import React, { useState, useEffect } from 'react';
import Board from './img/Bord.jpg';

const Compass = () => {
  const [orientation, setOrientation] = useState({
    alpha: null,
    beta: null,
    gamma: null
  });
  const [accumulatedAlpha, setAccumulatedAlpha] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Запрос разрешения на доступ к датчикам для iOS
  useEffect(() => {
    const requestMotionAccess = async () => {
      if (typeof DeviceMotionEvent?.requestPermission === 'function') {
        try {
          const permission = await DeviceMotionEvent.requestPermission();
          if (permission === 'granted') {
            setPermissionGranted(true);
          } else {
            setError('Доступ к датчикам отклонён пользователем');
          }
        } catch (err) {
          setError('Ошибка запроса доступа к датчикам');
        }
      } else {
        // Для браузеров без явного запроса разрешений
        setPermissionGranted(true);
      }
    };

    requestMotionAccess();
  }, []);

  useEffect(() => {
    if (!permissionGranted) return;

    let previousAlpha = null;

    const handleOrientation = (event) => {
      const currentAlpha = event.alpha;

      if (previousAlpha !== null && currentAlpha !== null) {
        let delta = currentAlpha - previousAlpha;
        // Корректировка для плавного перехода через 0/360
        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;
        setAccumulatedAlpha(prev => prev + delta);
      }

      previousAlpha = currentAlpha;

      setOrientation({
        alpha: currentAlpha,
        beta: 0,//event.beta !== null ? event.beta : 0,
        gamma: 0, //event.gamma !== null ? event.gamma : 0
      });
    };

    const handleMotion = (event) => {
      // Гироскоп предоставляет более точные данные о вращении
      const { alpha, beta, gamma } = orientation;
      const rotationRate = event.rotationRate;

      if (rotationRate) {
        const newAlpha = (alpha || 0) + (rotationRate.alpha || 0);
        const newBeta = (beta || 0) + (rotationRate.beta || 0);
        const newGamma = (gamma || 0) + (rotationRate.gamma || 0);

        setOrientation({ alpha: newAlpha, beta: newBeta, gamma: newGamma });
      }
    };

    // Подключаем оба события для максимальной совместимости
    window.addEventListener('deviceorientation', handleOrientation);
    window.addEventListener('devicemotion', handleMotion);

    setIsLoading(false);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [permissionGranted]);

  // Визуализация данных
  if (isLoading) return <div>Загрузка датчиков...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!permissionGranted) {
    return (
      <div>
        <p>Для работы компаса требуется доступ к датчикам.</p>
        <button onClick={() => window.location.reload()}>
          Запросить доступ
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ margin: '10px 0', color: 'green', marginTop: '100px' }}>
        <p>
          <strong>Азимут (Alpha/Z):</strong>{' '}
          {orientation.alpha !== null
            ? `${orientation.alpha.toFixed(1)}°`
            : '—'}
        </p>
        <p>
          <strong>Наклон вперёд/назад (Beta/X):</strong>{' '}
          {orientation.beta !== null
            ? `${orientation.beta.toFixed(1)}°`
            : '—'}
        </p>
        <p>
          <strong>Наклон влево/вправо (Gamma/Y):</strong>{' '}
          {orientation.gamma !== null
            ? `${orientation.gamma.toFixed(1)}°`
            : '—'}
        </p>
        <p>
          <strong>Накопленный азимут:</strong>{' '}
          {`${accumulatedAlpha.toFixed(1)}°`}
        </p>
      </div>

      {/* Визуальный индикатор азимута */}
      <img
        style={{
          zIndex: '9',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transition: 'transform 0.1s',
          transform: `translate(-50%, -50%) rotate(${accumulatedAlpha}deg)`,
          width: '60px',
          transformOrigin: 'center'
        }}
        src={Board}
        alt="Компас"
      />
    </div>
  );
};

export default Compass;
