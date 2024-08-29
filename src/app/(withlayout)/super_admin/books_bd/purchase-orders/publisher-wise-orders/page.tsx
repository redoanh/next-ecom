"use client";
import Form from "@/components/Forms/Form";
import { IoIosMenu } from "react-icons/io";
import BooksBdButton from "@/components/ui/BooksBdButton";
import { Button, Checkbox, Col, Row, Select } from "antd";
import Loading from "@/app/loading";
import dayjs from "dayjs";
import { useGetSingleDuePenaltySerchargeQuery } from "@/redux/api/commercialApi/duePenaltySerchargeApi";
import FormInput from "@/components/Forms/FormInput";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import FormCheckbox from "@/components/Forms/DarazCheckBox";
import { EyeOutlined } from "@ant-design/icons";
import UMTable from "@/components/ui/DRZTable";
import { useState } from "react";
import CustomTable from "@/components/ui/BooksBdTable";

const CreatePurchaseOrder = ({ params }: any) => {
  const [list, dataList] = useState([]);
  const id = params.slug as string;
  const { data, isLoading } = useGetSingleDuePenaltySerchargeQuery(id);
  const PublisherOption = {};
  const options = [{ label: "", value: "" }];
  const onSubmit = () => {};

  if (isLoading) {
    return <Loading />;
  }
  const PoTypeOptions = {};
  const columns = [
    {
      title: "SL",
      dataIndex: "id",
      align: "center",
      width:"70px"
    },
    {
      title: "Publisher",
      dataIndex: "transactionDate",
      align: "center",
      render: function (record: any) {
        return record && dayjs(record).format("DD-MM-YYYY");
      },
    },
    {
      title: "Purcase Qty",
      dataIndex: "transactionDate",
      align: "center",
      render: function (record: any) {
        return record && dayjs(record).format("DD-MM-YYYY");
      },
    },
    {
      title: "Action",
      dataIndex: "transactionDate",
      align: "center",
      render: function (record: any) {
        return record && dayjs(record).format("DD-MM-YYYY");
      },
    },
    {
      title: (<Checkbox/>),
      dataIndex: (<Checkbox/>),
      align: "center",
      render: function (record: any) {
        return record && dayjs(record).format("DD-MM-YYYY");
      },
    },
   
  ];

  const HeaderContent = ()=>{
    return (
        <div
        className="pb-4 flex items-center justify-between"
        style={{ width: "100%" }}
      >
        <div>
          <h3>Publisher Wise Order</h3>
        </div>
        <div className="flex justify-end" style={{ width: "50%" }}>
          <Select
            style={{ width: "70%" }}
            size="large"
            options={PublisherOption}
            placeholder="--Select Publisher--"
          />
        </div>
      </div>
    )
  }
  return (
    <div style={{ padding: "10px" }}>
      <div
        className="flex items-center justify-between"
        style={{ padding: "10px" }}
      >
        <div>
          <h3>Customer Orders</h3>
        </div>
        <div>
          <BooksBdButton
            to={`/super_admin/books_bd/purchase-orders`}
            icon={<IoIosMenu />}
          >
            SPO List
          </BooksBdButton>
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
        <div>
          <CustomTable
            loading={isLoading}
            columns={columns}
            dataSource={list}
            extraContent={<HeaderContent/>}
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePurchaseOrder;
