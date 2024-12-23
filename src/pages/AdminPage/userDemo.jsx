import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, setActiveTable } from "../../redux/adminSlice";
import DeleteModal from "./Modal/deleteModal";
import Pagination from "./method/pagination";
import UserTable from "../../components/Admin/table";

export default function User() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.adminSlice);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch user data on mount
  useEffect(() => {
    dispatch(fetchData("users")); // Fetch data khi component được mount
    dispatch(setActiveTable("users"))
  }, [dispatch]);

  // Delete handler logic
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const confirmDeleteHandler = () => {
    if (deleteId) {
      dispatch({ type: "DELETE_USER", payload: deleteId });
      setIsModalOpen(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="overflow-x-auto">
      {/* Delete Modal */}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDeleteHandler}
      />

      {/* Render UserTable */}
      <UserTable />

      {/* Pagination */}
      <Pagination />
    </div>
  );
}
