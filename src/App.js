import { Routes, Route } from 'react-router-dom';
import PageOne from "./Pages/PageOne";
import PageTwo from "./Pages/PageTwo";


function App() {
  return (
     <Routes>
      <Route path="/one" element={<PageOne/>} />
      <Route path="/two" element={<PageTwo/>} />
     </Routes>
  );
}

export default App;
