import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Template/Layout";
import HomePage from "./pages/HomePage/HomePage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import JobByCategoriesPage from "./pages/JobByCategoriesPage/JobByCategoriesPage";
import JobTypePage from "./pages/JobTypePage/JobTypePage";

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
            path="/job-type/:id"
            element={<Layout enableScroll={false} content={<JobTypePage />} />}
          />
          <Route
            path="/job-by-categories/:id"
            element={
              <Layout enableScroll={false} content={<JobByCategoriesPage />} />
            }
          />
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
