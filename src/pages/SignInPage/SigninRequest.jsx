import Swal from "sweetalert2";
import { loginActionService } from "../../redux/userSlice";

export const handleLogin = async (values, dispatch, navigate) => {
  try {
    const result = await dispatch(loginActionService(values)).unwrap();

    // Lưu token vào localStorage
    let dataJson = JSON.stringify(result);
    localStorage.setItem("USER_LOGIN", dataJson);

    // Điều hướng dựa trên quyền của người dùng
    if (result.user.role === "ADMIN") {
   
      Swal.fire("Đăng nhập thành công!", "Chào mừng Admin!", "success");
      navigate("/admin");
    } else if (result.user.role === "USER") {
  
      Swal.fire("Đăng nhập thành công!", "Chào mừng Người dùng!", "success");
      navigate("/home");
    } else {
    
      // Hiển thị thông báo nếu vai trò không hợp lệ
      Swal.fire("Không có quyền truy cập!", "Vai trò không hợp lệ.", "error");
      // Xóa thông tin đăng nhập khỏi localStorage nếu cần
      localStorage.removeItem("USER_LOGIN");
    }

    return result;
  } catch (err) {
    Swal.fire("Email hoặc mật khẩu không chính xác", "", "error");
    throw err;
  }
};
