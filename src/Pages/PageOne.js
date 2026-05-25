import { useRef, useState, useEffect } from 'react';
import Compass from './compass';

//Карта

const container = {
  //position: 'relative',
   //display: 'flex',
    //justifyContent: 'center',
    //alignContent: 'center',
    //placeContent: 'center',
    overflow: 'hidden',
    //gridTemplateColumns: 'repeat(100, 1px)',
    //gridTemplateRows: 'repeat(100, 1px)',
    //gridAutoColumns: '1px',
    //gridAutoRows: '1px',
    //margin:'10px',
    //minWidth: '500px',
    //minHeight: '500px',
    //backgroundColor: "black",
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    top: '0',
    left: '0',
    //border: '1px solid red',  
}

const dashedLine = {
  //borderTop: '2px dashed #d90d0d',
  //width: '100%'
  overflow: 'hidden',
  position: 'absolute',
    width: '100vw',
    height: '100vh',
    top: '0',
    left: '0',
}
//Точка конечная
const pointFinish1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '50px',
    height: '50px',
    backgroundColor: "blue",
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)'
}
const pointFinish2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '50px',
    height: '50px',
    backgroundColor: "red",
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)'
}
const pointFinish3 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '50px',
    height: '50px',
    backgroundColor: "green",
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)'
}
const pointFinish4 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '50px',
    height: '50px',
    backgroundColor: "gray",
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)'
}

const PageOne = () => {
  const ref = useRef();
  const ref0 = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();

  const [showMessage, setShowMessage] = useState(false);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  const [pointsData, setPointsData] = useState([
    { bet: 0, alf: 0 },
    { bet: 0, alf: 0 },
    { bet: 0, alf: 0 },
    { bet: 0, alf: 0 } 
  ]);

  const geoOptoins = {
    enableHighAccuracy: false,
    maximumAge: 0,
    timeout: 1000,
  };

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => console.error("Error getting location:", error),
          geoOptoins
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    const arrEndPoints = [
      [59.377577, 28.602025, ref0], 
      [59.376502, 28.614975, ref1], 
      [59.388303, 28.618216, ref2], 
      [59.383683, 28.614135, ref3]  
    ];

    // Обновляем данные для всех точек
    const updateAllPoints = () => {
      const newPointsData = arrEndPoints.map(([endAlf, endBet, refPoint], index) => {
        const myAlf = location.latitude;
        const myBet = location.longitude;
        const R = 6371302;
        const radian = (90 - endAlf) * Math.PI / 180;
        const L1 = R * Math.sin(radian) * 2 * Math.PI;
        const QstepB = 360 / L1;
        const QstepA = 360 / (2 * Math.PI * R);
        const multy = 1;

        const endPointAlf = ((myAlf - endAlf) / QstepA) / multy;
        const endPointBet = ((myBet - endBet) / QstepB) / multy;

        // Обновляем стили точки
        if (refPoint.current) {
          refPoint.current.style.marginTop = Math.trunc(endPointAlf) + 'px';
          refPoint.current.style.marginLeft = Math.trunc(endPointBet) + 'px';
        }

        return {
          bet: Math.trunc(endPointBet),
          alf: Math.trunc(endPointAlf)
        };
      });

      setPointsData(newPointsData);

      // Проверка «на месте» для всех точек
      const isAnyPointClose = newPointsData.some(({ bet, alf }) =>
        Math.abs(bet) <= 20 && Math.abs(alf) <= 20
      );
      if (isAnyPointClose) {
        setShowMessage("На месте");
      } else {
        setShowMessage("");
      }
    };

    getLocation();
    updateAllPoints();

    // const interval = setInterval(() => {
    //   getLocation();
    //   updateAllPoints();
    // }, 0);

    // return () => clearInterval(interval);
  }, [location]); // Зависимость от location

  return (
    <div>
      <div>
        <p style={{ color: "green" }}>Latitude: {location.latitude}</p>
        <p style={{ color: "green" }}>Longitude: {location.longitude}</p>
        <p style={{ color: "green" }}>{showMessage}</p>
        <button onClick={() => setLocation({ ...location })}>Нажми</button>
      </div>

      {/* SVG с 4 линиями — по одной для каждой точки */}
      <svg style={dashedLine}>
        {pointsData.map(({ bet, alf }, index) => (
          <line
            key={index}
            x1="50%"
            y1="50%"
            x2={window.innerWidth / 2 + bet}
            y2={window.innerHeight / 2 + alf}
            stroke="red"
            strokeWidth="3"
            stroke-dasharray="40, 10"
          />
        ))}
      </svg>

      <div style={container}>
        <Compass />
        <div ref={ref0} style={pointFinish1}>
          <div style={{ border: '1px solid rgba(56, 11, 236, 1)' }} className='circle' />
        </div>
        <div ref={ref1} style={pointFinish2}>
          <div style={{ border: '1px solid rgb(236, 35, 35)' }} className='circle' />
        </div>
        <div ref={ref2} style={pointFinish3}>
          <div style={{ border: '1px solid rgba(52, 220, 14, 1)' }} className='circle' />
        </div>
        <div ref={ref3} style={pointFinish4}>
          <div style={{ border: '1px solid rgba(184, 179, 205, 1)' }} className='circle' />
        </div>
      </div>
    </div>
  );
};

export default PageOne;