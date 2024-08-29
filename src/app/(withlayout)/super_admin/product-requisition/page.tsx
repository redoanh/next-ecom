'use client';

// import IconButton from '@/components/Buttons/SmallButtons/IconButton';
import ActionBar from '@/components/ui/ActionBar';
import UMBreadCrumb from '@/components/ui/DRZBreadCrumb';
import UMTable from '@/components/ui/DRZTable';
import DarazCommonAddButton from '@/components/ui/DarazCommonAddButton';
import { useDebounced } from '@/redux/hook';
import { EyeOutlined, SearchOutlined, FormOutlined } from '@ant-design/icons';
import type { PaginationProps } from 'antd';
import {useDuePenaltySerchargeQuery} from "@/redux/api/commercialApi/duePenaltySerchargeApi";
import { Input,Select } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DRZSelectField from '@/components/Forms/DRZSelectField';


const additionalData = [
  { id: 1, indentNo: '000001', indentDate: '27-10-2023', masterGroup: 'Dry Items', toStore: 'Sub Store', action: 'Edit/View' },
  { id: 2, indentNo: '000201', indentDate: '27-10-2023', masterGroup: 'Fresh Items', toStore: 'Sub Store', action: 'Edit/View' },
];

const OpeningBalanceIndex = () => {
  // query
  const query: Record<string, any> = {};

  const router = useRouter();
  const searchParams = useSearchParams();
  // states
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const productTypes: any = additionalData?.indentNo;
  
  const productTypesOptions =
  productTypes &&
  productTypes.map((productTypes: any) => {
    return {
      label: productTypes?.name,
      value: productTypes?.id,
    };
  });
  // const [selectedItemId, setSelectedItemId] = useState(true);
  // const handleSelectedProduct = (value: any, index: any) => {
  //   const updatedRows = [...rows];
  //   setRows(updatedRows);
  //   setSelectProductId(value);
  // };
  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  // create debounce hook
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  // set debounce on searchTem if debounce exist
  if (!!debouncedTerm) {
    query['searchTerm'] = debouncedTerm;
  }

  // get all import data
  const { data: openigBalaneData, isLoading } = useDuePenaltySerchargeQuery({
    ...query,
    sortField: sortBy,
    sortDirection: sortOrder,
    filter: debouncedTerm,
    page: page,
    size: size,
    // storeId: storeId,
  });


  // define columns of table
  const columns = [
    {
      title: 'SL',
      dataIndex: 'id',
      sorter: true,
      align: 'center',
    },
    {
      title: 'Indent No',
      dataIndex: 'indentNo',
      align: 'center',
    },
    {
      title: 'Indent Date',
      dataIndex: 'indentDate',
      align: 'center',
    },
    {
      // title: 'Receive Date',
      dataIndex: 'receiveDate',
      render: function (record: any) {
        return record && dayjs(record).format('DD-MM-YYYY');
      },
    },
    {
      // title: 'Op Bal Qty',
      dataIndex: 'openingBalanceQty',
    },
    {
      title: 'Master Group',
      dataIndex: 'masterGroup',
      // render: function (record: any) {
      //   return record && showAmount(record);
      // },
      align: 'center',
    },
    {
      title: 'To Store',
      dataIndex: 'toStore',
      // render: function (record: any) {
      //   return record && showAmount(record);
      // },
      align: 'right',
    },

    {
      title: 'Action',
      dataIndex: 'receiveChildId',
      align: 'center',
      render: function (record: any) {
        return (
          <>
            <Link
              href={`/super_admin/inventory/opening-balance/view`}
            >
              {/* <IconButton icon={<FormOutlined />} /> <IconButton icon={<EyeOutlined />} /> */}
            </Link>
          </>
        );
      },
    },
  ];

  //pagination
//   const onPaginationChange = (page: number, pageSize: number) => {
//     const resData = HelperService.getPageDataChange(page, pageSize);
//     setPage(resData.pageNo);
//     setSize(resData.pageNoSize);
//   };
const onPaginationChange = (page: number, pageSize: number) => {
    // console.log(page, pageSize);
    setPage(page);
    setSize(pageSize);
  };

  // sortBy and sortOrder
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === 'ascend' ? 'asc' : 'desc');
  };

  return (
    <>
      <div
        style={{
          padding: '10px',
        }}
      >
        <UMBreadCrumb pageName='Opening Balance' />

        <div
          style={{
            padding: '10px',
          }}
        >
          <ActionBar>
            <DarazCommonAddButton
              to={`/super_admin/product-requisition/create`}
            >
              + Add New
            </DarazCommonAddButton>
            {/* <DarazCommonAddButton
              to={`/super_admin/inventory/opening-balance/upload`}>
              + Upload Excel
            </DarazCommonAddButton> */}
            <div className='md:w-1/6 mt-2 md:mt-0 w-full'>
            <Select
              size='large'
              style={{
                width: '100%',
              }}
              placeholder='Search by Indent no..'
              options={productTypesOptions}
              filterOption={filterOption}
            />


              {/* <Input
                size='large'
                className='shadow-sm'
                placeholder='Search by Receive no..'
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                }}
                suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
                allowClear={true}
              />  */}

                {/* <DRZSelectField
                    style={{
                      width: '100%',
                    }}
                    name='prodTypeId'
                    options={productTypesOptions}
                    onChange={(value: any, index: any) =>
                      handleSelectedProduct(value, index)
                    }
                    label='Requestion To: '
                    placeholder='Select Product Type'
                    required
                    disable={!selectedItemId}
                    onSearch={onSearch}
                    filterOption={filterOption}
                  /> */}
                  <IconButton />
            </div>
          </ActionBar>

          <UMTable
            loading={isLoading}
            columns={columns}
            dataSource={additionalData}
            onTableChange={onTableChange}
            totalPages={12}
            pageSize={openigBalaneData?.result?.size}
            pageNo={openigBalaneData?.result?.page + 1}
            showSizeChanger={true}
            onPaginationChange={onPaginationChange}
            showPagination={true}
          />          
        </div>
      </div>
    </>
  );
};

export default OpeningBalanceIndex;
