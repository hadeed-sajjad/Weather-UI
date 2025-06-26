import { BrowserRouter, Routes, Route } from "react-router";
import Welcome from "./pages/welcome";
import Today from "./pages/today";
import Weekly from "./pages/weekly";
import './index.css'

function App() {
  return (
    <div className="overflow-hidden font-poppins">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/today" element={<Today />} />
        <Route path="/weekly" element={<Weekly />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
