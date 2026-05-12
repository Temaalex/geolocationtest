import { Routes, Route } from 'react-router-dom';
import PageOne from "./Pages/PageOne";
import Map from "./Pages/Map";


function App() {
  return (
     <Routes>
      <Route path="/one" element={<PageOne/>} />
      <Route path="/map" element={<Map/>} />
     </Routes>
  );
}

export default App;
