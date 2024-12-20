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
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thêm:', formData);
    throw error;
  }
})
;export const updateItem = createAsyncThunk(
  "adminSlice/updateItem",
  async ({ modalType, id, formData }, { dispatch }) => {
    try {
      let response;
      switch (modalType) {
        case "users":
          response = await fiverrService.capNhatNguoiDung(id, formData);
          break;
        case "jobs":
          response = await fiverrService.capNhatCongViec(id, formData);
          break;
        case "jobTypes":
          response = await fiverrService.capNhatLoaiCongViec(id, formData);
          break;
        case "services":
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
);
export const deleteItemAsync = createAsyncThunk(
    "adminSlice/deleteItemAsync",
    async ({ modalType, id }, { dispatch }) => {
      try {
        let response;
        switch (modalType) {
          case "users":
            response = await fiverrService.xoaNguoidung(id);
            break;
          case "jobs":
            response = await fiverrService.xoaCongViecDaThue(id);
            break;
          case "jobTypes":
            response = await fiverrService.xoaLoaiCongViecDaThue(id);
            break;
          case "services":
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
    pagination: {
      currentPage: 1,  
      totalPages: 1,   
    },
    users: { list: [], loading: false, error: null },
    jobs: { list: [], loading: false, error: null },
    jobTypes: { list: [], loading: false, error: null },
    services: { list: [], loading: false, error: null },
    modal: {
      isVisible: false, 
      type: null,      
    }
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    openModal: (state, action) => {
      state.modal.isVisible = true;
      state.modal.type = action.payload; 
    },
    closeModal: (state) => {
      state.modal.isVisible = false;
      state.modal.type = null; 
    },
    setTotalPages: (state, action) => {
      state.pagination.totalPages = action.payload;
    },
    updateItem: (state, action) => {
      const { type, id, data } = action.payload;
      const resourceState = state[type];
      
      resourceState.list = resourceState.list.map((item) =>
        item.id === id ? { ...item, ...data } : item
      );
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
        .addCase(thunk.fulfilled, (state, action) => {
          handleResourceState(state, name, "fulfilled", action);
          const totalPages = action.payload.totalPages;
          state.pagination.totalPages = totalPages;
        })
        .addCase(thunk.rejected, (state, action) => handleResourceState(state, name, "rejected", action));
    });
  
    
    builder
    .addCase(updateItem.pending, (state) => {
      state.loading = true; 
    })
    builder.addCase(updateItem.fulfilled, (state, action) => {
      const { modalType, id, data } = action.payload;
      const resourceState = state[modalType];
    
      
      const index = resourceState.list.findIndex(item => item.id === id);
      if (index !== -1) {
        resourceState.list[index] = { ...resourceState.list[index], ...data };
      }
      resourceState.loading = false;
      resourceState.error = null;
    })
    .addCase(updateItem.rejected, (state, action) => {
      state.loading = false; 
      state.error = action.error.message;
      });
      
  },
  
});

export const { deleteItem, setPage, resetState, openModal, closeModal} = adminSlice.actions;
export default adminSlice.reducer;
