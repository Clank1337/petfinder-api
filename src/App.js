import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import SearchPage from './app/pages/SearchPage';
import AnimalDetailPage from "./app/pages/AnimalDetailPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/animals/:animalId" element={<AnimalDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
