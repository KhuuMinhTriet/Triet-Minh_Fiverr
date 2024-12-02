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

export let postCommentActionService = createAsyncThunk(
  "userSlice/postCommentActionService",
  async (dataForm) => {
    let result = await http.post("/api/binh-luan", dataForm);
    return result.data.content;
  }
);

export let rentingGigActionService = createAsyncThunk(
  "userSlice/rentingGigActionService",
  async (dataForm) => {
    let result = await http.post("/api/thue-cong-viec", dataForm);
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
    postCommentAction: (state, action) => {
      state.postComment = action.payload;
    },
    rentingGigAction: (state, action) => {
      state.rentingGig = action.payload;
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

    //POST COMMENT
    builder.addCase(postCommentActionService.fulfilled, (state, action) => {
      state.postComment = action.payload;
    });
    builder.addCase(postCommentActionService.rejected, (state, action) => {});

    //RENTING GIG
    builder.addCase(rentingGigActionService.fulfilled, (state, action) => {
      state.rentingGig = action.payload;
    });
    builder.addCase(rentingGigActionService.rejected, (state, action) => {});
  },
});

export const {
  setUserAction,
  updateAvatarAction,
  postCommentAction,
  rentingGigAction,
} = userSlice.actions;

export default userSlice.reducer;
