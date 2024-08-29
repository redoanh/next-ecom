"use client";
import orderList from "../order-list/orderList.json";
import React, { useState, useEffect } from "react";
import { useGetSingleDuePenaltySerchargeQuery } from "@/redux/api/commercialApi/duePenaltySerchargeApi";
import Loading from "@/app/loading";
import dayjs from "dayjs";
import { Button, Checkbox } from "antd";
import UMTable from "@/components/ui/DRZTable";
import { EyeOutlined } from "@ant-design/icons";
import OrderApproveModal from "@/components/Modal/OrderApproveModal";

const ViewOrderDetails = ({ params }: any) => {
  //state
  const [list] = useState(orderList);
  const [orderModal, setOrderModalOpen] = useState(false);
  const [defaultValue, setDefaultValue] = useState({});
  const id = params.slug as string;
  const { data, isLoading } = useGetSingleDuePenaltySerchargeQuery(id);
  const dueData = data?.result;
  const [searchTerm, setSearchTerm] = useState("");
  //button state
  const [isTitleChecked, setIsTitleChecked] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
 

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
  const handleTitleCheckBox = (e: any) => {
    const isChecked = e.target.checked;
    setIsTitleChecked(isChecked);
    const updatedSelectedRows = isChecked
      ? list.map((item, index) => item)
      : [];
    //@ts-ignore
    setSelectedRows(updatedSelectedRows);
    setIsButtonVisible(updatedSelectedRows.length > 0 || isChecked);
  };
  const handleCheckboxChange = (index: any) => (e: any) => {
    const isChecked = e.target.checked;
    const newSelectedRows = [...selectedRows];
    if (isChecked) {
      //@ts-ignore
      newSelectedRows.push(index);
    } else {
      //@ts-ignore
      const rowIndex = newSelectedRows.indexOf(index);
      if (rowIndex !== -1) {
        newSelectedRows.splice(rowIndex, 1);
      }
    }
    setSelectedRows(newSelectedRows);
    setIsTitleChecked(newSelectedRows.length === list.length);
    setIsButtonVisible(newSelectedRows.length > 0);
  };

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
      title: "Details",
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
        </div>
      ),
    },
    {
      title: (
        <Checkbox onChange={handleTitleCheckBox} checked={isTitleChecked} />
      ),
      dataIndex: "checkbox",
      align: "center",
      render: (_: any, recordIndex: any) => (
        <Checkbox
          onChange={handleCheckboxChange(recordIndex)}
          //@ts-ignore
          checked={selectedRows.includes(recordIndex)}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: "10px" }}>
      <div className="m-5 flex justify-between">
        <div className="font-bold text-xl">Purchase Order Approval</div>
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
        <div className="p-2 flex border-box gap-3 justify-between">
          <div className="flex items-center w-2/5 justify-start">
            <h3>Purchase Orders Approval</h3>
          </div>

          <div className="flex w-1/7 justify-start">
            {isButtonVisible && (
              <div>
                <Button
                  size="large"
                  className="mx-2 rounded-md shadow-sm"
                  style={{ backgroundColor: "#0abb75", color: "white" }}
                >
                  Approve
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="pt-2">
        <OrderApproveModal
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
