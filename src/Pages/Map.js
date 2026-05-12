import { useRef } from 'react';
import { useState } from 'react';
//Карта
const container = {
    display: 'grid',
    placeContent: 'center',
    gridTemplateColumns: 'repeat(250, 1px)',
    gridTemplateRows: 'repeat(250, 1px)',
    margin:'10px',
    width: '250px',
    height: '250px',
    backgroundColor: "blue",
    border: '1px solid black',  
}

//Точка смещения
const pointMove = {
    marginTop:'125px',
    marginLeft:'125px',
    width: '10px',
    height: '10px',
    backgroundColor: "red",
}

//Точка конечная
const pointFinish = {
    marginTop:'100px',
    marginLeft:'100px',
    width: '10px',
    height: '10px',
    backgroundColor: "black",
}

//Логика
const Map = (props) => {  
  const latitudeStart = 59.389110;
  const longitudeStart = 28.617731;
  const latitude = props.latitude;
  const longitude = props.longitude;

  //Движение pointMove
  const ref = useRef();
  const handleClick = () => {
    const styleMargintToppointMove = window.getComputedStyle(ref.current).getPropertyValue("margin-top");
    const styleMargintLeftpointMove = window.getComputedStyle(ref.current).getPropertyValue("margin-left");
    const valueMargintToppointMoveNumber = Number(styleMargintToppointMove.slice(0, -2))
    const valueMargintLeftpointMoveNumber = Number(styleMargintLeftpointMove.slice(0, -2))

    ref.current.style.marginTop = valueMargintToppointMoveNumber+10+'px';
    ref.current.style.marginLeft = valueMargintLeftpointMoveNumber+10+'px';
    
    if(latitude>latitudeStart){
      const latitudeStep = latitudeStart-latitude
      ref.current.style.marginTop = valueMargintToppointMoveNumber+latitudeStep+10+'px';
    }
    
    if(longitude>longitudeStart){
      const latitudeStep = longitudeStart-longitude
      ref.current.style.marginLeft = valueMargintLeftpointMoveNumber+latitudeStep+10+'px';
    }

  }
  

//Вывод на экран
return (
  <div>
    <div style={container}>
      <div ref={ref} style={pointMove}></div>
      <div ref={ref} style={pointFinish}></div>
    </div>   
    <button onClick={handleClick}>Проверка</button> 
  </div>
  );
};
export default Map