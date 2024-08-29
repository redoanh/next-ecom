'use client';
import { ChangeEvent, SetStateAction, useState } from 'react';

const PurchaseRequest = () => {
  const [requisitionNumber, setRequisitionNumber] = useState('');
  const [requisitionDate, setRequisitionDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [productCategory, setProductCategory] = useState('');
  const [productType, setProductType] = useState('');
  const [items, setItems] = useState([
    {
      itemName: 'Salt',
      itemCode: 'Salt',
      unit: 'KG',
      productRecQty: 12.00,
      balanceQty: 0.00,
      reqQty: 12,
      reqNo: 2,
      requiredDate: '30-11-2023',
      rate: 40.00,
      total: 480.00,
      comments: '',
    },
    {
      itemName: 'Cardamom',
      itemCode: 'Cardamom',
      unit: 'KG',
      productRecQty: 12.00,
      balanceQty: 0.00,
      reqQty: 12,
      reqNo: 2,
      requiredDate: '30-11-2023',
      rate: 1000.00,
      total: 12000.00,
      comments: '',
    },
    {
        itemName: 'mehedi',
        itemCode: 'Cardamom',
        unit: 'KG',
        productRecQty: 12.00,
        balanceQty: 0.00,
        reqQty: 12,
        reqNo: 2,
        requiredDate: '30-11-2023',
        rate: 1000.00,
        total: 12000.00,
        comments: '',
      },
  ]);
  const [masterGroup, setMasterGroup] = useState('');
  const [prodReqNumbers, setProdReqNumbers] = useState([]);
  const [searchProdReq, setSearchProdReq] = useState('');
  const [remarks, setRemarks] = useState('');
  const [submittedBy, setSubmittedBy] = useState('');
  const [recommendedBy, setRecommendedBy] = useState('');
  const [approvedBy, setApprovedBy] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State for popup

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, index: number, field: string) => {
    const updatedItems = [...items];
    updatedItems[index][field] = event.target.value;
    setItems(updatedItems);
  };

  const handleAddRow = () => {
    setItems([
      ...items,
      {
        itemName: '',
        itemCode: '',
        unit: '',
        productRecQty: 0,
        balanceQty: 0,
        reqQty: 0,
        reqNo: 0,
        requiredDate: '',
        rate: 0,
        total: 0,
        comments: '',
      },
    ]);
  };

  const handleSearchProdReq = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearchProdReq(event.target.value);
  };

  const handleAddProdReq = () => {
    if (searchProdReq.trim() !== '') {
      setProdReqNumbers([...prodReqNumbers, searchProdReq]);
      setSearchProdReq('');
    }
  };

  const handleRemoveProdReq = (index: number) => {
    setProdReqNumbers(
      prodReqNumbers.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Form submitted!');
  };

  const handleReqNoClick = (item: { itemName: string; itemCode: string; unit: string; productRecQty: number; balanceQty: number; reqQty: number; reqNo: number; requiredDate: string; rate: number; total: number; comments: string; }) => {
    setShowPopup(true); // Show popup when Req No is clicked
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide popup
  };

  return (
    <div className="container mx-auto p-4 px-16 ">
      <h1 className="text-2xl font-bold mb-4">4D-02a Purchase Req-Create</h1>

      <div className="grid grid-cols-3 gap-4 bg-white p-3 border ">
        <div className="col-span-1">
          <div className="mb-4">
            <label
              htmlFor="requisitionNumber"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Requistion Number: *
            </label>
            <input
              type="text"
              id="requisitionNumber"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={requisitionNumber}
              onChange={(event) => setRequisitionNumber(event.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="masterGroup"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Master Group:
            </label>
            <select
              id="masterGroup"
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-white"
              value={masterGroup}
              onChange={(event) => setMasterGroup(event.target.value)}
            >
              <option value="">Select</option>
              <option value="Condiments (4)">Condiments (4)</option>
              {/* Add other options here */}
            </select>
          </div>
        </div>

        <div className="col-span-1">
          <div className="mb-4">
            <label
              htmlFor="requisitionDate"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Requisition Date: *
            </label>
            <input
              type="date"
              id="requisitionDate"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={requisitionDate}
              onChange={(event) => setRequisitionDate(event.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="prodReqNumbers"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Prod Req Number(s): *
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="searchProdReq"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                placeholder="Search Prod Req"
                value={searchProdReq}
                onChange={handleSearchProdReq}
              />
              <button
                className="bg-[#c705ee] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleAddProdReq}
              >
                Add
              </button>
            </div>
            <ul className="mt-2">
              {prodReqNumbers.map((number, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">{number}</span>
                  <input type="checkbox" id={`prodReq${index}`} className="mr-2" />
                  <label htmlFor={`prodReq${index}`} className="mr-2">Select</label>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleRemoveProdReq(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        

        <div className="col-span-1">
          <div className="mb-4">
            <label
              htmlFor="productCategory"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Product Category:
            </label>
            <select
              id="productCategory"
              className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white"
              value={productCategory}
              onChange={(event) => setProductCategory(event.target.value)}
            >
              <option value="">Select</option>
              <option value="Product">Product</option>
              {/* Add other options here */}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="productType"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Product Type:
            </label>
            <select
              id="productType"
              className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white"
              value={productType}
              onChange={(event) => setProductType(event.target.value)}
            >
              <option value="">Select</option>
              <option value="Raw Materials">Raw Materials</option>
              {/* Add other options here */}
            </select>
          </div>
        </div>
        <div className="mb-4">
        <label
          htmlFor="remarks"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Remarks
        </label>
        <textarea
          id="remarks"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={remarks}
          onChange={(event) => setRemarks(event.target.value)}
        />
      </div>
      </div>

      

      <h2
        className="text-xl text-center font-bold text-[#3b3b3b] mb-4"
      >
        Item Details
      </h2>

      <div className="overflow-x-auto bg-white">
        <table className="w-full ">
          <thead className='bg-[#dad8d8]'>
            <tr>
              <th className="px-4 py-2 border border-gray-300">Sr</th>
              <th className="px-4 py-2 border border-gray-300">Item Name</th>
              <th className="px-4 py-2 border border-gray-300">Item Name(BN)</th>
              <th className="px-4 py-2 border border-gray-300">UOV</th>
              <th className="px-4 py-2 border border-gray-300">Prod Rec Qty</th>
              <th className="px-4 py-2 border border-gray-300">Balance Qty</th>
              <th className="px-4 py-2 border border-gray-300">Req Qty</th>
              <th className="px-4 py-2 border border-gray-300">Req No</th>
              <th className="px-4 py-2 border border-gray-300">Required Date</th>
              <th className="px-4 py-2 border border-gray-300">Rate</th>
              <th className="px-4 py-2 border border-gray-300">Total</th>
              <th className="px-4 py-2 border border-gray-300">Comments</th>
              <th className="px-4 py-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2 border-gray-300">{index + 1}</td>
                <td className="border px-4 py-2 border-gray-300">{item.itemName}</td>
                <td className="border px-4 py-2 border-gray-300">{item.itemCode}</td>
                <td className="border px-4 py-2 border-gray-300">{item.unit}</td>
                <td className="border px-4 py-2 border-gray-300">{item.productRecQty}</td>
                <td className="border px-4 py-2 border-gray-300">{item.balanceQty}</td>
                <td className="border px-4 py-2 border-gray-300">{item.reqQty}</td>
                <td className=" onclick border px-4 py-2 bg-[#00b7ff]" onClick={() => handleReqNoClick(item)}>{item.reqNo}</td>
                <td className="border px-4 py-2 border-gray-300">{item.requiredDate}</td>
                <td className="border px-4 py-2 border-gray-300">{item.rate}</td>
                <td className="border px-4 py-2 border-gray-300">{item.total}</td>
                <td className="border px-4 py-2 border-gray-300">
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={item.comments}
                    onChange={(event) =>
                      handleInputChange(event, index, 'comments')
                    }
                  />
                </td>
                <td className="border px-4 py-2 border-gray-300">
                  <button
                    className="bg-[#ff1d1d] hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleAddRow}
      >
        Add Row
      </button> */}

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="col-span-1">
          <div className="mb-4">
            <label
              htmlFor="submittedBy"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Submitted By:
            </label>
            <input
              type="text"
              id="submittedBy"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={submittedBy}
              onChange={(event) => setSubmittedBy(event.target.value)}
            />
          </div>
        </div>
        <div className="col-span-1">
          <div className="mb-4">
            <label
              htmlFor="recommendedBy"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Recommended By:
            </label>
            <input
              type="text"
              id="recommendedBy"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={recommendedBy}
              onChange={(event) => setRecommendedBy(event.target.value)}
            />
          </div>
        </div>
        <div className="col-span-1">
          <div className="mb-4">
            <label
              htmlFor="approvedBy"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Approved By:
            </label>
            <input
              type="text"
              id="approvedBy"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={approvedBy}
              onChange={(event) => setApprovedBy(event.target.value)}
            />
          </div>
        </div>
      </div>

      <button
        className="bg-[#1e0a55] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleSubmit}
      >
        Submit
      </button>

      {/* Popup Component */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-bold mb-2">Req No Details</h2>
            <p>
              {/* Display Req No details here, you can access item.reqNo from the
               item object passed to handleReqNoClick */}
              {/* Example: */}
              Req No: {item.reqNo}
            </p>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseRequest;
