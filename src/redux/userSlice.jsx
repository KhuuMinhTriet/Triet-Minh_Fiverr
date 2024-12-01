import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "../services/config";

export let loginActionService = createAsyncThunk(
  "userSlice/loginActionService",
  async (dataForm) => {
    let result = await http.post("/api/auth/signin", dataForm);
    return result.data.content;
  }
);

export let registerActionService = createAsyncThunk(
  "userSlice/registerActionService",
  async (dataForm) => {
    let result = await http.post("/api/auth/signup", dataForm);
    return result.data.content;
  }
);

export let uploadAvatarActionService = createAsyncThunk(
  "userSlice/uploadAvatarActionService",
  async (dataForm) => {
    let result = await http.post("/api/users/upload-avatar", dataForm);
    return result.data.content;
  }
);

// lấy dữ liệu từ localStorage khi user bật web
// localStorage.getItem('key') ? JSON.parse(localStorage.getItem('key)) : null

const initialState = {
  dataLogin: localStorage.getItem("USER_LOGIN")
    ? JSON.parse(localStorage.getItem("USER_LOGIN"))
    : null, // <- chuỗi {} là true, để null để kết quả là false
  // trong trường hợp {} thì logic khi xử lý sẽ bị sai -> user rỗng vẫn load
  // để null cho không bị sai logic
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    // tạo action để dispatch từ component
    setUserAction: (state, action) => {
      state.dataLogin = action.payload;
    },
    updateAvatarAction: (state, action) => {
      state.avatar = action.payload;
    },
  },
  extraReducers: (builder) => {
    //fullfilled: khi gọi api thành công
    // pending: khi gọi api đang chờ xử lý (loading)
    // reject: khi gọi api thất bại

    // LOGIN
    builder.addCase(loginActionService.fulfilled, (state, action) => {
      state.dataLogin = action.payload;
    });
    builder.addCase(loginActionService.rejected, (state, action) => {});

    // REGISTER
    builder.addCase(registerActionService.fulfilled, (state, action) => {});
    builder.addCase(registerActionService.rejected, (state, action) => {});

    //UPLOAD AVATAR
    builder.addCase(uploadAvatarActionService.fulfilled, (state, action) => {
      state.avatar = action.payload;
    });
    builder.addCase(uploadAvatarActionService.rejected, (state, action) => {});
  },
});

export const { setUserAction, updateAvatarAction } = userSlice.actions;

export default userSlice.reducer;
