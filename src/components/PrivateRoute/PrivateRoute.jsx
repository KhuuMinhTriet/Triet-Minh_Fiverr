import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import handleLogin from '../../pages/SignInPage/SigninRequest';

export default function PrivateRoute({ content }) {
  const user = useSelector((state) => state.userSlice.dataLogin); // Lấy thông tin người dùng từ Redux
  const params = useParams();

  // Kiểm tra nếu không có user hoặc người dùng không có id, chuyển hướng về trang chủ
  if (!user || !user.user.id) {
    return <Navigate to="/" />;
  }

  // Kiểm tra nếu là trang người dùng, đảm bảo người dùng chỉ có thể truy cập trang của chính họ
  if (params.id !== user.user.id.toString()) {
    return <Navigate to="/home" />;  // Chuyển hướng về trang chủ nếu người dùng không phải là trang của mình
  }

  return content; // Render nội dung nếu người dùng hợp lệ
}
