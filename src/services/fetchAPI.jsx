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

  layUserTheoID: (id) => {
    return http.get(`/api/users/${id}`);
  },

  layDanhSachDaThue: () => {
    return http.get("/api/thue-cong-viec/lay-danh-sach-da-thue");
  },
};
