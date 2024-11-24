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
};
