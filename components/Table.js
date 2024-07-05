'use client'
import React from 'react'
import { useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button'
import { FaSortAlphaDown } from "react-icons/fa";
import Modal from './AddModal'
import { Input } from "@/components/ui/input";
import TableList from './TableList'
import { TbAdjustmentsSearch } from "react-icons/tb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Table = () => {
  const [records, setRecords] = useState([]);
  const [allRecords, setAllRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/records`);
        const data = await response.json();
        setRecords(data);
        setAllRecords(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const sortedRecords = useMemo(() => {
    return [...records].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.cveId.localeCompare(b.cveId);
      } else {
        return b.cveId.localeCompare(a.cveId);
      }
    });
  }, [sortOrder, records]);

  const filteredRecords = searchTerm
    ? sortedRecords.filter((record) => (
      record.cveId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.severity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(record.cvss).includes(searchTerm.toLowerCase()) ||
      record.affectedPackages.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.cweId.toLowerCase().includes(searchTerm.toLowerCase())
    ))
    : sortedRecords;

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between mb-3">
        <div className="flex justify-center items-center border-2 border-black rounded-xl px-2 mb-2 md:mb-0">
          <Input
            id="cveId"
            className="border-none w-60 md:w-96"
            placeholder="Filter by..."
            value={searchTerm.toUpperCase()}
            onChange={handleSearchChange}
          />
          <TbAdjustmentsSearch size={20} />
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-3">
          <span className="text-white hover:bg-blue-500 text-xl flex justify-center items-center border rounded-xl bg-blue-700 px-3">
            <Modal />
          </span>
          <Select onValueChange={handleSort}>
            <SelectTrigger className="w-[90px] bg-gradient-to-r from-violet-700 to-purple-900 text-white rounded-xl">
              <FaSortAlphaDown size={20} />
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Asc</SelectItem>
              <SelectItem value="desc">Desc</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <TableList filteredRecords={filteredRecords} />
    </>
  )
}

export default Table
