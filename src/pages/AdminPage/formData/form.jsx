import React from "react";

export default function FormTable({ editingId, editedData, setEditedData, handleSaveClick, setEditingId }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="my-4">
      {editingId && (
        <div>
          <h3 className="text-lg font-bold">Chỉnh sửa dịch vụ</h3>
          <form>
            <div className="mb-4">
              <label htmlFor="maCongViec" className="block text-sm font-medium">
                Mã công việc
              </label>
              <input
                type="text"
                id="maCongViec"
                name="maCongViec"
                value={editedData.maCongViec || ""}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="maNguoiThue" className="block text-sm font-medium">
                Mã người thuế
              </label>
              <input
                type="text"
                id="maNguoiThue"
                name="maNguoiThue"
                value={editedData.maNguoiThue || ""}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ngayThue" className="block text-sm font-medium">
                Ngày thuê
              </label>
              <input
                type="date"
                id="ngayThue"
                name="ngayThue"
                value={editedData.ngayThue || ""}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="hoanThanh" className="block text-sm font-medium">
                Hoàn thành
              </label>
              <select
                id="hoanThanh"
                name="hoanThanh"
                value={editedData.hoanThanh || ""}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              >
                <option value={true}>Đã hoàn thành</option>
                <option value={false}>Chưa hoàn thành</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleSaveClick}
              >
                Lưu
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setEditingId(null)}
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
