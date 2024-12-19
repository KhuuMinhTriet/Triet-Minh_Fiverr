import React, {useState, useEffect} from 'react'
import {fiverrService} from '../../services/fetchAPI';
export default function JobType() {
    const [table, setTable] = useState([]);
    useEffect(() => {
        fiverrService
        .layLoaiCongViec().then((result) => {
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
                <td className="py-3 px-6">{user.tenLoaiCongViec}</td>
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
            Mã người dùng
          </th>
          <th className="py-3 px-6 text-left text-gray-600 font-bold">
            Tên loại công việc
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
