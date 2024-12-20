import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../../redux/adminSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const { currentPage, totalPages } = useSelector((state) => state.adminSlice.pagination);

  const handlePageChange = (pageNumber) => {
    dispatch(setPage(pageNumber));  
  };

  return (
    <div>
      {/* Hiển thị phân trang */}
      <button 
        disabled={currentPage <= 1} 
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </button>
      <span>{currentPage} / {totalPages}</span>
      <button 
        disabled={currentPage >= totalPages} 
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination
