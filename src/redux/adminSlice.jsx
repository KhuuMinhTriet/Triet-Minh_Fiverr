import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fiverrService } from '../services/fetchAPI';

// Hàm xử lý trạng thái của các resources
const handleResourceState = (state, resource, status, action) => {
  const resourceState = state[resource]; 

  switch (status) {
    case "pending":
      resourceState.loading = true;
      break;
    case "fulfilled":
      resourceState.list = action.payload;
      resourceState.loading = false;
      resourceState.error = null;
      break;
    case "rejected":
      resourceState.loading = false;
      resourceState.error = action.error.message;
      break;
    default:
      break;
  }
};

// Các async actions để fetch dữ liệu từ server
export const fetchJobs = createAsyncThunk("data/fetchJobs", async () => {
  const response = await fiverrService.layCongViec();
  return response?.data.content || [];
});

export const fetchUsers = createAsyncThunk("data/fetchUsers", async () => {
  const response = await fiverrService.layUser();
  return response?.data.content || [];
});

export const fetchJobTypes = createAsyncThunk("data/fetchJobTypes", async () => {
  const response = await fiverrService.layLoaiCongViec();
  return response?.data.content || [];
});

export const fetchServices = createAsyncThunk("data/fetchServices", async () => {
  const response = await fiverrService.LayLoaiDichVu();
  return response?.data.content || [];
});

// Thêm item (người dùng, công việc, loại công việc, dịch vụ)
export const addItem = createAsyncThunk('adminSlice/addItem', async ({ modalType, formData }) => {
  try {
    let response;
    switch (modalType) {
      case 'user':
        response = await fiverrService.themnguoidung(formData);
        break;
     
      case 'job':
        response = await fiverrService.themcongviec(formData);
        break;
      case 'jobType':
        response = await fiverrService.themloaiwork(formData);
        break;
      case 'service':
        response = await fiverrService.themdichvu(formData);
        break;
      default:
        throw new Error("Modal type không hợp lệ");
    }

    console.log(`${modalType} đã thêm thành công:`, response.data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thêm:', formData);
    throw error;
  }
});
export const updateItem = createAsyncThunk(
    "adminSlice/updateItem",
    async ({ modalType, id, formData }) => {
      try {
        let response;
        switch (modalType) {
          case "user":
            response = await fiverrService.capNhatNguoiDung(id, formData);
            break;
          case "job":
            response = await fiverrService.capNhatCongViec(id, formData);
            break;
          case "jobType":
            response = await fiverrService.capNhatLoaiCongViec(id, formData);
            break;
          case "service":
            response = await fiverrService.capNhatDichVu(id, formData);
            break;
          default:
            throw new Error("Modal type không hợp lệ");
        }
  
        console.log(`${modalType} đã cập nhật thành công:`, response.data);
        return { modalType, id, data: response.data };
      } catch (error) {
        console.error("Lỗi khi cập nhật:", error);
        throw error;
      }
    }
  );export const deleteItemAsync = createAsyncThunk(
    "adminSlice/deleteItemAsync",
    async ({ modalType, id }, { dispatch }) => {
      try {
        let response;
        switch (modalType) {
          case "users":
            response = await fiverrService.xoaNguoidung(id);
            break;
          case "job":
            response = await fiverrService.xoaCongViecDaThue(id);
            break;
          case "jobType":
            response = await fiverrService.xoaLoaiCongViecDaThue(id);
            break;
          case "service":
            response = await fiverrService.xoaDichVuDaThue(id);
            break;
          default:
            throw new Error("Modal type không hợp lệ");
        }
  
        // Cập nhật lại store sau khi xóa thành công
        dispatch(deleteItem({ type: modalType, id }));
        return { modalType, id };
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
        throw error;
      }
    }
  );
  
// Redux slice
const adminSlice = createSlice({
  name: "data",
  initialState: {
    currentPage: 'admin',
    users: { list: [], loading: false, error: null },
    jobs: { list: [], loading: false, error: null },
    jobTypes: { list: [], loading: false, error: null },
    services: { list: [], loading: false, error: null },
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },

    deleteItem: (state, action) => {
      const { type, id } = action.payload;
      state[type].list = state[type].list.filter((item) => item.id !== id);
    },

      
    resetState: (state) => {
      // Reset tất cả các resource
      state.users = { list: [], loading: false, error: null };
      state.jobs = { list: [], loading: false, error: null };
      state.jobTypes = { list: [], loading: false, error: null };
      state.services = { list: [], loading: false, error: null };
    },
  },
  extraReducers: (builder) => {
    const resources = [
      { name: "jobs", thunk: fetchJobs },
      { name: "users", thunk: fetchUsers },
      { name: "jobTypes", thunk: fetchJobTypes },
      { name: "services", thunk: fetchServices },
    ];
  
    resources.forEach(({ name, thunk }) => {
      builder
        .addCase(thunk.pending, (state) => handleResourceState(state, name, "pending"))
        .addCase(thunk.fulfilled, (state, action) => handleResourceState(state, name, "fulfilled", action))
        .addCase(thunk.rejected, (state, action) => handleResourceState(state, name, "rejected", action));
    });
  
    // Thêm xử lý cho updateItem
    builder
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const { modalType, id, data } = action.payload;
        const resourceState = state[modalType];
  
        // Cập nhật item trong danh sách
        const index = resourceState.list.findIndex((item) => item.id === id);
        if (index !== -1) {
          resourceState.list[index] = { ...resourceState.list[index], ...data };
        }
  
        resourceState.loading = false;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      
  },
  
});

export const { deleteItem, setPage, resetState } = adminSlice.actions;
export default adminSlice.reducer;
