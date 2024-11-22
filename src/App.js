import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Template/Layout";
import HomePage from "./pages/HomePage/HomePage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import JobDetailPage from "./pages/JobDetailPage/JobDetailPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Layout enableScroll={true} content={<HomePage />} />}
          />
          <Route
            path="/job-detail/:id"
            element={
              <Layout enableScroll={false} content={<JobDetailPage />} />
            }
          ></Route>
          <Route
            path="/login"
            element={<Layout enableScroll={false} content={<SignInPage />} />}
          />
          <Route
            path="/register"
            element={<Layout enableScroll={false} content={<SignUpPage />} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
