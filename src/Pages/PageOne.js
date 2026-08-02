import { useCallback, useRef, useState, useEffect } from 'react';
import Compass from './compass';
import { useNavigate } from "react-router-dom"
import GallowsGame from './GallowsGame';

//Карта
const container = {
    overflow: 'hidden',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    zoom: '1'
}

const dashedLine = {
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
  const containerRef = useRef(null);
  let navigate = useNavigate();
  const [showGG, setShowGG] = useState(false);
  
  const [showMessage, setShowMessage] = useState(false);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  const geoOptoins = {
    enableHighAccuracy: false,
    maximumAge: 0,
    timeout: 1000,
  };
    const arrEndPoints = {
      endAlfOne: [59.832137, 30.251200, ref0],
      //endAlfTwo: [59.831223, 30.246503, ref1],
      endAlfTwo: [59.830740, 30.246296, ref1],
      endAlfThree: [59.832186, 30.224125, ref2],
      endAlfFour: [59.831887, 30.249914, ref3],
      }

  const zoomIn = () => {
    if (containerRef.current) {
      const zoomer = 1
      containerRef.current.style.zoom = zoomer++;
    }
  };

const formula  = (endAlf, endBet, refPoint) => {
        const myAlf = location.latitude;
        const myBet = location.longitude;
        const R = 6371302;
        const radian = (90 - endAlf) * Math.PI / 180;
        const L1 = R * Math.sin(radian) * 2 * Math.PI;
        const QstepB = 360 / L1;
        const QstepA = 360 / (2 * Math.PI * R);
        
        let multy = 2; 
        const endPointAlf = ((myAlf.toFixed(6) - endAlf) / QstepA) / multy;
        const endPointBet = ((myBet.toFixed(6) - endBet) / QstepB) / multy;

        refPoint.current.style.marginTop = Math.trunc(endPointAlf) + 'px';
        refPoint.current.style.marginLeft = Math.trunc(endPointBet) + 'px';

        if(Number(myAlf.toFixed(5)) == Number(arrEndPoints.endAlfOne[0].toFixed(5)) &&
           Number(myBet.toFixed(5)) == Number(arrEndPoints.endAlfOne[1].toFixed(5))){
           setShowMessage("Мы на месте 1");
           //navigate('/GallowsGame') 
           setShowGG(!showGG)

        }
        if(Number(myAlf.toFixed(5)) == Number(arrEndPoints.endAlfTwo[0].toFixed(5))&&
           Number(myBet.toFixed(5)) == Number(arrEndPoints.endAlfTwo[1].toFixed(5))){
           setShowMessage("Мы на месте 2");
           //navigate('/GallowsGameTwo') 
           setShowGG(!showGG)
        }
        if(Number(myAlf.toFixed(5)) == Number(arrEndPoints.endAlfThree[0].toFixed(5))&&
           Number(myBet.toFixed(5)) == Number(arrEndPoints.endAlfThree[1].toFixed(5))){
           setShowMessage("Мы на месте 3");
          // navigate('/GallowsGameThree') 
          setShowGG(!showGG)
        }
        if(Number(myAlf.toFixed(5)) == Number(arrEndPoints.endAlfFour[0].toFixed(5))&&
           Number(myBet.toFixed(5)) == Number(arrEndPoints.endAlfThree[1].toFixed(5))){
           setShowMessage("Мы на месте 4");
           //navigate('/GallowsGameFore') 
           setShowGG(!showGG)
        }
        
      //   if(
      //       0 >= Math.trunc(endPointAlf)-20 &&
      //       0 <= Math.trunc(endPointAlf)+20 &&
      //       0 >= Math.trunc(endPointBet)-20 &&
      //       0 <= Math.trunc(endPointBet)+20
      //   ) { 
      //      console.log("На месте 1")

      //     //setShowMessage("На месте 2") 
      //     //navigate('/GallowsGame')         
      //   } else {
      //     setShowMessage("");
      // }
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
    const interval = setInterval(() => {
      getLocation();
      formula(arrEndPoints.endAlfOne[0], arrEndPoints.endAlfOne[1], arrEndPoints.endAlfOne[2])
      formula(arrEndPoints.endAlfTwo[0], arrEndPoints.endAlfTwo[1], arrEndPoints.endAlfTwo[2])
      formula(arrEndPoints.endAlfThree[0], arrEndPoints.endAlfThree[1], arrEndPoints.endAlfThree[2])
      formula(arrEndPoints.endAlfFour[0], arrEndPoints.endAlfFour[1], arrEndPoints.endAlfFour[2])

    }, 2000);
    return () => clearInterval(interval);
  }, [location]); 


  return (
    <div>
      <div>
        <p style={{ color: "green" }}>Latitude: {location.latitude}</p>
        <p style={{ color: "green" }}>Longitude: {location.longitude}</p>
        <p style={{ color: "green" }}>{showMessage}</p>
      </div>

      <div ref={containerRef} style={container}>
        <Compass />

        {showGG && <GallowsGame onGameEnd={() => setShowGG(false)} />}
        {/* <button onClick={() => setShowGG(!showGG)}>button
          
        </button> */}
        


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
        <button style={{zIndex: '10',position: 'absolute'}} onClick={zoomIn}>zoom+</button>
        <button>zoom-</button>
      </div>
    </div>
  );
};

export default PageOne;