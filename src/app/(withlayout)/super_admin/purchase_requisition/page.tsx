"use client";
import React, { useState } from 'react';
import data from '@/data/data.json';
import { GrView } from "react-icons/gr";
import { LuFileEdit } from "react-icons/lu";
import Link from 'next/link';

const items = [
  { name: 'Dry Items', count: 23 },
  { name: 'Fresh Items', count: 14 },
  { name: 'Freeze Items', count: 13 },
  { name: 'Condiments', count: 8 },
  { name: 'Packing Materials', count: 10 },
  { name: 'Bakery Items', count: 5 },
];

const FormComponent = () => {
  const { branch, Employee, Store, categories } = data;
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the number of pages
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  // Get the data for the current page
  const currentData = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, page: React.SetStateAction<number>) => {
    event.preventDefault();
    setCurrentPage(page);
  };

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === items.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className='pb-10'>
      {/* <div className="max-w-full mx-auto mt-10 p-2 bg-white border-2">
                <div className="flex flex-wrap mb-4">
                    <h1 className="text-xl ml-4 font-bold text-blue-600">CHIKLEE</h1>
                    <div className="flex-1 flex ">
                        <div className="flex-1 text-center">
                            <label className="text-sm font-medium">
                                Store <span className="text-red-500">:</span>
                            </label>
                            <select className="w-100% p-2 ml-3 border rounded-md bg-white" id="Store" name="Store">
                                {Store.map((store, index) => (
                                    <option key={index} value={store}>
                                        {store}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1 text-left">
                            <label className="text-sm font-medium">
                                Employee Name <span className="text-red-500">:</span>
                            </label>
                            <select className="w-100% p-2 border ml-3 rounded-md bg-white" id="employeeName" name="employeeName">
                                {Employee.map((employee, index) => (
                                    <option key={index} value={employee}>
                                        {employee}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div> */}

      <form className="bg-gray-100 p-4 pl-10 pr-10">
        <div className='pb-4'>
          <span className="text-xl font-bold">Purchase Requisition-Index</span>
        </div>
        <div className='bg-white p-4'>
          <div className="relative w-full ">
            <div className="flex items-center justify-between">
              <button type="button" onClick={prevSlide} className="p-2 text-xl">
                &#10094;
              </button>
              <div className="w-full overflow-hidden">
                <div
                  className="flex transition-transform duration-300"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center  bg-[#2d77ff] text-white p-4 mx-4 my-2 rounded-md"
                    >
                      <span className="text-lg ">{item.name}</span>
                      <span className="text-2xl  bg-white text-center rounded-md h-8 w-10 text-[#332fff]">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button type="button" onClick={nextSlide} className="p-2 text-2xl">
                &#10095;
              </button>
            </div>
            <div className="flex justify-center mt-4">
              {items.map((_, index) => (
                <div
                  key={index}
                  className={`w-10 h-2 rounded-xs mx-1 ${index === currentIndex ? 'bg-[#2d77ff]' : 'bg-[#e9e9e9]'}`}
                  onClick={() => setCurrentIndex(index)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className='Information pt-4'>
          <div className="bg-white p-2 mt-2">
            <div className="flex justify-between items-center mb-4">
              <Link href={'/super_admin/purchase_requisition/create'}className="bg-[#2d77ff] ml-4 mt-4 text-white font-bold px-4 py-2 rounded-md">+ Add New</Link>
              <input
                type="text"
                placeholder="Search by purchase Req. No..."
                className="w-1/4 p-2 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="bg-white shadow-md rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200 font-semibold">
                  <tr>
                    <th className="px-6 py-3 text-left">SL</th>
                    <th className="px-6 py-3 text-left">Purchase Requisition No.</th>
                    <th className="px-6 py-3 text-left">Purchase Requisition Date</th>
                    <th className="px-6 py-3 text-left">Submitted By</th>
                    <th className="px-6 py-3 text-left">Master Group</th>
                    <th className="px-6 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentData.map((category, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td className="px-6 py-4">{category}</td>
                      <td className="px-6 py-4">Example Tool Type</td>
                      <td className="px-6 py-4">Active</td>
                      <td className="px-6 py-4">Active</td>
                      <td className="px-6 py-4">
                        <button type="button" className="bg-[#2d77ff] text-white px-4 py-2 rounded-xl mr-2"><GrView /></button>
                        <button type="button" className="bg-[#197c00] text-white px-4 py-2 rounded-xl"><LuFileEdit /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex justify-between mt-4 mb-4 space-x-2">
                <div className="flex items-center space-x-2 ">
                  <label className="text-sm ml-3 font-medium">Per page:</label>
                  <select
                    className="p-2  border rounded-md bg-white"
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  >
                    {Array.from({ length: 5 }, (_, index) => (
                      <option key={index + 1} value={index + 1}>{index + 1}</option>
                    ))}
                  </select>
                </div>
                <div className="flex bg-white rounded-full mb-2  ">
                  <button
                    className="px-2 py-1 bg-white  rounded-full"
                    onClick={(e) => handlePageChange(e, Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      className={`px-3 py-1 bg-white  rounded-full ${currentPage === index + 1 ? 'bg-[#0b8000] text-black' : ''}`}
                      onClick={(e) => handlePageChange(e, index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    className="px-3 py-1 bg-white rounded-full "
                    onClick={(e) => handlePageChange(e, Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <p>a. List of all unclosed purchase Requisition</p>
              <p>b. List of all unclosed purchase Requisition</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
