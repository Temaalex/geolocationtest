import { useRef, useState, useEffect } from 'react';
import Map from "./Map";
import Compass from './compass';

//Карта
const container = {
    display: 'grid',
    placeContent: 'center',
    gridTemplateColumns: 'repeat(500, 1px)',
    gridTemplateRows: 'repeat(500, 1px)',
    margin:'10px',
    width: '500px',
    height: '500px',
    backgroundColor: "blue",
    border: '1px solid black',  
}
const myPoint ={
    marginTop:'250px',
    marginLeft:'250px',
    width: '10px',
    height: '10px',
    backgroundColor: "red",
}

//Точка конечная
const pointFinish1 = {
    marginTop:'250px',
    marginLeft:'250px',
    width: '10px',
    height: '10px',
    backgroundColor: "black",
}
const pointFinish2 = {
    marginTop:'250px',
    marginLeft:'250px',
    width: '10px',
    height: '10px',
    backgroundColor: "yellow",
}
const pointFinish3 = {
    marginTop:'250px',
    marginLeft:'250px',
    width: '10px',
    height: '10px',
    backgroundColor: "green",
}
const pointFinish4 = {
    marginTop:'250px',
    marginLeft:'250px',
    width: '10px',
    height: '10px',
    backgroundColor: "gray",
}

const PageOne = () => {
  const ref = useRef();
  const ref0 = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const [showMessage, setShowMessage] = useState(false);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const geoOptoins = {
    enableHighAccuracy: false,//true точность выше
    maximumAge: 0,
    timeout: 1000,
  }
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        }, (error) => {
          console.error("Error getting location:", error);
        }, geoOptoins);
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };
      const arrEndPoints = {
        endAlfOne: [59.387193, 28.613817, ref0],
        endAlfTwo: [59.386137, 28.611207, ref1],
        endAlfThree: [59.383675, 28.610819, ref2],
        endAlfFour: [59.385322, 28.614828, ref3],
      }

    const formula =(endAlf, endBet, refPoint)=> {
      const myAlf = location.latitude
      const myBet = location.longitude
      const R=6371302
      const radian = (90-endAlf)*Math.PI/180
      const L1 = R*Math.sin(radian)*2*Math.PI
      const QstepB = 360/L1
      const QstepA = 360/(2*Math.PI*R)

      const multy= 0.5
      const endPointAlf = (((myAlf-endAlf)/QstepA)/multy)+250
      const endPointBet = (((myBet-endBet)/QstepB)/multy)+250
      
      //const styleMargintToppointMove = window.getComputedStyle(ref.current).getPropertyValue("margin-top");
      //const styleMargintLeftpointMove = window.getComputedStyle(ref.current).getPropertyValue("margin-left");

      refPoint.current.style.marginTop= Math.trunc(endPointAlf)+'px';
      refPoint.current.style.marginLeft = Math.trunc(endPointBet)+'px'; 

      if(
        250 >= Math.trunc(endPointAlf)-10  &&
        250 <= Math.trunc(endPointAlf)+10  && 
        250 >= Math.trunc(endPointBet)-10 && 
        250 <= Math.trunc(endPointBet)+10  
      ) {
        setShowMessage("На месте")
        
      } 
    }
    const interval = setInterval(() => {
      getLocation() 
      formula(arrEndPoints.endAlfOne[0], arrEndPoints.endAlfOne[1], arrEndPoints.endAlfOne[2])
      formula(arrEndPoints.endAlfTwo[0], arrEndPoints.endAlfTwo[1], arrEndPoints.endAlfTwo[2])
      formula(arrEndPoints.endAlfThree[0], arrEndPoints.endAlfThree[1], arrEndPoints.endAlfThree[2])
      formula(arrEndPoints.endAlfFour[0], arrEndPoints.endAlfFour[1], arrEndPoints.endAlfFour[2])
    }, 10000)
    return () => clearInterval(interval);
  },); 

  return (
    <div>
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <p>{showMessage}</p>
          
          <button onClick={() => setLocation(location.latitude, location.longitude)}>Нажми</button>
        </div>


    <div style={container}>
      <div ref={ref} style={myPoint}>
        <Compass/>
      </div>
      <div ref={ref0} style={pointFinish1}></div>
      <div ref={ref1} style={pointFinish2}></div>
      <div ref={ref2} style={pointFinish3}></div>
      <div ref={ref3} style={pointFinish4}></div>
    </div>   
    </div>
  );
}
export default PageOne;  