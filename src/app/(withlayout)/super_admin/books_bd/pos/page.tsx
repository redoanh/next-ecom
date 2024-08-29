"use client";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormInput from "@/components/Forms/FormInput";
import booksData from "./booksData.json";
import customerData from "./customerData.json";
import { Button, Col, Row } from "antd";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  useVdsPaymentDropDownQuery,
  useVdsPaymentDateQuery,
} from "@/redux/api/commercialApi/vdsPaymentApi";
import { useRouter } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import BooksBdButton from "@/components/ui/BooksBdButton";
import CustomarModal from "@/components/Modal/CustomarModal";
import InvoiceModal from "@/components/Modal/InvoiceModal";

// table children

const BooksBdPos = () => {
  // state

  const [searchTerm, setSearchTerm] = useState("");
  const [searchCustomer, setSearchCustomer] = useState("");
  const [filteredData, setFilteredData] = useState<any>([]);
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState<any>(
    dayjs().format("YYYY-MM-DD")
  );
  const [bookItem, setBookItem] = useState(booksData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [result, setResult] = useState("");
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [discount, setDiscount] = useState<any>(0);
  const containerRef = useRef<any>();
  // bar code
  const [barCode, setBarCode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const initialFormState = {
    fieldName1: "",
    fieldName2: "",
    // ... add more fields as needed
  };

  // State to manage form values
  const [formValues, setFormValues] = useState(initialFormState);

  const showPaymentModal = () => {
    setPaymentModalOpen(true);
  };
  const showCustomarModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setPaymentModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setPaymentModalOpen(false);
  };

  // qr code reader

  const handleScan = (data: any) => {
    if (data) {
      setResult(data);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  useEffect(() => {
    const container = containerRef.current;
    container.scrollTop = container.scrollHeight;
  }, [selectedItems]);

  // bar code insert function
  const handleInputChange = (event: any) => {
    const code = event.target.value;
    const bookToInsert = bookItem.find((book) => book.id == code);

    if (bookToInsert) {
      setSelectedCard(bookToInsert);

      const isItemAlreadySelected = selectedItems.some(
        (selectedItem: any) => selectedItem.id === bookToInsert.id
      );

      if (isItemAlreadySelected) {
        const updatedItems = selectedItems.map((selectedItem: any) =>
          selectedItem.id === bookToInsert.id
            ? { ...selectedItem, quantity: selectedItem.quantity + 1 }
            : selectedItem
        );
        setSelectedItems(updatedItems);
      } else {
        setSelectedItems([...selectedItems, { ...bookToInsert, quantity: 1 }]);
      }
    }
    setBarCode(code);
  };
  console.log(selectedCard, "selected card")
  console.log( selectedItems, "selected items")
  // card click function
  const handleCardClick = (item: any) => {
    const isSameCard = selectedCard && selectedCard.id === item.id;
    if (isSameCard) {
      const updatedItems = selectedItems.map((selectedItem: any) =>
        selectedItem.id === item.id
          ? { ...selectedItem, quantity: selectedItem.quantity + 1 }
          : selectedItem
      );
      setSelectedItems(updatedItems);
    } else {
      setSelectedCard(item);
      const isItemAlreadySelected = selectedItems.some(
        (selectedItem: any) => selectedItem.id === item.id
      );

      if (isItemAlreadySelected) {
        const updatedItems = selectedItems.map((selectedItem: any) =>
          selectedItem.id === item.id
            ? { ...selectedItem, quantity: selectedItem.quantity + 1 }
            : selectedItem
        );
        setSelectedItems(updatedItems);
      } else {
        setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
      }
    }
  };

  const updateQuantity = (index: number, newQuantity: string) => {
    const updatedSelectedItems = [...selectedItems];
    updatedSelectedItems[index].quantity = parseInt(newQuantity, 10) || 0;
    setSelectedItems(updatedSelectedItems);
  };
  const addQuantity = (index: number) => {
    const updatedSelectedItems = [...selectedItems];
    updatedSelectedItems[index].quantity += 1;
    setSelectedItems(updatedSelectedItems);
  };
  const minusQuantity = (index: number) => {
    const updatedSelectedItems = [...selectedItems];
    const currentQuantity = updatedSelectedItems[index].quantity;
    if (currentQuantity > 1) {
      updatedSelectedItems[index].quantity = currentQuantity - 1;
      setSelectedItems(updatedSelectedItems);
    } else {
      toast.error("Quantity cann't be less than 1");
    }
  };
  const deleteItem = (id: any) => {
    const updatedItems = selectedItems.filter((item: any) => item.id !== id);
    setSelectedItems(updatedItems);
  };
  const handleDateChange = (value: any) => {};

  const { data: datasource } = useVdsPaymentDropDownQuery({});
  const categoryOptions =
    datasource &&
    datasource?.result?.bankType?.map((bank: any) => {
      return {
        label: bank?.name,
        value: parseInt(bank?.id),
      };
    });

  // search term
  const resetFilters = (e: any) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    const searchResult = booksData.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.author.toLowerCase().includes(query)
    );
    setBookItem(searchResult);
  };

  const resetCustomer = (e: any) => {
    const query = e.target.value.toLowerCase();
    setSearchCustomer(query);
    if (query.length === 11 && /^\d+$/.test(query)) {
      const foundContact = customerData.find((item) => item.phone === query);
      setFilteredData(foundContact ? [foundContact] : []);
      setPhone(query);
    } else {
      setFilteredData([]);
    }
  };

  const { data: vdsDate } = useVdsPaymentDateQuery(selectedDate);
  const vdsData = vdsDate?.result?.vatMonth;
  const names = vdsData
    ? vdsData.map((item: { name: string }) => item.name).join(", ")
    : "";

  //search functions
  const onSearch = (value: string) => {
    // console.log("search:", value);
  };
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  // Submit Handler
  const onSubmit = async (values: any) => {};

  //calculation
  const calculateSubtotal = (items: any[]) => {
    return items.reduce((subtotal, item) => {
      return subtotal + item.price * item.quantity;
    }, 0);
  };
  const calculateVAT = (items: any[]) => {
    const subtotal = calculateSubtotal(items);
    const vatPercentage = 0.05; // 5%
    return subtotal * vatPercentage;
  };

  const calculateTotalWithDiscount = (items: any[]) => {
    const subtotal = calculateSubtotal(items);
    const vatAmount = calculateVAT(items);
    const totalBeforeDiscount = subtotal + vatAmount;
    const discountAmount = discount;
    const totalAfterDiscount = totalBeforeDiscount - discountAmount;
    return totalAfterDiscount;
  };
  console.log(calculateVAT(selectedItems), "vat Amount");
  return (
    <div style={{ padding: "10px" }}>
      <Form submitHandler={onSubmit}>
        <div
          className="grid grid-cols-5 gap-2"
          style={{
            position: "sticky",
          }}
        >
          <div
            className="background"
            style={{ height: "90vh", overflowX: "hidden", overflowY: "auto" }}
          >
            <div
              className="mb-4 uppercase text-green-200 p-2 text-xl text-center"
              style={{ backgroundColor: "#047857", color: "white" }}
            >
              Book Items
            </div>
            <div className="mb-2">
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col
                  className="gutter-row"
                  span={8}
                  style={{
                    marginBottom: "15px",
                    justifyContent: "space-between",
                    marginLeft: "10px",
                    color: "white",
                  }}
                >
                  <DRZSelectField
                    style={{ width: "100%", textAlign: "left" }}
                    name="commissionerateId"
                    options={categoryOptions}
                    label="Select Publisher"
                    required
                    placeholder="--Select Publisher--"
                  />
                </Col>
                <Col
                  className="gutter-row"
                  span={8}
                  style={{
                    marginBottom: "15px",
                    justifyContent: "space-between",
                    marginLeft: "10px",
                    color: "white",
                  }}
                >
                  <DRZSelectField
                    style={{ width: "100%", textAlign: "left" }}
                    name="commissionerateId"
                    options={categoryOptions}
                    label="Select Author"
                    required
                    placeholder="--Select Author--"
                  />
                </Col>

                <Col
                  className="gutter-row"
                  span={6}
                  style={{
                    marginBottom: "15px",
                    justifyContent: "space-between",
                    marginLeft: "10px",
                    color: "white",
                  }}
                >
                  <FormInput
                    type=""
                    name=""
                    placeholder="Search..."
                    label="Search:"
                    value={searchTerm}
                    onChange={resetFilters}
                    style={{
                      width: "100%",
                    }}
                  />
                </Col>
              </Row>
            </div>
            <div className="m-2 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {bookItem.map((book) => {
                const selectedBook = selectedItems.find(
                  (item: any) => item.id === book.id
                );
                return (
                  <>
                    <div
                      style={{ position: "relative" }}
                      key={book.id}
                      className={`card ${
                        selectedCard && selectedCard.id === book.id
                          ? "selected"
                          : ""
                      } `}
                      onClick={() => handleCardClick(book)}
                    >
                      <div className="p-2">
                        <Image
                          className="rounded-sm grid mx-auto"
                          src={book.photo}
                          alt="Img"
                          width={45}
                          height={60}
                        />
                      </div>

                      <div className="py-1 grid items-center w-full">
                        <div className="bookName">
                          <span>{book.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span>৳ {book.price}</span>
                          </div>
                          {selectedBook && (
                            <div
                              className="pr-2 quantity-indicator absolute bottom-0 right-0 text-white p-1 rounded-tl-md"
                              style={{
                                position: "absolute",
                                backgroundColor: "#5996f7",
                                color: "white",
                              }}
                            >
                              <span> Qty: {selectedBook.quantity || 0}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div
            className="col-span-2 rounded bg-[#064e3b] shadow-md"
            style={{ height: "90vh", position: "relative" }}
          >
            <div
              className="flex text-xl p-2 items-center uppercase text-center mb-4"
              style={{ backgroundColor: "#047857", color: "white" }}
            >
              <div className="flex">Bar Code :</div>
              {/* {bookItem.map((book)=>( */}
              <div
                className="flex"
                style={{
                  justifyContent: "space-between",
                  marginLeft: "2px",
                  color: "white",
                  minWidth: "40%",
                }}
              >
                <FormInput
                  type="text"
                  name=""
                  placeholder="Bar Code..."
                  value={barCode}
                  onChange={handleInputChange}
                  style={{
                    width: "90%",
                    height: "37px",
                  }}
                  autoFocus
                />
              </div>
              {/* ))} */}
            </div>
            <div
              className=" ml-3 mt-5"
              style={{
                height: "auto",
                maxHeight: "30vh",
                overflow: "auto",
              }}
              ref={containerRef}
            >
              <div>
                {selectedItems.map((selectedItem: any, index: any) => (
                  <div key={index} className="childCard">
                    <div>
                      <Image
                        className="mb-2 grid rounded-sm mx-auto"
                        src={selectedItem.photo}
                        alt="Img"
                        width={25}
                        height={35}
                      />
                    </div>
                    <div className="flex items-center text-center w-44 h-10 overflow-hidden">
                      <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                        {selectedItem.name}
                      </span>
                    </div>
                    <div>
                      <span>
                        {selectedItem.price * selectedItem.quantity + " ৳"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <Button
                          shape="circle"
                          icon={<MinusCircleOutlined />}
                          onClick={() => {
                            minusQuantity(index);
                          }}
                          style={{
                            background: "#000000",
                            color: "white",
                          }}
                        />{" "}
                      </div>
                      <div className="flex items-center w-10">
                        <FormInput
                          type="text"
                          name=""
                          placeholder="1"
                          value={selectedItem.quantity}
                          onChange={(e) =>
                            updateQuantity(index, e.target.value)
                          }
                          style={{
                            width: "100%",
                          }}
                        />
                        <ToastContainer />
                      </div>
                      <div className="flex items-center w-10">
                        <Button
                          shape="circle"
                          icon={<PlusCircleOutlined />}
                          onClick={() => {
                            addQuantity(index);
                          }}
                          style={{
                            background: "#02BBDB",
                            color: "white",
                          }}
                        />{" "}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Button
                        type="primary"
                        className="ms-3"
                        danger
                        shape="circle"
                        icon={<DeleteOutlined />}
                        onClick={() => deleteItem(selectedItem.id)}
                      />{" "}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="m-3"
              style={{
                height: "45vh",
                position: "relative",
                width: "95%",
                bottom: 0,
              }}
            >
              <div
                className="p-2 flex bg-[#fcd34d] rounded-t-sm items-center justify-between"
                style={{ height: "10vh" }}
              >
                <Row
                  style={{
                    padding: "2px",
                    margin: "5px",
                    width: "100%",
                  }}
                  gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                >
                  <div
                    className="mr-5 gutter-row w-2/5 mb-2"
                    style={{
                      justifyContent: "space-between",
                      marginLeft: "2px",
                      color: "black",
                      minWidth: "40%",
                      marginTop: "3px",
                    }}
                  >
                    <FormInput
                      type="text"
                      name=""
                      placeholder="Search by phone number..."
                      label="Customer Phone:"
                      value={searchCustomer}
                      onChange={resetCustomer}
                      style={{
                        width: "100%",
                      }}
                      required
                    />
                  </div>
                  {filteredData.length > 0 &&
                    searchCustomer.length === 11 &&
                    /^\d+$/.test(searchCustomer) && (
                      <div
                        className="gutter-row w-1/2"
                        style={{
                          justifyContent: "space-between",
                          marginLeft: "5px",
                          color: "black",
                          marginTop: "3px",
                        }}
                      >
                        {filteredData.map((item: any, index: any) => (
                          <FormInput
                            key={index}
                            type="text"
                            name=""
                            label="Customer Name:"
                            value={item.name}
                            style={{
                              width: "70%",
                            }}
                            readOnly
                          />
                        ))}
                      </div>
                    )}
                  {filteredData.length === 0 &&
                    searchCustomer.length === 11 &&
                    /^\d+$/.test(searchCustomer) && (
                      <div
                        className="gutter-row w-2/5"
                        style={{
                          justifyContent: "space-between",
                          marginLeft: "10px",
                          color: "black",
                          marginTop: "7px",
                        }}
                      >
                        <BooksBdButton to={`#`} onClick={showCustomarModal}>
                          + Add
                        </BooksBdButton>
                      </div>
                    )}
                </Row>
              </div>
              <div
                className="p-5 justify-between bg-[#fde68a] rounded-b-sm shadow-md"
                style={{ height: "35vh" }}
              >
                <div
                  className="flex justify-between font-bold py-1"
                  style={{ borderBottom: "1px solid #a3a3a3" }}
                >
                  <div>Sub Total</div>
                  <div>{calculateSubtotal(selectedItems)}</div>
                </div>
                <div
                  className="flex justify-between  font-bold py-2"
                  style={{ borderBottom: "1px solid #a3a3a3" }}
                >
                  <div>VAT</div>
                  <div>5 (%)</div>
                  <div>{calculateVAT(selectedItems)}</div>
                </div>

                <div
                  className="flex justify-between items-center font-bold py-1"
                  style={{ borderBottom: "2px solid #000000" }}
                >
                  <div>Discount Amount</div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <FormInput
                      type="text"
                      name=""
                      value={discount}
                      onChange={(e: any) => setDiscount(e.target.value)}
                      style={{
                        width: "40%",
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-between font-bold py-1">
                  <div>Total Payble Amount</div>
                  <div>{calculateTotalWithDiscount(selectedItems)}</div>
                </div>
                <div className="flex justify-end font-bold" style={{}}>
                  <div>
                    <BooksBdButton
                      to={`#`}
                      color={"bg-[#4096ff] hover:bg-[#1677ff]"}
                      type="primary"
                      onClick={showPaymentModal}
                    >
                      Payment
                    </BooksBdButton>
                  </div>
                  <div>
                    <InvoiceModal
                      isModalOpen={isPaymentModalOpen}
                      handleOk={handleOk}
                      handleCancel={handleCancel}
                      tableTitle={"Invoice"}
                    />
                    <CustomarModal
                      isModalOpen={isModalOpen}
                      handleOk={handleOk}
                      handleCancel={handleCancel}
                      tableTitle={"Customer Registration"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default BooksBdPos;
