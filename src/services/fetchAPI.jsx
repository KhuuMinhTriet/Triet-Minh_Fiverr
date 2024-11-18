import { http } from "./config";

export let fiverrService = {
  layMenuLoaiCongViec: () => {
    return http.get("/api/cong-viec/lay-menu-loai-cong-viec");
  },
};
