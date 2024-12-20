import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DeleteModal from "./Modal/deleteModal";
import {
  fetchJobTypes,
  deleteItemAsync,
  updateItem,
} from "../../redux/adminSlice";

export default function JobType() {
  const dispatch = useDispatch();
  const { list: jobTypes, loading, error } = useSelector(
    (state) => state.adminSlice.jobTypes
  );


  const [editMode, setEditMode] = useState({ id: null, name: "" });
  const [deleteTarget, setDeleteTarget] = useState(null);

  React.useEffect(() => {
    dispatch(fetchJobTypes());
  }, [dispatch]);

  const confirmDelete = () => {
    dispatch(deleteItemAsync({ modalType: "jobTypes", id: deleteTarget })).then(
      () => {
        setDeleteTarget(null);
        dispatch(fetchJobTypes());
      }
    );
  };

  const handleEdit = (id, name) => {
    setEditMode({ id, name });
  };

  const handleSaveEdit = () => {
    const { id, name } = editMode;
    if (!name) return alert("Tên loại công việc không được để trống");

    dispatch(
      updateItem({
        modalType: "jobTypes",
        id,
        formData: { tenLoaiCongViec: name },
      })
    ).then(() => {
      setEditMode({ id: null, name: "" });
      dispatch(fetchJobTypes());
    });
  };

  const renderTable = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return jobTypes.map((job) => (
      <tr className="hover:bg-gray-100" key={job.id}>
        <td className="py-3 px-6">{job.id}</td>
        <td className="py-3 px-6">
          {editMode.id === job.id ? (
            <input
              className="border px-2 py-1"
              value={editMode.name}
              onChange={(e) =>
                setEditMode({ ...editMode, name: e.target.value })
              }
            />
          ) : (
            job.tenLoaiCongViec
          )}
        </td>
        <td className="py-3 px-6">
          {editMode.id === job.id ? (
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded"
              onClick={handleSaveEdit}
            >
              Save
            </button>
          ) : (
            <button
              className="bg-yellow-500 text-white px-2 py-1 rounded"
              onClick={() => handleEdit(job.id, job.tenLoaiCongViec)}
            >
              Edit
            </button>
          )}
          <button
            className="bg-red-500 text-white px-2 py-1 rounded ml-2"
            onClick={() => setDeleteTarget(job.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="overflow-x-auto">
      <DeleteModal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
      

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-6 text-left text-gray-600 font-bold">
              Mã loại công việc
            </th>
            <th className="py-3 px-6 text-left text-gray-600 font-bold">
              Tên loại công việc
            </th>
            <th className="py-3 px-6 text-left text-gray-600 font-bold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
    </div>
  );
}
