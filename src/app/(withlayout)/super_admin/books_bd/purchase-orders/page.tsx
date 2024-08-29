"use client";
import orderList from "../order-list/orderList.json";
import { AiOutlineFilePdf } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import { useGetSingleDuePenaltySerchargeQuery } from "@/redux/api/commercialApi/duePenaltySerchargeApi";
import Loading from "@/app/loading";
import dayjs from "dayjs";
import { Button, Col, Divider, Row, Select } from "antd";
import UMTable from "@/components/ui/DRZTable";
import { EyeOutlined } from "@ant-design/icons";
import Link from "next/navigation";
import BooksBdButton from "@/components/ui/BooksBdButton";
import OrderListModal from "@/components/Modal/OrderListModal";

const ViewOrderDetails = ({ params }: any) => {
  //state
  const [orderModal, setOrderModalOpen] = useState(false);
  const [defaultValue, setDefaultValue] = useState({});
  const id = params.slug as string;
  const { data, isLoading } = useGetSingleDuePenaltySerchargeQuery(id);
  const dueData = data?.result;
  const [searchTerm, setSearchTerm] = useState("");
  const [list, setOrderList] = useState(orderList);
  useEffect(() => {
    setDefaultValue({
      id: parseInt(dueData?.id),
      transactionDate: dayjs(dueData?.transactionDate).format("MMM D, YYYY"),
      vatMonthName: dueData?.vatMonthName,
      intOnUnpaidVat: dueData?.intOnUnpaidVat,
      intOnUnpaidSd: dueData?.intOnUnpaidSd,
      penaltyAmount: dueData?.penaltyAmount,
      payableExciseDuty: dueData?.payableExciseDuty,
      payableDevSurcharge: dueData?.payableDevSurcharge,
      payableIctDevSurcharge: dueData?.payableIctDevSurcharge,
      payableHealthCareSurcharge: dueData?.payableHealthCareSurcharge,
      payableEnvProtSurcharge: dueData?.payableEnvProtSurcharge,
      remarks: dueData?.remarks,
    });
  }, [dueData]);

  const CourierOptions = {};

  //modal function
  const showModal = () => {
    setOrderModalOpen(true);
  };
  const handleOk = () => {
    setOrderModalOpen(false);
  };
  const handleCancel = () => {
    setOrderModalOpen(false);
  };
  // console.log(defaultValue, "Default value");

  if (isLoading) {
    return <Loading />;
  }
  const PoTypeOptions = {};

  const columns = [
    {
      title: "SL",
      dataIndex: "id",
      sorter: true,
      align: "center",
    },
    {
      title: "SPO Number",
      dataIndex: "transactionDate",
      align: "center",
      render: function (record: any) {
        return record && dayjs(record).format("DD-MM-YYYY");
      },
    },
    {
      title: "Publisher",
      dataIndex: "vatMonth",
      align: "center",
    },

    {
      title: "Date",
      dataIndex: "date",
      align: "center",
      render: function (record: any) {
        return record && dayjs(record).format("MM-DD-YYYY");
      },
    },
    {
      title: "Order Type",
      dataIndex: "totalPayableAmt",
      align: "center",
    },
    {
      title: "Delivery Point",
      dataIndex: "totalPayableAmt",
      align: "center",
    },
    {
      title: "Order Qty",
      dataIndex: "treasuryChallanNo",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "id",
      align: "center",
      render: (record: any) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            style={{
              fontSize: "13px",
              padding: "0px 7px 5px 7px",
              borderRadius: "2px",
              height: "28px",
            }}
            className="bg-[#d9f7be] text-[#135200] hover:bg-[#73d13d] hover:text-[#FFF] pt-1"
            onClick={showModal}
            type="primary"
          >
            <EyeOutlined />
          </Button>
          <Button
            style={{
              fontSize: "13px",
              padding: "0px 7px 5px 7px",
              borderRadius: "2px",
              height: "28px",
            }}
            className="bg-[#ffccc7] hover:bg-[#ff4d4f] text-[#cf1322] hover:text-[#FFFFFF] ml-2 pt-1"
            
            type="primary"
          >
            <AiOutlineFilePdf />
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div style={{ padding: "10px" }}>
      {/* <UMBreadCrumb
        pageName="Order Details"
        link={`#`}
      /> */}
      <div className="m-5 flex justify-between">
        <div className="font-bold text-xl">All Purchase Order List</div>
        <div className="flex gap-2 items-center">
          <BooksBdButton
            className="bg-[#108EE9] flex items-center text-white"
            size="middle"
            to={`/super_admin/books_bd/purchase-orders/create`}
          >
            + Add By HO
          </BooksBdButton>
          <BooksBdButton
            className="bg-[#108EE9] flex text-white items-center"
            size="middle"
            to={`/super_admin/books_bd/purchase-orders/publisher-wise-orders`}
          >
            + From Ping Order
          </BooksBdButton>
          <BooksBdButton
            className="bg-[#108EE9] text-white"
            size="middle"
            to={`#`}
          >
            + From Package Order
          </BooksBdButton>
          <BooksBdButton
            className="bg-[#108EE9] text-white"
            size="middle"
            to={`#`}
          >
            + From Regular Order
          </BooksBdButton>
        </div>
      </div>
      <div
        style={{
          padding: "15px",
          marginTop: "11px",
          //   backgroundColor: "#fff6f6e6",
          borderRadius: "10px",
          border: "1px solid #e9e8e8",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <div className="p-2 flex border-box gap-3 justify-end">
          <div className="flex items-center w-2/5 justify-start">
            <h3>All Purchase Orders List</h3>
          </div>
          <div className="flex w-1/4 justify-end">
            <Select
              className="shadow-sm"
              style={{
                width: "90%",
                marginRight: "10px",
              }}
              size="large"
              showSearch
              placeholder="--Select PO Type--"
              //   onChange={(value) =>
              //     handleSelectChangeCertificate(value, index)
              //   }
              options={PoTypeOptions}
              //   onSearch={onSearch}
              //   filterOption={filterOption}
            />
          </div>
          <div className="flex w-1/4 justify-end">
            <Select
              size="large"
              className=" shadow-sm"
              showSearch
              placeholder="--Sort By Publisher--"
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "90%",
              }}
            />
          </div>
          <div className="flex w-1/7 justify-start">
            <div>
              <Button
                size="large"
                className="mx-2 rounded-md shadow-sm"
                style={{ backgroundColor: "#ffd666" }}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-2">
        <OrderListModal
          isModalOpen={orderModal}
          handleOk={handleOk}
          handleCancel={handleCancel}
          tableTitle={"Purchase Order Details"}
        />
        <UMTable loading={isLoading} columns={columns} dataSource={list} />
      </div>
    </div>
  );
};

export default ViewOrderDetails;
