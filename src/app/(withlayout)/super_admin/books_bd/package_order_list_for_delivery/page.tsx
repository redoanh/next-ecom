"use client";

import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import UMTable from "@/components/ui/DRZTable";
import { useDebounced } from "@/redux/hook";
import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu,  Select,  } from "antd";
import Link from "next/link";
import { useState } from "react";
import {
  useVdsPaymentQuery,
  useVdsPaymentDropDownQuery,
} from "@/redux/api/commercialApi/vdsPaymentApi";
import orderList from '../order-list/orderList.json'
import dayjs from "dayjs";
import { IoIosMenu } from "react-icons/io";
import { useRouter } from 'next/navigation';
import OrderListModal from "@/components/Modal/OrderListModal";

const OrderList = ({record}:any) => {
  // query
  const query: Record<string, any> = {};
  const router = useRouter();
  // states
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [list, setOrderList] =useState(orderList)
  // assign to query
  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  // create debounce hook
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  // set debounce on searchTerm if debounce exists
  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }
  const { data: datasource } = useVdsPaymentDropDownQuery({});
  // get department data
  const { data: vdsPaymentData, isLoading } = useVdsPaymentQuery({
    ...query,
    sortField: sortBy,
    sortDirection: sortOrder,
    filter: debouncedTerm,
    page: page,
    size: size,
  });
  // dropdown
  const PaymentStatusOptions =
    datasource &&
    datasource?.result?.bankType?.map((bank: any) => {
      return {
        label: bank?.name,
        value: parseInt(bank?.id),
      };
    });
// 3 dot menu
const handleOrderView = (record:any) => {
  router.push(`/super_admin/books_bd/order-list/view/${record}`)
};
  const menu =(record:any)=> (
    <Menu>
      <Menu.Item key="1" onClick={()=> handleOrderView(record)}>
      Order View
      </Menu.Item>
      <Menu.Item key="2" onClick={() => handleConfirm(record)}>
        Confirm
      </Menu.Item>
      <Menu.Item key="3" onClick={() => handleCancel(record)}>
        Cancel
      </Menu.Item>
    </Menu>
  );

  const handleConfirm = (record:any) => {
    console.log(`Option 2 clicked for record:`, record);
    // Add your logic for Option 2 here
  };
  const handleCancel = (record:any) => {
    console.log(`Option 2 clicked for record:`, record);
    // Add your logic for Option 2 here
  };

  const columns = [
    {
      title: "SL",
      dataIndex: "id",
      sorter: true,
      align: "center",
    },
    {
      title: "Order ID",
      dataIndex: "id",
      align: "center",
     
    },
    {
      title: "Order Date",
      dataIndex: "date",
      align: "center",
      render: function (record: any) {
        return record && dayjs(record).format("DD-MM-YYYY");
      },
    },
    {
      title: "Customer Info",
      dataIndex: "name",
      align: "center",
      render:(text:any, record:any)=>(
        <div className="text-left">
            <p>Name: {record.name}</p>
            <p>Phone: {record.phone}</p>
        </div>
      )
    },
    {
      title: "Order Type",
      dataIndex: "quantity",
      align: "center",
    },
    {
      title: "Total Amount",
      dataIndex: "total",
      align: "center",
    },
    {
      title: "Payment System",
      dataIndex: "p_system",
      align: "center",
     
    },
    {
      title: "SPO Done",
      dataIndex: "p_system",
      align: "center",
     
    },
    {
      title: "Receive Status",
      dataIndex: "p_system",
      align: "center",
     
    },
    {
      title: "Payment Status",
      dataIndex: "p_status",
      align: "center",
      render:  (record: any)=> (
        <span className="p-1 rounded-md" style={{color:record==="paid" ? "white" :"#135200",backgroundColor:record==="paid" ? "#047857" :"#fffb8f"}}>{record}</span>
      ),
    },
    {
      title: "Order Status",
      dataIndex: "o_status",
      align: "center",
      render:(text:string, record:any)=>(
        <span className="p-1 rounded-md" style={{color:text == "pending" ? "#135200" : "white", backgroundColor: text == "Confirmed" ? "#047857" : text == "pending" ? "#ffec3d" : text == "cancelled" ? "red" : text == "Processing" ? "#52c41a" :"black"}}>{text}</span>
      )
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
         <Dropdown overlay={menu(record)} placement="bottomLeft" trigger={['click']}>
            <Button
              style={{
                fontSize: "13px",
                padding: "3px 7px 5px 7px",
                borderRadius: "50%",
                height: "28px",
                color:"#135200"
              }}
              className="bg-[#d9f7be]"
              onClick={() => console.log(record)}
              type="primary"
              
            >
              <MoreOutlined 
              
              />
            </Button>
          </Dropdown>
        </div>
      ),
    },
  ];

  // pagination
  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  // sortBy and sortOrder
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "ASC" : "DESC");
  };

  // reset filters
  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  return (
    <>
      <div
        style={{
          padding: "10px",
        }}
      >
        <UMBreadCrumb pageName="BB03E - Package Orders Ready for Delivery" />

        <div
          style={{
            padding: "10px",
            width: "100%",
          }}
        >
          <div className="p-2 flex border-box gap-4 justify-end">
            <div className="flex items-center w-2/4 justify-start">
              <h3>Package Orders List</h3>
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
                placeholder="--Payment Status--"
                //   onChange={(value) =>
                //     handleSelectChangeCertificate(value, index)
                //   }
                options={PaymentStatusOptions}
                //   onSearch={onSearch}
                //   filterOption={filterOption}
              />
            </div>
            <div className="flex w-1/4 justify-end">
              <Select
                size="large"
                className=" shadow-sm"
                showSearch
                placeholder="--Order Status--"
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "90%",
                }}
              />
            </div>
          </div>
          <UMTable
            loading={isLoading}
            columns={columns}
            dataSource={list}
            totalPages={vdsPaymentData?.result?.totalElements}
            onTableChange={onTableChange}
            pageSize={size}
            showSizeChanger={true}
            onPaginationChange={onPaginationChange}
            showPagination={true}
          />
        </div>
      </div>
    </>
  );
};

export default OrderList;
