import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fiverrService } from '../services/fetchAPI';
import Swal from 'sweetalert2';
import formTable from '../pages/AdminPage/formData/formTable.json'
// Hàm xử lý trạng thái của các resources
const handleResourceState = (state, resource, status, action) => {
  switch (status) {
    case "pending":
      state.loading = true;
      break;
    case "fulfilled":
      state.list = action.payload;
      state.loading = false;
      state.error = null;
      break;
    case "rejected":
      state.loading = false;
      state.error = action.error.message;
      break;
    default:
      break;
  }
};
export const fetchPaginatedData = createAsyncThunk(
  "adminSlice/fetchPaginatedData",
  async ({ resourceType, pageIndex, pageSize }) => {
    const response = await fiverrService.fetchPaginated(resourceType, pageIndex, pageSize);
    return {
      resourceType,
      data: response?.data.content || [],
      total: response?.data.totalCount || 0,
    };
  }
);
export const fetchDetail = createAsyncThunk("data/fetchDetail", async (resourceType, id) => {
  let response;
  
  switch (resourceType) {
    case 'jobs':
      response = await fiverrService.layCongViecChitiet();
      break;
    case 'users':
      response = await fiverrService.layUserTheoID();
      break;
    case 'jobTypes':
      response = await fiverrService.layLoaiCongViecChiTiet();
      break;
    case 'services':
      response = await fiverrService.LayLoaiDichVuChitiet();
      break;
    default:
      throw new Error("Resource type not supported");
  }
  
  return response?.data.content || [];
});

// Các async actions để fetch dữ liệu từ server
export const fetchData = createAsyncThunk("data/fetchData", async (resourceType) => {
  let response;
  
  switch (resourceType) {
    case 'jobs':
      response = await fiverrService.layCongViec();
      break;
    case 'users':
      response = await fiverrService.layUser();
      break;
    case 'jobTypes':
      response = await fiverrService.layLoaiCongViec();
      break;
    case 'services':
      response = await fiverrService.LayLoaiDichVu();
      break;
    default:
      throw new Error("Resource type not supported");
  }
  
  return response?.data.content || [];
});

// Thêm item (người dùng, công việc, loại công việc, dịch vụ)
export const addItem = createAsyncThunk('adminSlice/addItem', async ({ resourceType, formData }) => {
  try {
    let response;
    switch (resourceType) {
      case 'user':
        response = await fiverrService.themnguoidung(formData);
        break;
        case 'admin':
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
        throw new Error("Resource type không hợp lệ");
    }
    return response?.data.content || [];
  } catch (error) {
    console.error('Lỗi khi thêm:', formData);
    throw error;
  }
});

export const updateItem = createAsyncThunk(
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
        case 'image': 
          response = await fiverrService.CapNhatAvatar(formData);
        break;
        default:
          throw new Error("Modal type không hợp lệ");
      }
      return response?.data.content || []
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
  

export const searchUserOnPage = createAsyncThunk("data/searchUserOnPage", async ({pageIndex, pageSize}) => {
  const response = await fiverrService.searchUserOnPage(pageIndex, pageSize);

  return response?.data.content || [];
});

export const searchJob = createAsyncThunk("data/searchJob", async ({pageIndex, pageSize}) => {
  const response = await fiverrService.searchJob(pageIndex, pageSize);

  return response?.data.content || [];
});
export const searchTypeJob = createAsyncThunk("data/searchTypeJob", async ({pageIndex, pageSize}) => {
  const response = await fiverrService.searchTypeJob(pageIndex, pageSize);

  return response?.data.content || [];
});
export const searchService = createAsyncThunk("data/searchService", async ({pageIndex, pageSize}) => {
  const response = await fiverrService.searchService(pageIndex, pageSize);

  return response?.data.content || [];
});
// Redux slice
const adminSlice = createSlice({
  name: "data",
  initialState: {
    activeTable: "users", // Bảng mặc định ban đầu
    tableData: formTable.users, // Dữ liệu ban đầu cho bảng "users"
    isVisible: false,
    deleteModal:false,
    logoutModal: false,
    updateModal: false,
    modalType: null,
    currentPage: 'admin',
    isItemSearch: false,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      pageIndex: 1,
      pageSize: 10,
      isSearch: false,
    },
    searchItem:[],
    id: 0,
    list: [],
    originalData: [],
    loading: false,
    error: null,
    resourceType: '',  
    searchResults: { list: [], originalData: [], loading: false, error: null },
    activeComponent: null, 
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemSearch: (state, action) => {
      state.isItemSearch = action.payload
    },
    setActiveTable: (state, action) => {
      const tableName = action.payload;
      state.activeTable = tableName;
      state.tableData = formTable[tableName] || [];
   
      state.list = state.originalData
    },
    setSearchItem : (state, action) => {
      state.searchItem = action.payload
    },
    setSearchResults: (state, action) => {
      const newPageSize = action.payload.pageSize;
      state.pagination.pageSize = newPageSize;
      state.pagination.pageIndex = action.payload.pageIndex; 
      state.isItemSearch = false
      state.pagination.currentPage = state.pagination.pageIndex;
    

      const totalItems = state.originalData.length;
      const totalPages = Math.ceil(totalItems / state.pagination.pageSize);
      state.pagination.totalPages = totalPages;
    
      const startIndex = (state.pagination.pageIndex - 1) * state.pagination.pageSize;
      const endIndex = startIndex + state.pagination.pageSize;
    

      state.list = state.originalData.slice(startIndex, endIndex);
    },
    resetSearchResults: (state) => {
      state.searchResults.list = [];  
      state.pagination.isSearch = false;
      state.isItemSearch = false
      state.list = [...state.originalData];  
    },
    openModal: (state, action) => {
      state.isVisible = true;
      state.modalType = action.payload;
    },
    closeModal: (state) => {
      state.isVisible = false;
      state.modalType = null;
    },
    openModalDelete: (state, action) => {
      state.deleteModal = true
      state.id = action.payload
    },
    openLogoutModal: (state) =>{
      state.logoutModal = true
    },
    closeModalDelete: (state) => {
      state.deleteModal = false;
      state.id = 0
    },
    openUpdateModal: (state) =>{
      state.updateModal = true
    },
    closeUpdateModal: (state) => {
      state.updateModal = false;
      state.id = 0
    },
    closeLogoutModal: (state) =>{
      state.logoutModal = false
    },
    setTotalPages: (state, action) => {
      state.pagination.totalPages = action.payload;
    },
   
    updateItem: (state, action) => {
      const { id, data } = action.payload;
      const index = state.list.findIndex(item => item.id === id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...data };
      }
    },
    deleteItem: (state, action) => {
      const { id } = action.payload;
      state.list = state.list.filter((item) => item.id !== id);
    },
    //chuyển đổi nội dung table các component
    setComponent: (state, action) => {
      const { currentPage } = action.payload;
      state.activeComponent = currentPage;
      state.pagination.currentPage = currentPage;
      const startIndex = (currentPage - 1) * state.pagination.pageSize;
      const endIndex = startIndex + state.pagination.pageSize;
      state.list = state.originalData.slice(startIndex, endIndex);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        handleResourceState(state, action.meta.arg, 'fulfilled', action);
        state.originalData = action.payload;
        const totalPages = Math.ceil(action.payload.length / state.pagination.pageSize);
        state.pagination.totalPages = totalPages;

        state.list = action.payload.slice(0, state.pagination.pageSize);
  state.loading = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        handleResourceState(state, action.meta.arg, 'rejected', action);
        state.error = true;
      })
      builder
      .addCase(fetchDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDetail.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.searchResults.list = data;
        state.loading = false;
      })
      .addCase(fetchDetail.rejected, (state) => {
        state.loading = false;
        state.error = "Error fetching search results";
      });
      ;
  },
});

export const {setSearchResults, setItemSearch, setSearchItem,  openLogoutModal, closeLogoutModal, openUpdateModal, closeUpdateModal, openModalDelete, closeModalDelete, setDeleteId, setActiveTable, resetSearchResults, deleteItem, setPage, openModal, closeModal, setComponent } = adminSlice.actions;
export default adminSlice.reducer;
