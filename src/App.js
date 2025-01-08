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
import NavigatePage from './pages/NavigatePage/navigatePage'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Route cho NavigatePage (Trang chính) */}
          <Route path="/" element={<NavigatePage />} />
          
          {/* Route cho HomePage */}
          <Route
            path="/home"
            element={<Layout enableScroll={true} content={<HomePage />} />}
          />
          
          {/* Các route cho các trang công việc */}
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
          
          {/* Route cho trang đăng nhập và đăng ký */}
          <Route
            path="/login"
            element={<Layout enableScroll={false} content={<SignInPage />} />}
          />
          <Route
            path="/register"
            element={<Layout enableScroll={false} content={<SignUpPage />} />}
          />
          
          {/* Route cho UserAccountPage, yêu cầu người dùng đăng nhập và kiểm tra quyền */}
          <Route
            path="/user/:id"
            element={
              <Layout
                enableScroll={false}
                content={<PrivateRoute component={UserAccountPage} />}
              />
            }
          />
          
          {/* Route cho trang Admin, chỉ cho phép Admin truy cập */}
          <Route
            path="/admin"
            element={
              <PrivateRoute
                component={AdminPage}
                roleRequired="ADMIN" // Chỉ cho phép admin truy cập
              />
            }
          />

          {/* Route phụ cho các trang con của Admin */}
          <Route
            path="/admin/QuanLyNguoiDung"
            element={<PrivateRoute component={AdminPage} roleRequired="ADMIN" />}
          />
          <Route
            path="/admin/QuanLyCongViec"
            element={<PrivateRoute component={AdminPage} roleRequired="ADMIN" />}
          />
          <Route
            path="/admin/QuanLyLoaiCongViec"
            element={<PrivateRoute component={AdminPage} roleRequired="ADMIN" />}
          />
          <Route
            path="/admin/QuanLyDichVu"
            element={<PrivateRoute component={AdminPage} roleRequired="ADMIN" />}
          />
          
          {/* Route mặc định cho NavigatePage */}
          <Route path="/admin/*" element={<NavigatePage />} />
          
          {/* Route cho các trường hợp không hợp lệ */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
