import { useState, useEffect } from 'react';  
//import { useNavigate } from "react-router-dom"

function PageOne() {  

  //let navigate = useNavigate();
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });  
  useEffect(() => {  
  const getLocation = () => {  
  if (navigator.geolocation) {  
    navigator.geolocation.getCurrentPosition((position) => {  
    setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude});  
  }, (error) => {  
    console.error("Error getting location:", error);  
  } );  
  } else {  
    console.error("Geolocation is not supported by this browser.");  
  }  
  };
  getLocation()
   },);  
  return (  
    <div>  
    {location.latitude == 64.5608 && location.longitude == 39.8139 ? (  
      <div>  
        <p>Latitude: {location.latitude}</p>  
        <p>Longitude: {location.longitude}</p>
        <p>Мы на месте</p>
        <button onClick={() => setLocation(location.latitude,location.longitude)}>Нажми</button>  
      </div>  
      ) : (  
    <div>
      <p>Latitude: {location.latitude}</p>  
      <p>Longitude: {location.longitude}</p>
      <p>Мы не на месте</p>
      <button onClick={() => setLocation(location.latitude,location.longitude)}>Нажми</button>  
    </div>  
    )}  
    </div>  
  );  
 }  
export default PageOne;  