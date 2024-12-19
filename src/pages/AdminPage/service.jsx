import React, {useState, useEffect} from 'react'
import {fiverrService} from '../../services/fetchAPI';
export default function Service() {
    const [table, setTable] = useState([]);
    useEffect(() => {
        fiverrService
        .LayLoaiDichVu().then((result) => {
            const data = result?.data.content || [];
            setTable(data)
            console.log(data)
        })
        .catch(err => {
            setTable({table: []})
        })
    }, [])
    const renderTable = () => {
        if (!table){
            return (
                <p>{table? "No data found" : "Loading..."}</p>
            )
        }
        return (
        table.map((user, index) => 
             <tr className="hover:bg-gray-100" key = {index}>
                <td className="py-3 px-6">{user.id}</td>
                <td className="py-3 px-6">{user.maCongViec}</td>
                <td className="py-3 px-6">{user.maNguoiThue}</td>
                <td className="py-3 px-6">{user.ngayThue}</td>
                <td className="py-3 px-6">{user.hoanThanh? 'Đã hoàn thành' : 'Chưa hoàn thành'}</td>
            </tr>
        )
        )
    }
  return (
    <div className="overflow-x-auto">
        
<table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-200">
        <tr>
          <th className="py-3 px-6 text-left text-gray-600 font-bold">
            Mã dịch vụ
          </th>
          <th className="py-3 px-6 text-left text-gray-600 font-bold">
            Mã công việc
          </th> <th className="py-3 px-6 text-left text-gray-600 font-bold">
            Mã người thuế
          </th>
          <th className="py-3 px-6 text-left text-gray-600 font-bold">
            Ngày thuê
          </th>
          <th className="py-3 px-6 text-left text-gray-600 font-bold">
            Hoàn thành
          </th>
        </tr>
      </thead>
      <tbody>
      {renderTable()}
       
      </tbody>
    </table>
    
  </div>
  )
}
