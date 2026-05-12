import { useRef, useState, useEffect } from 'react';
import Map from "./Map";

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
const pointFinish = {
    marginTop:'250px',
    marginLeft:'250px',
    width: '10px',
    height: '10px',
    backgroundColor: "black",
}

const PageOne = () => {
  const ref = useRef();
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const geoOptoins = {
    enableHighAccuracy: true,
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
    const formula =()=> {
      
      const myAlf = location.latitude
      const myBet = location.longitude
      const endAlf = 59.875452
      const endBet = 30.257329
      const R=6371302

      const radian = (90-endAlf)*Math.PI/180
      const L1 = R*Math.sin(radian)*2*Math.PI
      const QstepB = 360/L1
      const QstepA = 360/(2*Math.PI*R)

      const endPointAlf = ((myAlf-endAlf)/QstepA)/100
      const endPointBet = ((myBet-endBet)/QstepB)/100
      
      const styleMargintToppointMove = window.getComputedStyle(ref.current).getPropertyValue("margin-top");
      const styleMargintLeftpointMove = window.getComputedStyle(ref.current).getPropertyValue("margin-left");
      ref.current.style.marginTop= Math.trunc(endPointAlf+250)+'px';
      ref.current.style.marginLeft = Math.trunc(endPointBet+250)+'px';

      //console.log(endPointAlf)
      //console.log(endPointBet)
      //console.log ("1m по бетта ="+QstepB)
      //console.log ("1m по альфа ="+QstepA)

      //console.log(((myAlf-endAlf)/QstepA)) //метров по альфа до точки
      //console.log(((myBet-endBet)/QstepB)/100) //метров по бетта до точки
    }
    //const timer = setInterval(()=>formula(),1000)
    const interval = setInterval(() => {
      getLocation() 
      formula()
    }, 500)
    return () => clearInterval(interval);
  },); 

  return (
    <div>
      {location.latitude == 64.5608 && location.longitude == 39.8139 ? (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <p>Мы на месте</p>
          
          <button onClick={() => setLocation(location.latitude, location.longitude)}>Нажми</button>
        </div>
      ) : (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <p>Мы не на месте</p>
          <button onClick={() => setLocation(location.latitude, location.longitude)}>Нажми</button>
        </div>
      )}

    <div style={container}>
      <div ref={ref} style={myPoint}></div>
      <div ref={ref} style={pointFinish}></div>
    </div>   
    </div>
  );
}
export default PageOne;  