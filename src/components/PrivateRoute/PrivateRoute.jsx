import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export default function PrivateRoute({ content }) {
  let user = useSelector((state) => state.userSlice.dataLogin);
  let params = useParams();

  // Kiểm tra nếu không có user hoặc cố ý trỏ sang user khác, chuyển hướng về trang chủ
  if (!user || !user.user.id) {
    return <Navigate to="/" />;
  }

  if (params.id !== user.user.id.toString()) {
    return <Navigate to="/" />;
  }

  return content; // Render nội dung nếu có user
}
