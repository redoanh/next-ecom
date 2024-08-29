import React, { useState } from "react";
import { Button, Modal } from "antd";
import Form from "@/components/Forms/Form";
import { Col, Row, Select, message } from "antd";
import FormInput from "../Forms/FormInput";
import BooksBdButton from "../ui/BooksBdButton";

const OrderListModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  tableTitle,
  width,
}: any) => {
  const onSubmit = () => {};
  return (
    <>
      <div>
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width="60%"
          footer={(_, { OkBtn, CancelBtn }) => (
            <>
              <div className="flex items-center justify-end mt-2 ">
                <div>
                  <CancelBtn />
                </div>
              </div>
            </>
          )}
        >
          <div
            className="mt-7 text-center"
            style={{ maxHeight: "50vh", overflowY: "auto" }}
          >
            <div className="pb-3">
              <span className="font-bold text-xl text-[#16a34a] text-center">
                {tableTitle}
              </span>
            </div>
            <div
              style={{
                padding: "20px",
                marginTop: "11px",
                borderRadius: "10px",
                boxSizing: "border-box",
              }}
            >
              <Form submitHandler={onSubmit}>
                <Row className="pb-2" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col span={8} className="gutter-row">
                    <FormInput
                      type="text"
                      name=""
                      label="Purchase Order Number"
                      disable
                    />
                  </Col>
                  <Col span={8} className="gutter-row">
                    <FormInput
                      type="text"
                      name=""
                      label="Purchase Order Date"
                      disable
                    />
                  </Col>
                  <Col span={8} className="gutter-row">
                    <FormInput
                      type="text"
                      name=""
                      label="Publisher Number"
                      disable
                    />
                  </Col>
                </Row>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col span={8} className="gutter-row">
                    <FormInput
                      type="text"
                      name=""
                      label="Delivery Point"
                      disable
                    />
                  </Col>
                  <Col span={8} className="gutter-row">
                    <FormInput
                      type="text"
                      name=""
                      label="Delivery Date"
                      disable
                    />
                  </Col>
                  <Col span={8} className="gutter-row">
                    <FormInput
                      type="text"
                      name=""
                      label="Remarks"
                      disable
                    />

                  </Col>
                </Row>
              </Form>
            </div>
            <div className="p-2 flex items-center text-[#000] text-sm">
              <table
                border={1}
                style={{
                  borderCollapse: "collapse",
                  borderColor: "#DCDCDC",
                  width: "100%",
                  padding: "20px",
                }}
              >
                <thead className="bg-[#FFFAF0]">
                  <tr>
                    <th className="px-1" style={{ padding: "10px" }}>
                      SL
                    </th>
                    <th>Book Name</th>
                    <th>Published Price</th>
                    <th>Purchase Price</th>
                    <th>Purchase Qty</th>
                    <th>Total Price</th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    className="hover:bg-[#DCDCDC] hover:cursor-default"
                    style={{ padding: "30px" }}
                  >
                    <td>1</td>
                    <td>10001</td>
                    <td>Name : Khadimul</td>
                    <td>QTY : 10</td>
                    <td>1000</td>
                    <td>Cash On </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>10001</td>
                    <td>Name : Khadimul</td>
                    <td>QTY : 10</td>
                    <td>1000</td>
                    <td>Cash On</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>10001</td>
                    <td>Name : Khadimul</td>
                    <td>QTY : 10</td>
                    <td>1000</td>
                    <td>Cash On</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>10001</td>
                    <td>Name : Khadimul</td>
                    <td>QTY : 10</td>
                    <td>1000</td>
                    <td>Cash On</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>10001</td>
                    <td>Name : Khadimul</td>
                    <td>QTY : 10</td>
                    <td>1000</td>
                    <td>Cash On</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>10001</td>
                    <td>Name : Khadimul</td>
                    <td>QTY : 10</td>
                    <td>1000</td>
                    <td>Cash On</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>10001</td>
                    <td>Name : Khadimul</td>
                    <td>QTY : 10</td>
                    <td>1000</td>
                    <td>Cash On</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>10001</td>
                    <td>Name : Khadimul</td>
                    <td>QTY : 10</td>
                    <td>1000</td>
                    <td>Cash On</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>10001</td>
                    <td>Name : Khadimul</td>
                    <td>QTY : 10</td>
                    <td>1000</td>
                    <td>Cash On</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>10001</td>
                    <td>Name : Khadimul</td>
                    <td>QTY : 10</td>
                    <td>1000</td>
                    <td>Cash On</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>10001</td>
                    <td>Name : Khadimul</td>
                    <td>QTY : 10</td>
                    <td>1000</td>
                    <td>Cash On</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>10001</td>
                    <td>Name : Khadimul</td>
                    <td>QTY : 10</td>
                    <td>1000</td>
                    <td>Cash On</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>10001</td>
                    <td>Name : Khadimul</td>
                    <td>QTY : 10</td>
                    <td>1000</td>
                    <td>Cash On</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>10001</td>
                    <td>Name : Khadimul</td>
                    <td>QTY : 10</td>
                    <td>1000</td>
                    <td>Cash On</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default OrderListModal;
