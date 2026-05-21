import React, { useState, useEffect } from 'react';
import Board from './img/Bord.jpg';

const Compass = () => {
  const [orientation, setOrientation] = useState({
    alpha: null,
    beta: null,
    gamma: null
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalRotation, setTotalRotation] = useState(0); // Накопленный угол вращения
  const [lastAlpha, setLastAlpha] = useState(null); // Последнее значение alpha

  useEffect(() => {
    const handleOrientation = (event) => {
      const currentAlpha = event.alpha;

      // Инициализация при первом событии
      if (lastAlpha === null) {
        setLastAlpha(currentAlpha);
        setOrientation({
          alpha: currentAlpha,
          beta: 0,
          gamma: 0
        });
        return;
      }

      // Вычисляем разницу с предыдущим значением
      let delta = currentAlpha - lastAlpha;

      // Корректируем разницу для плавного перехода через 0/360
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;

      // Обновляем накопленный угол
      setTotalRotation(prev => prev + delta);

      // Сохраняем текущее значение для следующего расчёта
      setLastAlpha(currentAlpha);

      // Обновляем ориентацию
      setOrientation({
        alpha: currentAlpha,
        beta: 0,
        gamma: 0
      });
    };

    // Проверка поддержки DeviceOrientationEvent
    if (window.DeviceOrientationEvent) {
      // Запрос разрешения на iOS 13+
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
          .then((permissionState) => {
            if (permissionState === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation);
              setIsLoading(false);
            } else {
              setError('Разрешение на доступ к датчикам отклонено');
            }
          })
          .catch(() => setError('Ошибка запроса разрешения'));
      } else {
        // Для устройств без запроса разрешений
        window.addEventListener('deviceorientation', handleOrientation);
        setIsLoading(false);
      }
    } else {
      setError('DeviceOrientationEvent не поддерживается вашим устройством');
      setIsLoading(false);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [lastAlpha]);

  // Визуализация данных
  if (isLoading) return <div>Загрузка датчиков...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <div style={{ margin: '10px 0', color: "green", marginTop: "100px"}}>
        <p>
          <strong>Азимут (Alpha/Z):</strong>{' '}
          {orientation.alpha !== null
            ? `${orientation.alpha.toFixed()}°`
            : '—'}
        </p>
        <p>
          <strong>Накопленный поворот:</strong>{' '}
          {`${totalRotation.toFixed(1)}°`}
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
      <img
        style={{
          zIndex: '9',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transition: 'transform 0.1s linear', // Плавная анимация
          transform: `translate(-50%, -50%) rotate(${totalRotation}deg)`,
          width: '60px',
          transformOrigin: 'center'
        }}
        src={Board}
        alt="Compass"
      />
    </div>
  );
};

export default Compass;
