import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import JobByCategoriesPage from "./pages/JobByCategoriesPage/JobByCategoriesPage";
import JobTypePage from "./pages/JobTypePage/JobTypePage";
import JobDetailPage from "./pages/JobDetailPage/JobDetailPage";
import JobFindByNamePage from "./pages/JobFindByNamePage/JobFindByNamePage";
import UserAccountPage from "./pages/UserAccountPage/UserAccountPage";
import AdminPage from './pages/AdminPage/admin/admin';
import Layout from "./Template/Layout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import NavigatePage from './pages/NavigatePage/navigatePage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavigatePage />} />
          <Route
            path="/home"
            element={<Layout enableScroll={true} content={<HomePage />} />} 
          />
          <Route
            path="/job-type/:id"
            element={<Layout enableScroll={false} content={<JobTypePage />} />}
          />
          <Route
            path="/job-by-categories/:id"
            element={<Layout enableScroll={false} content={<JobByCategoriesPage />} />}
          />
          <Route
            path="/job-by-name/:id"
            element={<Layout enableScroll={false} content={<JobFindByNamePage />} />}
          />
          <Route
            path="/job-detail/:id"
            element={<Layout enableScroll={false} content={<JobDetailPage />} />}
          />
          <Route
            path="/login"
            element={<Layout enableScroll={false} content={<SignInPage />} />}
          />
          <Route
            path="/register"
            element={<Layout enableScroll={false} content={<SignUpPage />} />}
          />
          
          {/* Protected routes */}
          <Route
            path="/user/:id"
            element={<PrivateRoute component={<Layout enableScroll={false} content={<UserAccountPage />} />} />}
          />
       <Route path="/admin" element={<AdminPage />} />
<Route path="/admin/:subPage" element={<AdminPage />} />


          <Route
            path="/navigate"
            element={<Layout enableScroll={false} content={<NavigatePage />} />}
          />
          
          {/* Default route */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
