"use client";
import orderList from "../../orderList.json";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import React, { useState, useEffect } from "react";
import { useGetSingleDuePenaltySerchargeQuery } from "@/redux/api/commercialApi/duePenaltySerchargeApi";
import Loading from "@/app/loading";
import dayjs from "dayjs";
import { Button, Col, Divider, Row, Select } from "antd";
import UMTable from "@/components/ui/DRZTable";

const ViewOrderDetails = ({ params }: any) => {
  const [defaultValue, setDefaultValue] = useState({});
  const id = params.slug as string;
  const { data, isLoading } = useGetSingleDuePenaltySerchargeQuery(id);
  const dueData = data?.result;
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
  // console.log(defaultValue, "Default value");

  if (isLoading) {
    return <Loading />;
  }
  const columns = [
    {
      title: "SL",
      dataIndex: "id",
      sorter: true,
      align: "center",
    },
    {
      title: "Image",
      dataIndex: "transactionDate",
      align: "center",
      render: function (record: any) {
        return record && dayjs(record).format("DD-MM-YYYY");
      },
    },
    {
      title: "Book Name",
      dataIndex: "vatMonth",
      align: "center",
    },
    {
      title: "Order Qty",
      dataIndex: "treasuryChallanNo",
      align: "center",
    },
    {
      title: "Publisher Price",
      dataIndex: "treasuryChallanDate",
      align: "center",
      render: function (record: any) {
        return record && dayjs(record).format("DD-MM-YYYY");
      },
    },
    {
      title: "Discount Price",
      dataIndex: "totalPayableAmt",
      align: "center",
    },
    {
      title: "Sale Price",
      dataIndex: "totalPayableAmt",
      align: "center",
    },
    {
      title: "Sub Total(BDT)",
      dataIndex: "totalPayableAmt",
      align: "center",
    },
  ];

  const footer = () => {
    return (
      <>
      <div>
        <Row
          className="py-1 pr-1 text-right font-bold flex items-center"
          style={{ borderBottom: "1px solid #bfbfbf" }}
        >
          <Col span={20}>
            <p>Total Price</p>
          </Col>
          <Col offset={2} span={2} className="text-center">
            <p>2500 Tk.</p>
          </Col>
        </Row>
        <Row
          className="py-1 pr-1 text-right font-bold"
          style={{ borderBottom: "1px solid #bfbfbf" }}
        >
          <Col span={20}>
            <p>Shipping Cost</p>
          </Col>
          <Col offset={2} span={2} className="text-center">
            <p>50 Tk.</p>
          </Col>
        </Row>
        <Row
          className="py-1 pr-1 text-right font-bold"
          style={{ borderBottom: "1px solid #bfbfbf" }}
        >
          <Col span={20}>
            <p>Discount Offer</p>
          </Col>
          <Col offset={2} span={2} className="text-center">
            <p>200 Tk.</p>
          </Col>
        </Row>
        <Row
          className="mb-3 py-1 pr-1 text-right font-bold"
          style={{ borderBottom: "1px solid #bfbfbf" }}
        >
          <Col span={20}>
            <p>Total Payable</p>
          </Col>
          <Col offset={2} span={2} className="text-center">
            <p>2350 Tk.</p>
          </Col>
        </Row>
        </div>
      </>
    );
  };
  return (
    <div style={{ padding: "10px" }}>
      {/* <UMBreadCrumb
        pageName="Order Details"
        link={`#`}
      /> */}
      <div className="m-5 flex justify-between">
        <div className="font-bold text-xl">Order Details</div>
        <div>
          <Button
            className="bg-[#69b1ff] text-white"
            size="large"
            icon={<MdOutlineLocalPrintshop />}
          >
            Print Invoice
          </Button>
        </div>
      </div>
      <div
        style={{
          padding: "20px",
          marginTop: "11px",
          backgroundColor: "#fff6f6e6",
          borderRadius: "10px",
          border: "1px solid #e9e8e8",
          boxSizing: "border-box",
        }}
      >
        <div className="flex justify-end">
          <Select
            className="shadow-sm flex w-1/5 justify-end"
            style={{
              width: "90%",
            }}
            size="large"
            showSearch
            placeholder="--Select Courier--"
            //   onChange={(value) =>
            //     handleSelectChangeCertificate(value, index)
            //   }
            options={CourierOptions}
            //   onSearch={onSearch}
            //   filterOption={filterOption}
          />
        </div>
        <div
          className="flex justify-between"
          style={{ padding: "0px", marginTop: "12px" }}
        >
          <div>
            <p>Order ID : #54</p>
            <p className="text-xl">Total Books : 4 pcs</p>
            <p>Order Status : Cancelled</p>
            <p>Payment Status : unpaid</p>
            <p>Payment Method : Cash On</p>
          </div>
          <div className="text-right">
            <h2>Customer Information</h2>
            <p className="font-bold">Customer ID : # 595</p>
            <p>
              <span className="font-bold">Name :</span> Sajal Mahmud
            </p>
            <p>
              <span className="font-bold">Phone :</span> 01712445521
            </p>
            <p>
              <span className="font-bold">Email :</span> sajal@gmail.com
            </p>
            <p>
              <span className="font-bold">Shipping Address :</span> road 11,
              house 4
            </p>
          </div>
        </div>
      </div>
      <div className="pt-2">
        <UMTable
          loading={isLoading}
          columns={columns}
          dataSource={list}
          footer={footer}
        />
      </div>
    </div>
  );
};

export default ViewOrderDetails;
