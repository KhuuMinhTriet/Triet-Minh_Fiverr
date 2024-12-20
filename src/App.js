import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import JobByCategoriesPage from "./pages/JobByCategoriesPage/JobByCategoriesPage";
import JobTypePage from "./pages/JobTypePage/JobTypePage";
import JobDetailPage from "./pages/JobDetailPage/JobDetailPage";
import JobFindByNamePage from "./pages/JobFindByNamePage/JobFindByNamePage";
import UserAccountPage from "./pages/UserAccountPage/UserAccountPage";
import AdminPage from './pages/AdminPage/admin/admin'; // Import AdminPage

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/job-type/:id"
            element={<JobTypePage />}
          />
          <Route
            path="/job-by-categories/:id"
            element={<JobByCategoriesPage />}
          />
          <Route
            path="/job-by-name/:id"
            element={<JobFindByNamePage />}
          />
          <Route
            path="/job-detail/:id"
            element={<JobDetailPage />}
          />
          <Route
            path="/login"
            element={<SignInPage />}
          />
          <Route
            path="/register"
            element={<SignUpPage />}
          />
          <Route
            path="/user/:id"
            element={<UserAccountPage />}
          />
          {/* Remove Layout for admin page */}
          <Route
            path="/admin"
            element={<AdminPage />}
          />
          <Route
            path="/admin/:subPage"
            element={<AdminPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
