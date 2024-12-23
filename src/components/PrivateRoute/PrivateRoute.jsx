// PrivateRoute.js
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

export default function PrivateRoute({ component: Component, roleRequired, content }) {
  const user = useSelector((state) => state.userSlice.dataLogin); // Lấy thông tin người dùng từ Redux
  const params = useParams();

  // Kiểm tra nếu không có user, chuyển hướng về trang chủ
  if (!user || !user.user.id) {
    return <Navigate to="/" />;
  }

  // Kiểm tra quyền truy cập: nếu yêu cầu admin mà người dùng không phải admin
  if (roleRequired === 'ADMIN' && user.user.role !== 'ADMIN') {
    return <Navigate to="/home" />;
  }

  // Kiểm tra nếu là trang người dùng, đảm bảo người dùng chỉ có thể truy cập trang của chính họ
  if (params.id && params.id !== user.user.id.toString()) {
    return <Navigate to="/home" />;  // Chuyển hướng về trang chủ nếu người dùng không phải là trang của mình
  }

  return content || <Component />; // Render nội dung nếu người dùng hợp lệ
}
