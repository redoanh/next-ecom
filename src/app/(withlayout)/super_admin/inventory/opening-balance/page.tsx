'use client';

import IconButton from '@/components/Buttons/SmallButtons/IconButton';
import ActionBar from '@/components/ui/ActionBar';
import UMBreadCrumb from '@/components/ui/DRZBreadCrumb';
import UMTable from '@/components/ui/DRZTable';
import DarazCommonAddButton from '@/components/ui/DarazCommonAddButton';
import { useGetAllOpenigBalanceQuery } from '@/redux/api/inventory/openingBalanceApi';
import { useDebounced } from '@/redux/hook';
import { getStoreAuthSelectedStore } from '@/services/auth.service';
import { showAmount } from '@/utils/amountFormat';
import { EyeOutlined, SearchOutlined, FormOutlined } from '@ant-design/icons';
import type { PaginationProps } from 'antd';
import { Input, Pagination, Select } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import HelperService from '@/services/Helper.service';

const { Option } = Select;

const additionalData = [
  { id: 1, indentNo: '000001', indentDate: '27-10-2023', masterGroup: 'Dry Items', toStore: 'Sub Store', action: 'Edit/View' },
  { id: 2, indentNo: '000201', indentDate: '27-10-2023', masterGroup: 'Fresh Items', toStore: 'Sub Store', action: 'Edit/View' },
];

const OpeningBalanceIndex = () => {
  // query
  const query: Record<string, any> = {};
  const authStoreSelect = getStoreAuthSelectedStore();
  const authStoreSelectData = authStoreSelect
    ? JSON.parse(authStoreSelect)
    : null;
  const storeId = authStoreSelectData.storeId;
  const router = useRouter();
  const searchParams = useSearchParams();
  // states
  const pgData = HelperService.getPageDataCaching({ pageNo: 0, pageSize: 10 });

  const [size, setSize] = useState<number>(pgData.pageNoSize);
  const [page, setPage] = useState<number>(pgData.pageNo);

  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // create debounce hook
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  // set debounce on searchTem if debounce exist
  if (!!debouncedTerm) {
    query['searchTerm'] = debouncedTerm;
  }

  // get all import data
  const { data: openigBalaneData, isLoading } = useGetAllOpenigBalanceQuery({
    ...query,
    sortField: sortBy,
    sortDirection: sortOrder,
    filter: debouncedTerm,
    page: page,
    size: size,
    storeId: storeId,
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
              href={`/super_admin/inventory/opening-balance/view/${record}`}
            >
              <IconButton icon={<FormOutlined />} /> <IconButton icon={<EyeOutlined />} />
            </Link>
          </>
        );
      },
    },
  ];

  // pagination
  // const onPaginationChange = (page: number, pageSize: number) => {
  //   const resData = HelperService.getPageDataChange(page, pageSize);
  //   setPage(resData.pageNo);
  //   setSize(resData.pageNoSize);
  // };

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page - 1);
    setSize(pageSize);
  };


  // sortBy and sortOrder
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === 'ascend' ? 'asc' : 'desc');
  };


  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return <a className='text-center	'>&lt; Previous</a>;
    }
    if (type === 'next') {
      return <a>Next &gt;</a>;
    }
    return originalElement;
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
              to={`/super_admin/inventory/opening-balance/create`}
            >
              + Add New
            </DarazCommonAddButton>
            {/* <DarazCommonAddButton
              to={`/super_admin/inventory/opening-balance/upload`}>
              + Upload Excel
            </DarazCommonAddButton> */}
            <div className='md:w-1/6 mt-2 md:mt-0 w-full'>
              <Input
                size='large'
                className='shadow-sm'
                placeholder='Search by Receive no..'
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                }}
                suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
                allowClear={true}
              />
            </div>
          </ActionBar>

          <UMTable
            loading={isLoading}
            columns={columns}
            dataSource={additionalData}
            onTableChange={onTableChange}
            totalPages={openigBalaneData?.result?.totalElements}
            pageSize={openigBalaneData?.result?.size}
            pageNo={openigBalaneData?.result?.page + 1}
            showSizeChanger={true}
            onPaginationChange={onPaginationChange}
            showPagination={true}
          />

          <div style={{ display: 'flex', justifyContent: 'justify-evenly', alignItems: 'center', marginTop: '20px', background: 'gray' }}>
            <div>
              <label>Per page</label>
              <Select
                value={size}
                onChange={(value) => setSize(value)}
                style={{ width: 80 }}
              >
                <Option value={10}>10</Option>
                <Option value={20}>20</Option>
                <Option value={50}>50</Option>
                <Option value={100}>100</Option>
              </Select>
            </div>
            <Pagination
              total={openigBalaneData?.result?.totalElements || 0}
              current={page + 1}
              pageSize={size}
              onChange={onPaginationChange}
              itemRender={itemRender}
              showSizeChanger={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OpeningBalanceIndex;
