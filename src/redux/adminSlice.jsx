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
    deleteModal:false,//Modal xóa
    logoutModal: false,//Modal đăng nhập
    updateModal: false,//Modal cập nhật thông tin admin
    modalType: null,//dựa vào kiểu modal trả về thông tin trong bảng add Modal
    currentPage: 'admin',//Mặc định là admin page
    isItemSearch: false,//trạng thái lọc điều kiện
    pagination: {//kiểm soát render danh sách dựa vào số page/ số danh sách trên 1 page
      currentPage: 1,
      totalPages: 1,
      pageIndex: 1,
      pageSize: 10,
      isSearch: false,
    },
    searchItem:[],//danh sách lọc điều kiện
    id: 0,
    list: [],//danh sách hiển thị ra component dựa vào pageIndex và pageSize
    originalData: [],//danh sách tất cả dữ liệu trả gọi về từ api 
    loading: false,//trạng thái chờ khi gọi api
    error: null,//lỗi khi khi gọi api thất bại
    resourceType: '',  
    searchResults: { list: [], originalData: [], loading: false, error: null },//k
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
      state.searchItem = action.payload;
      state.list = state.searchItem
    },
    setSearchResults: (state, action) => {
      const newPageSize = action.payload.pageSize;
      state.pagination.pageSize = newPageSize;
      state.pagination.pageIndex = action.payload.pageIndex; 
      state.pagination.currentPage = state.pagination.pageIndex
      const totalItems = state.isItemSearch ? state.searchItem.length : state.list.length;
      const totalPages = Math.ceil(totalItems / state.pagination.pageSize);
      state.pagination.totalPages = totalPages;
    
      const startIndex = (state.pagination.pageIndex - 1) * state.pagination.pageSize;
      const endIndex = startIndex + state.pagination.pageSize;
    

      state.list = state.originalData.slice(startIndex, endIndex);
    },
    resetSearchResults: (state) => {
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
    //chuyển đổi nội dung table ứng với số trang index
    setComponent: (state, action) => {
      const { currentPage } = action.payload;
      state.activeComponent = currentPage;
      state.pagination.currentPage = currentPage;
      const startIndex = (currentPage - 1) * state.pagination.pageSize;
      const endIndex = startIndex + state.pagination.pageSize;
      state.list = state.isItemSearch? state.searchItem.slice(startIndex, endIndex) : state.originalData.slice(startIndex, endIndex);
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
  
  },
});

export const {setSearchResults, setItemSearch, setSearchItem,  openLogoutModal, closeLogoutModal, openUpdateModal, closeUpdateModal, openModalDelete, closeModalDelete, setDeleteId, setActiveTable, resetSearchResults, deleteItem, setPage, openModal, closeModal, setComponent } = adminSlice.actions;
export default adminSlice.reducer;
