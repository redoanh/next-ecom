import React, { useState } from "react";
import { Button, Modal } from "antd";
import Form from "@/components/Forms/Form";
import { Col, Row, Select, message } from "antd";
import FormInput from "../Forms/FormInput";
import BooksBdButton from "../ui/BooksBdButton";

const InvoiceModal = ({ isModalOpen, handleOk, handleCancel, tableTitle }: any) => {
  const onSubmit = () => {};
  return (
    <>
      <div>
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}

          footer={(_, { OkBtn, CancelBtn }) => (
            <>
            <div className="flex items-center justify-end  mt-5 ">
                <div className="m-2 py-1" ><BooksBdButton to={`#`} style={{padding:"20px"}}>Submit</BooksBdButton></div>
                <div ><CancelBtn /></div>
            
            
            </div>
             
             
            </>
          )}
  

        >
            <div className="font-bold text-xl text-[#16a34a] text-center p-3 pb-5">
            <span>{tableTitle}</span>
            </div>
          <Form submitHandler={onSubmit}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={10}
                style={{
                  marginBottom: "20px",
                  justifyContent: "space-between",
                  marginLeft: "10px",
                }}
              >
                <FormInput
                  type="text"
                  label="Name: "
                  name=""
                  placeholder="Enter Name"
                  onChange={(e) => e.target.value}
                  style={{
                    width: "100%",
                  }}
                  required
                />
              </Col>
              <Col
                className="gutter-row"
                span={10}
                style={{
                  marginBottom: "20px",
                  justifyContent: "space-between",
                  marginLeft: "10px",
                }}
              >
                <FormInput
                  type="text"
                  label="Email: "
                  name=""
                  placeholder="Enter Email"
                  onChange={(e) => e.target.value}
                  style={{
                    width: "100%",
                  }}
                required
                />
              </Col>
              <Col
                className="gutter-row"
                span={10}
                style={{
                  marginBottom: "20px",
                  justifyContent: "space-between",
                  marginLeft: "10px",
                }}
              >
                <FormInput
                  type="text"
                  label="Phone: "
                  name=""
                  placeholder="Enter Phone"
                  onChange={(e) => e.target.value}
                  style={{
                    width: "100%",
                  }}
                  required
                />
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default InvoiceModal;
