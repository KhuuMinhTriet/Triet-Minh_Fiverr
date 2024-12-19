import { http } from "./config";

export let fiverrService = {
  layMenuLoaiCongViec: () => {
    return http.get("/api/cong-viec/lay-menu-loai-cong-viec");
  },

  layChiTietLoaiCongViec: (id) => {
    return http.get(`/api/cong-viec/lay-chi-tiet-loai-cong-viec/${id}`);
  },

  layCongViecTheoChiTietLoai: (id) => {
    return http.get(`/api/cong-viec/lay-cong-viec-theo-chi-tiet-loai/${id}`);
  },

  layCongViecTheoTen: (name) => {
    return http.get(`/api/cong-viec/lay-danh-sach-cong-viec-theo-ten/${name}`);
  },

  layCongViecChiTiet: (id) => {
    return http.get(`/api/cong-viec/lay-cong-viec-chi-tiet/${id}`);
  },

  layBinhLuanTheoCongViec: (id) => {
    return http.get(`/api/binh-luan/lay-binh-luan-theo-cong-viec/${id}`);
  },
  layUser: () => {
    return http.get(`/api/users`)
  },
  layUserTheoID: (id) => {
    return http.get(`/api/users/${id}`);
  },

  layDanhSachDaThue: () => {
    return http.get("/api/thue-cong-viec/lay-danh-sach-da-thue");
  },
  layCongViec: () => {
    return http.get("/api/cong-viec")
  },
  layLoaiCongViec: () => {
    return http.get(`/api/loai-cong-viec`);
  },
  LayLoaiDichVu: () => {
    return http.get('/api/thue-cong-viec')
  },
  themnguoidung: (data) => {
    return http.post('api/users', data)
  },
  themcongviec: (data) => {
    return http.post('api/cong-viec', data)
  },
  themloaiwork: (data) => {
    return http.post('api/chi-tiet-loai-cong-viec', data)
  },
  themdichvu: (data) => {
    return http.post('api/thue-cong-viec', data)
  },
  capNhatNguoiDung: (id, data) => {
    return http.put(`/api/users/${id}`, data);
  },
  
  capNhatCongViec: (id, data) => {
    return http.put(`/api/cong-viec/${id}`, data);
  },
  
  capNhatLoaiCongViec: (id, data) => {
    return http.put(`/api/chi-tiet-loai-cong-viec/${id}`, data);
  },
  
  capNhatDichVu: (id, data) => {
    return http.put(`/api/thue-cong-viec/${id}`, data);
  },
  
};
