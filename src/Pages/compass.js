import React, { useState, useEffect } from 'react';

const Compass = () => {
  const [gyroData, setGyroData] = useState({ x: null, y: null, z: null });
  const [error, setError] = useState(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Безопасная проверка поддержки
    if (typeof Gyroscope !== 'undefined') {
      setIsSupported(true);
      initGyroscope();
    } else {
      setError('Гироскоп не поддерживается этим браузером или устройством');
    }
  }, []);

  const initGyroscope = async () => {
    try {
      // Запрос разрешения, если метод доступен
      if ('requestPermission' in Gyroscope) {
        const permission = await Gyroscope.requestPermission();
        if (permission !== 'granted') {
          setError('Доступ к гироскопу запрещён пользователем');
          return;
        }
      }

      const gyroscope = new Gyroscope({ frequency: 60 });

      gyroscope.addEventListener('reading', () => {
        setGyroData({
          x: gyroscope.x,
          y: gyroscope.y,
          z: gyroscope.z
        });
      });

      gyroscope.addEventListener('error', (e) => {
        setError(`Ошибка гироскопа: ${e.error.name}`);
      });

      gyroscope.start();

      // Очистка при размонтировании
      return () => gyroscope.stop();
    } catch (err) {
      setError(`Ошибка инициализации: ${err.message}`);
    }
  };

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div>
      <h2>Компас с гироскопом</h2>
      {!isSupported ? (
        <p>Гироскоп недоступен. Проверьте поддержку браузера и HTTPS.</p>
      ) : (
        <div>
          <p>X: {gyroData.x?.toFixed(2) || '—'} рад/с</p>
          <p>Y: {gyroData.y?.toFixed(2) || '—'} рад/с</p>
          <p>Z: {gyroData.z?.toFixed(2) || '—'} рад/с</p>
        </div>
      )}
    </div>
  );
};

export default Compass;
