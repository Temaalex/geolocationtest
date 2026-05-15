import { Routes, Route } from 'react-router-dom';
import PageOne from "./Pages/PageOne";
import Compass from "./Pages/compass";


function App() {
  return (
     <Routes>
      <Route path="/one" element={<PageOne/>} />
      <Route path="/compass" element={<Compass/>} />
     </Routes>
  );
}

export default App;
