'use client';
import { useEffect, useMemo, useState } from 'react';
import Form from '@/components/Forms/Form';
import FormDatePicker from '@/components/Forms/FormDatePicker';
import FormInput from '@/components/Forms/FormInput';
import UMBreadCrumb from '@/components/ui/DRZBreadCrumb';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
// import { amount } from '../../../../../../utils/amountFormat';
// import SellsServices from '../../../../../../services/Sells.service';
import Loading from '@/app/loading';
import DarazCommonButton from '@/components/ui/DarazCommnonSaveButton';
import DarazCommonCloseButton from '@/components/ui/DarazCommonCloseButton';
import DarazRadio from '@/components/Forms/DarazRadioSelect';
// import {
//   useOpeningBalanceChildItemQuery,
//   useAddOpenigBalanceMutation,
//   useOpeningBalanceMasterDropDownQuery,
//   useOpeningBalanceUomQuery,
// } from '@/redux/api/inventory/openingBalanceApi';
// import { useServerDateTimeQuery } from '@/redux/api/TransactionGlobalApi';
import { Button, Col, DatePicker, Input, Row, Select, message } from 'antd';
import Link from 'next/link';

import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from '@/redux/hook';
import { useRouter } from 'next/navigation';
import dayjs, { Dayjs } from 'dayjs';
import { useVdsPurchaserDateQuery } from '@/redux/api/commercialApi/vdsPurchaserApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { createLocalSellSchema } from '@/schemas/inventory/sell/createReceiveSchema';
import { boolean } from 'yup';
// import {
//   getAuthData,
//   getStoreAuthSelectedStore,
// } from '@/services/auth.service';
import DRZSelectField from '@/components/Forms/DRZSelectField';
import { useAddDuePenaltySerchargeMutation } from '@/redux/api/commercialApi/duePenaltySerchargeApi';


const OpeningBalanceCreate = () => {

  // state
  const [isMobileView, setIsMobileView] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const [trasactionDate, setTrasactionDate] = useState<any>(dayjs());
  const [selectedDate, setSelectedDate] = useState<any>();
  const [lastTransDate, setLastTransDate] = useState<any>();
  const [selectedUomId, setSelectedUomId] = useState<any>(null);

  const initialState = useMemo(
    () => ({
      itemInfoId: null,
      indentChildId: null,
      currencyInfoId: 1,
      isModal: false,
      uomList: [],
      uomId: null,
      uomShortCode: '',
      relativeFactor: 1,
      vatPaymentMethodId: null,
      itemCatForRetailId: null,
      gateRecvQty: 0.0,
      recvQuantity: 0.0,
      itemReceiveRate: 0,
      issueRate: 0,
      vatRateTypeId: null,
      isFixedRate: false,
      cdPercent: 0,
      cdAmount: 0,
      rdPercent: 0,
      rdAmount: 0,
      sdPercent: 0,
      sdAmount: 0,
      vatPercent: 0,
      fixedRateUomId: null,
      fixedRate: 0,
      vatAmount: 0,
      atPercent: 0,
      atAmount: 0,
      aitPercent: 0,
      aitAmount: 0,
      totalAmtTransCurr: 0,
      totalAmtLocalCurr: 0,
      itemCatForDetailId: 0,
      defaultVatRateId: 3,
      stockQty: 0,
    }),
    [],
  );

  const router = useRouter();
  const [addDue] = useAddDuePenaltySerchargeMutation();

  // start child dynamic table
  const [rows, setRows] = useState([initialState]);

  const [selectedItem, setSelectedItem] = useState<Array<number | null>>(
    Array(rows.length).fill(null),
  );

  const [selectedRows, setSelectedRows] = useState([]);
  const [itemOptions, setItemOptions] = useState([]);
  const [selectProductId, setSelectProductId] = useState<any>();
  const [selectedItemId, setSelectedItemId] = useState(true);

  const addRow = () => {
    if (rows && itemOptions) {
      if (rows.length < itemOptions.length) {
        const newRow = {
          itemInfoId: 0,
          indentChildId: null,
          currencyInfoId: 1,
          uomList: [],
          isModal: false,
          uomId: null,
          uomShortCode: '',
          relativeFactor: 1,
          vatPaymentMethodId: 1,
          defaultVatRateId: 3,
          recvQuantity: 0.0,
          itemReceiveRate: 0.0,
          gateRecvQty: 0.0,
          vatRateTypeId: 1,
          isFixedRate: false,
          cdPercent: 0.0,
          cdAmount: 0.0,
          rdPercent: 0.0,
          rdAmount: 0,
          sdPercent: 0.0,
          sdAmount: 0,
          vatPercent: 0.0,
          fixedRateUomId: null,
          fixedRate: 0.0,
          vatAmount: 0.0,
          atPercent: 0.0,
          atAmount: 0,
          aitPercent: 0.0,
          aitAmount: 0,
          totalAmtTransCurr: 0.0,
          totalAmtLocalCurr: 0.0,
          itemCatForDetailId: 0,
          stockQty: 0,
        };
        //@ts-ignore
        setRows([...rows, newRow]);
        setSelectedItem((prevChallans) => [...prevChallans, null]);
      } else {
        toast.error('Cannot add more rows. Limit reached.');
      }
    } else {
      toast.error('Rows or challanOptions is not defined.');
    }
  };


  const toggleSelect = (index: number) => {
    //@ts-ignore
    const selectedIndex = selectedRows.indexOf(index);
    if (selectedIndex === -1) {
      //@ts-ignore
      setSelectedRows([...selectedRows, index]);
    } else {
      const updatedSelectedRows = [...selectedRows];
      updatedSelectedRows.splice(selectedIndex, 1);
      setSelectedRows(updatedSelectedRows);
    }
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === rows.length) {
      setSelectedRows([]);
    } else {
      //@ts-ignore
      setSelectedRows([...Array(rows.length).keys()]);
    }
  };


  const selectTransactionDate = (value: Dayjs | null) => {
    setTrasactionDate(value);
  };

  // Function to disable past and future dates


  const deleteSelectedRows = () => {
    if (selectedRows.length === 0) {
      toast.error('No item selected');
      return;
    }
    const updatedRows = rows.filter(
      //@ts-ignore
      (_, index) => {
        return !selectedRows.includes(index);
      },
    );

    const selectedRowIndicesMap = {};
    selectedRows.forEach((rowIndex, selectedRowIndex) => {
      //@ts-ignore
      selectedRowIndicesMap[rowIndex] = selectedRowIndex;
    });
    // Update selectedItem array
    setSelectedItem((prevItem) =>
      prevItem.filter((_, itemId: any) => !deletedItemInfoIds.includes(itemId)),
    );
    const updatedSelectedItem = selectedItem.filter((_, index) => {
      return !(index in selectedRowIndicesMap);
    });
    const deletedItemInfoIds = selectedRows.map(
      (index) => rows[index]?.itemInfoId,
    );
    setSelectedItem(updatedSelectedItem);
    if (updatedRows.length === 0) {
      setSelectedItemId(true);
    }
    setRows(updatedRows);
    setSelectedRows([]);
  };
const uomList = [{id:'1',uomShortCode:'pcs'}]

  const productTypesOptions =
    uomList &&
    uomList?.map((item: any) => {
      return {
        label: item.uomShortCode,
        value: item.id,
      };
    });

  const [payModeId, setSelectedPaymode] = useState(null);

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  // filter on select
  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());



  // submit handler
  const onSubmit = async (values: any) => {
    



    try {
 
      const res = await addDue(values);
  
      //@ts-ignore
      if ('data' in res && res.data && res.data.result) {
        // Success case: HTTP status code is 200

        toast.success('Data Created successfully!');
        router.push(`/super_admin/inventory/opening-balance`);
      } else {
        // Error case: HTTP status code is not 200
        //@ts-ignore
        toast.error('Error! Insertion failed');
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  // if (isLoading) {
  //   return <Loading />;
  // }
  return (
    <div
      style={{
        padding: '10px',
      }}
    >
      <UMBreadCrumb
        pageName='Opening Balance'
        lastName='Create'
        link={'/super_admin/inventory/opening-balance'}
      />
      <div
        style={{
          padding: '20px 0px',
          marginTop: '0px',
        }}
      >
        <div style={{}}>
          <Form
            submitHandler={onSubmit}
            // resolver={yupResolver(openingBalanceSchema)}
            restore={resetForm}
            handleReset={() => setResetForm(false)}
          >
            <div
              style={{
                marginBottom: '10px',
                padding: '20px',
                marginTop: '11px',
                backgroundColor: '#fff6f6e6',
                borderRadius: '10px',
                border: '1px solid #e9e8e8',
                boxSizing: 'border-box',
              }}
            >
              <div
                className='bd-highlight'
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                }}
              ></div>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col
                  className='gutter-row'
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 12 }}
                  lg={{ span: 6 }}
                  style={{
                    marginBottom: '20px',
                  }}
                  aria-required
                >
                  <FormInput
                    type='text'
                    name=''
                    label='Requsition No:'
                    required
                    placeholder='<<**/NEW/**>>'
                    // disable
                  />
                </Col>
                <Col
                  className='gutter-row'
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 12 }}
                  lg={{ span: 6 }}
                  aria-required
                  style={{
                    marginBottom: '20px',
                  }}
                >
                  <label htmlFor=''>
                    <p style={{ marginBottom: '5px' }}>
                      Receive Date:<span style={{ color: 'red' }}>*</span>
                    </p>
                  </label>
                  {/* {dayjs(trasactionDate)} */}
                  <DatePicker
                    name=''
                    //@ts-ignore
                    selected={trasactionDate}
                    value={trasactionDate}
                    onChange={(value) => selectTransactionDate(value)}
                    required
                    style={{
                      width: '100%',
                    }}
                  
                    format='YYYY-MM-DD'
                    //@ts-ignore
                    // showTime={
                    //   window.innerWidth > 768
                    //     ? { format: 'hh:mm', minuteStep: 0 }
                    //     : false
                    // }
                  />
                </Col>
                {/* <FormDatePicker
                    name=''
                    //@ts-ignore
                    value={trasactionDate ? dayjs(trasactionDate) : null}
                    placeholder='Select Date'
                    label='Receive Date:'
                    onChange={(value) => handleDateChange(value)}
                    required
                    disabledDate={(current) =>
                      current && current > dayjs().endOf('day')
                    }
                    format='DD-MM-YYYY'
                  /> */}

                <Col
                  className='gutter-row'
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 12 }}
                  lg={{ span: 6 }}
                  style={{ marginBottom: '20px' }}
                >
                  <DRZSelectField
                    style={{
                      width: '100%',
                    }}
                    name='prodTypeId'
                    options={productTypesOptions}

                    label='Requestion To: '
                    placeholder='Select Product Type'
                    required
                    disable={!selectedItemId}
                    onSearch={onSearch}
                    filterOption={filterOption}
                  />
                </Col>
                <Col
                  className='gutter-row'
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 12 }}
                  lg={{ span: 6 }}
                  style={{
                    marginBottom: '20px',
                  }}
                  aria-required
                >
                  
                  {/* <FormInput
                    style={{ color: 'black' }}
                    name=''
                    label='Fiscal Year:'
                    disable
                    type='text'
                    value={fiscalYearName}
                    required
                  /> */}
                  {/* <DarazRadio/> */}
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 12 }}
                  lg={{ span: 6 }}
                >
                  <DRZSelectField
                    style={{
                      width: '100%',
                    }}
                    name='prodTypeId'
                    options={productTypesOptions}
                    label='Product Type: '
                    placeholder='Select Product Type'
                    required
                    onSearch={onSearch}
                    filterOption={filterOption}
                  />
                </Col>
                <Col
                  className='gutter-row'
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 12 }}
                  lg={{ span: 6 }}
                  style={{
                    marginBottom: '20px',
                  }}
                  aria-required
                >
                  <DRZSelectField
                    style={{
                      width: '100%',
                    }}
                    name='prodTypeId'
                    options={productTypesOptions}
                    label='Product Type: '
                    placeholder='Select Product Type'
                    required
                    disable={!selectedItemId}
                    onSearch={onSearch}
                    filterOption={filterOption}
                  />
                </Col>
                <Col
                  className='gutter-row'
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 12 }}
                  lg={{ span: 6 }}
                  style={{
                    marginBottom: '20px',
                  }}
                  aria-required
                >
                  <DRZSelectField
                    style={{
                      width: '100%',
                    }}
                    name='prodTypeId'
                    options={productTypesOptions}

                    label='Product Type: '
                    placeholder='Select Product Type'
                    required
                    disable={!selectedItemId}
                    onSearch={onSearch}
                    filterOption={filterOption}
                  />
                </Col>
                <Col
                  className='gutter-row'
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 12 }}
                  lg={{ span: 6 }}
                  style={{
                    marginBottom: '20px',
                  }}
                  aria-required
                >
                  
                  <FormInput
                    style={{ color: 'black' }}
                    name=''
                    label='Fiscal Year:'
                    disable
                    type='text'
                    required
                  />
                  {/* <DarazRadio/> */}
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 12 }}
                  lg={{ span: 6 }}
                >
                  <DRZSelectField
                    style={{
                      width: '100%',
                    }}
                    name='prodTypeId'
                    options={productTypesOptions}
                    label='Bar Code/Item Code:'
                    placeholder='--Select Supplier--'
                    required
                    // enable={!selectedItemId}
                    onSearch={onSearch}
                    filterOption={filterOption}
                  />
                </Col>
                <Col
                  className='gutter-row'
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 12 }}
                  lg={{ span: 6 }}
                  style={{
                    marginBottom: '20px',
                  }}
                  aria-required
                >
                  <FormInput
                    style={{ width: '100%', textAlign: 'left' }}
                    label='Purpose:'
                    type='text'
                    name='purpose'
                    placeholder='Write Purpose here....'
                    // onChange={handleTranslateValue('purpose')}
                  />
                </Col>
                <Col
                  className='gutter-row'
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 12 }}
                  lg={{ span: 6 }}
                  style={{
                    marginBottom: '20px',
                  }}
                  aria-required
                >
                  <FormInput
                    label='Remarks: '
                    type='text'
                    name='remarks'
                    placeholder='Write Remarks here....'
                    // onChange={handleTranslateValue('remarks')}
                    // value={translatedValue?.remarks}
                    // onChange={(value) => setTranslatedValue(value)}
                  />
                </Col>
              </Row>
            </div>

            <div
              style={{
                marginBottom: '10px',
                padding: '20px',
                marginTop: '11px',
                backgroundColor: '#fff6f6e6',
                borderRadius: '10px',
                border: '1px solid #e9e8e8',
                boxSizing: 'border-box',
              }}
            >
              <Row
                style={{
                  padding: '0px 0px',
                }}
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              >
                {' '}
                <Col
                  className='gutter-row'
                  span={24}
                  style={{
                    marginBottom: '20px',
                  }}
                  aria-required
                >
                  {/* form child  start */}

                    <div className='relative overflow-x-auto  sm:rounded-lg'>
                      <h4>Item Info</h4>
                      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                        <thead className='bg-orange-thead text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                          <tr>
                            {/* @ts-ignore */}
                            <th className='px-2 py-2 w-2.5'>SL
                              {/* <input
                                type='checkbox'
                                checked={selectedRows.length === rows.length}
                                onChange={toggleSelectAll}
                                className='form-checkbox h-5 w-5 text-indigo-600'
                              /> */}
                            </th>
                            {/* @ts-ignore */}
                            <th className='px-2 py-2 w-32'>Item Name</th>
                            <th className='px-2 py-2 w-32'>Item Name BN</th>
                            <th className='px-2 py-2 w-32	text-center'>UOM</th>

                            <th className='px-2 py-2 text-center w-32	'>
                              Requisition QTY
                            </th>
                            <th className='px-2 py-2 text-center w-32	'>
                              In Stock
                            </th>
                            <th className='px-2 py-2 text-center w-32	'>
                              Required Date
                            </th>
                            <th className='px-2 py-2 text-center w-32	'>
                              Comments
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row, index) => (
                            <tr key={index}>
                              <td>
                                <input
                                  type='checkbox'
                                  // @ts-ignore
                                  checked={selectedRows.includes(index)}
                                  onChange={() => toggleSelect(index)}
                                  className='form-checkbox h-5 w-5 text-indigo-600'
                                />
                              </td>
                              <td>
 
                              </td>
                              <td>
                                <Select
                                  style={{
                                    width: '100%',
                                  }}
                                  showSearch
                                  value={row.uomId}
                                  placeholder='Select UOM'
                                  optionFilterProp='children'
                                />
                              </td>
                              <td>
                                <FormInput
                                  type='number'
                                  className='border rounded mt-3 p-2 mb-2 w-full'
                                  name={`rows.${index}.recvQuantity`}
                                  placeholder='0'
                                />
                              </td>
                              <td>
                                <FormInput
                                  type='number'
                                  className='border rounded mt-3 p-2 mb-2 w-full'
                                  name={`rows.${index}.itemReceiveRate`}
                                  placeholder='0'
                       
                                />
                              </td>
                              <td>
                                <FormInput
                                  style={{ color: 'black' }}
                                  type='number'
                                  name='itemReceiveRate'
                                  //@ts-ignore
                                  value={row?.totalAmtLocalCurr}
                                  disable
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
    
                </Col>
              </Row>

              <div
                className='flex flex-col md:flex-row justify-between md:items-center gap-4'
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <Button
                    shape='circle'
                    icon={<PlusCircleOutlined />}
                    onClick={addRow}
                    style={{
                      background: '#02BBDB',
                      color: 'white',
                    }}
                  />{' '}
                  <Button
                    type='primary'
                    className='ms-3'
                    danger
                    shape='circle'
                    icon={<DeleteOutlined />}
                    onClick={deleteSelectedRows}
                  />{' '}
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'end',
                    gap: '10px',
                  }}
                >
                  <Link href={`/super_admin/inventory/opening-balance`}>
                    {' '}
                    <DarazCommonCloseButton>Close</DarazCommonCloseButton>
                  </Link>
                  <button
                    type='button'
                    className={`text-white py-2 px-4 rounded shadow-md hover:shadow-lg hover:bg-[#363434] bg-[#b9aba4] cursor-pointer focus:outline-none font-medium text-sm text-center border-none`}
           
                  >
                    Reset
                  </button>
                  <DarazCommonButton type='submit'>Save</DarazCommonButton>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default OpeningBalanceCreate;
