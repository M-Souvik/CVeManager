import React, { useState, useEffect } from 'react'
import DltBtn from './DltBtn'
import EditModal from './EditModal'
import PropTypes from 'prop-types';
import { FaNfcSymbol } from 'react-icons/fa6';

const TableList = ({ filteredRecords }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (filteredRecords.length > 0) {
      setLoading(false);
    }
  }, [filteredRecords]);

  return (
    <div className='flex flex-col justify-center'>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg">
          <thead className=" rounded-t-lg">
            <tr>
              <th className="px-4 py-2 md:px-16 md:py-3 text-left text-sm md:text-lg font-medium text-white uppercase tracking-wider ">Cve-Id</th>
              <th className="px-4 py-2 md:px-16 md:py-3 text-left text-sm md:text-lg font-medium text-white uppercase tracking-wider ">Severity</th>
              <th className="px-4 py-2 md:px-16 md:py-3 text-left text-sm md:text-lg font-medium text-white uppercase tracking-wider ">cvss</th>
              <th className="px-4 py-2 md:px-16 md:py-3 text-left text-sm md:text-lg font-medium text-white uppercase tracking-wider ">affected package</th>
              <th className="px-4 py-2 md:px-16 md:py-3 text-left text-sm md:text-lg font-medium text-white uppercase tracking-wider ">cwe-id</th>
              <th className="px-4 py-2 md:px-16 md:py-3 text-left text-sm md:text-lg font-medium text-white uppercase tracking-wider ">actions</th>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td colSpan="6" className="text-center py-4">
                  <div className="flex justify-center items-center text-2xl">
                    <FaNfcSymbol className="animate-spin " size={30} color="grey"/><br/>Fetching data...
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg divide-y divide-blue-500 rounded-b-lg">
              {filteredRecords.map((record) => (
                <tr key={record._id}>
                  <td className="px-4 py-2 md:px-16 md:py-3 whitespace-nowrap text-left text-sm md:text-lg uppercase">{record.cveId}</td>
                  <td className="px-4 py-2 md:px-16 md:py-3 whitespace-nowrap text-left text-sm md:text-lg uppercase">{record.severity}</td>
                  <td className="px-4 py-2 md:px-16 md:py-3 whitespace-nowrap text-left text-sm md:text-lg uppercase">{record.cvss}</td>
                  <td className="px-4 py-2 md:px-16 md:py-3 whitespace-nowrap text-left text-sm md:text-lg uppercase">{record.affectedPackages}</td>
                  <td className="px-4 py-2 md:px-16 md:py-3 whitespace-nowrap text-left text-sm md:text-lg uppercase">{record.cweId}</td>
                  <td className="px-4 py-2 md:px-16 md:py-3 whitespace-nowrap text-left text-sm md:text-lg uppercase flex gap-3">
                    <EditModal record={record} />
                    <DltBtn record={record} />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  )
}

TableList.propTypes = {
  filteredRecords: PropTypes.array.isRequired,
};

export default TableList

