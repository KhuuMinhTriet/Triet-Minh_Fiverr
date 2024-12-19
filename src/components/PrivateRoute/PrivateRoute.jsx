import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export default function PrivateRoute({ content, isAdminRoute }) {
  const user = useSelector((state) => state.userSlice.dataLogin);
  const params = useParams();

  // Kiểm tra nếu không có user hoặc người dùng không có id, chuyển hướng về trang chủ
  if (!user || !user.user.id) {
    return <Navigate to="/" />;
  }

  // Kiểm tra nếu không phải là admin và là route yêu cầu quyền admin
  if (isAdminRoute && user.user.role !== 'admin') {
    return <Navigate to="/" />;  // Chuyển hướng về trang chủ nếu không phải là admin
  }

  // Kiểm tra xem nếu là user page, đảm bảo rằng người dùng chỉ có thể truy cập trang của chính họ
  if (!isAdminRoute && params.id !== user.user.id.toString()) {
    return <Navigate to="/" />;
  }

  return content; // Render nội dung nếu người dùng hợp lệ
}
