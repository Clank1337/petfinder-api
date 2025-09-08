import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import AnimalDetailPage from "./app/pages/AnimalDetailPage";
import LandingPage from "./app/pages/LandingPage";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<SearchPage />} /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/animals/:animalId" element={<AnimalDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
