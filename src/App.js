import { Routes, Route } from 'react-router-dom';
import PageOne from "./Pages/PageOne";
import Compass from "./Pages/compass";
import GallowsGame from "./Pages/GallowsGame";


function App() {
  return (
     <Routes>
      <Route path="/one" element={<PageOne/>} />
      <Route path="/compass" element={<Compass/>} />
      <Route path="/GallowsGame" element={<GallowsGame/>} />
     </Routes>
  );
}

export default App;
