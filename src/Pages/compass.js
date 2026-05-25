import React, { useState, useEffect } from 'react';
import Board from './img/Bord.jpg';

const Compass = () => {
const [orientation, setOrientation] = useState({
  alpha: null,
  beta: null,
  gamma: null 
  });
const [accumulatedAlpha, setAccumulatedAlpha] = useState(0);
const [permissionGranted, setPermissionGranted] = useState(false);
const [error, setError] = useState(null);
const [isLoading, setIsLoading] = useState(true);

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
  }, [permissionGranted]);

useEffect(() => {
let previousAlpha = null;
const handleOrientation = (event) => {
const currentAlpha = event.alpha;
if (previousAlpha !== null) {
  let delta = currentAlpha - previousAlpha;
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  setAccumulatedAlpha(prev => prev + delta);
}
previousAlpha = currentAlpha;
setOrientation({
    alpha: currentAlpha,
    beta: 0, //event.beta,
    gamma: 0, //event.gamma
  });
};

window.addEventListener('deviceorientation', handleOrientation);
setIsLoading(false);

return () => {
    window.removeEventListener('deviceorientation', handleOrientation);
  };
}, []);

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
  zIndex: '9',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transition: 'transform 0.5s',
  transform: `translate(-50%, -50%) rotate(${accumulatedAlpha}deg)`,
  width: '60px',
  transformOrigin: 'center'
}} src={Board} alt="Persone"/>
</div>
);
};
export default Compass;