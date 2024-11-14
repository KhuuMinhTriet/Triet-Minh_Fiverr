import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Template/Layout";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout content={<HomePage />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
