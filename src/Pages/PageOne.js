import { useState, useEffect } from 'react';  
import { useNavigate } from "react-router-dom"

function PageOne() {  

  let navigate = useNavigate();
  const [location, setLocation] = useState({ latitude: null, longitude: null });  
  useEffect(() => {  
  const getLocation = () => {  
  if (navigator.geolocation) {  
    navigator.geolocation.getCurrentPosition((position) => {  
    setLocation({ latitude: position.coords.latitude.toFixed(6), longitude: position.coords.longitude.toFixed(6)});  
  }, (error) => {  
    console.error("Error getting location:", error);  
  } );  
  } else {  
    console.error("Geolocation is not supported by this browser.");  
  }  
  };
  getLocation();
  //мы не на месте
  //let x = 64.561142
  //let y = 39.816177
  //мы на месте
  //let x = 64.561005
  //let y = 39.816380
   },);  
  return (  
    <div>  
    {location.latitude == 64.56004 && location.longitude == 39.81829 ? (  
      <div>  
        <p>Latitude: {location.latitude}</p>  
        <p>Longitude: {location.longitude}</p>
        <p>Мы на месте</p>
      </div>  
      ) : (  
    <p>
      <p>Latitude: {location.latitude}</p>  
      <p>Longitude: {location.longitude}</p>
      <p>Мы не на месте</p>
      </p>  
    )}  
    </div>  
  );  
 }  
export default PageOne;  