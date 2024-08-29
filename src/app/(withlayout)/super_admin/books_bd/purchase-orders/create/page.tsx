"use client";
import Form from "@/components/Forms/Form";
import { IoIosMenu } from "react-icons/io";
import BooksBdButton from "@/components/ui/BooksBdButton";
import { Button, Col, Row, Select } from "antd";
import FormInput from "@/components/Forms/FormInput";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import FormCheckbox from "@/components/Forms/DarazCheckBox";

const CreatePurchaseOrder = () => {
  const PublisherOption = {};
  const options = [{ label: "", value: "" }];
  const onSubmit = () => {};
  return (
    <div style={{ padding: "10px" }}>
      <div className="flex justify-between" style={{ padding: "10px" }}>
        <div>Add New Purchase Order</div>
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
        <Form submitHandler={onSubmit}>
          <div style={{ padding: "0px", marginTop: "12px" }}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={8}
                style={{ marginBottom: "20px", textAlign: "left" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="vdsPurchaserId"
                  label="Purchase Order Number"
                  placeholder="--<New>--"
                  required
                  disable
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{ marginBottom: "20px", textAlign: "left" }}
              >
                <FormDatePicker
                  style={{ width: "100%", textAlign: "left" }}
                  name="vdsPurchaserId"
                  label="Purchase Order Date"
                  required
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{ marginBottom: "20px", textAlign: "left" }}
              >
                <DRZSelectField
                  style={{ width: "100%", textAlign: "left" }}
                  name="vdsPurchaserId"
                  placeholder="--Select Publisher"
                  options={PublisherOption}
                  label="Publisher"
                  required
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{ marginBottom: "20px", textAlign: "left" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="vdsPurchaserId"
                  label="Delivery Point"
                  required
                  disable
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{ marginBottom: "20px", textAlign: "left" }}
              >
                <FormDatePicker
                  style={{ width: "100%", textAlign: "left" }}
                  name="vdsPurchaserId"
                  label="Delivery Date"
                  required
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{ marginBottom: "20px", textAlign: "left" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="vdsPurchaserId"
                  label="Total Purchase Qty"
                  required
                  disable
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{ marginBottom: "20px", textAlign: "left" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="vdsPurchaserId"
                  label="Total Purchase Price"
                  required
                  disable
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{ marginBottom: "20px", textAlign: "left" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="vdsPurchaserId"
                  label="Remarks"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{ marginBottom: "20px", textAlign: "left" }}
              >
                <FormCheckbox
                  name="isClosed"
                  label="Closed:"
                  options={options}
                ></FormCheckbox>
              </Col>

              <Col
                className="gutter-row"
                span={8}
                style={{ marginBottom: "20px", textAlign: "left" }}
              >
                <Select
                  style={{
                    width: "100%",
                  }}
                  size="large"
                  showSearch
                  placeholder="--Select Publisher--"
                  //   onChange={(value) =>
                  //     handleSelectChangeCertificate(value, index)
                  //   }
                  options={PublisherOption}
                  //   onSearch={onSearch}
                  //   filterOption={filterOption}
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{ marginBottom: "20px", textAlign: "left" }}
              >
               <Button    className="flex items-center border-[#0abb75] bg-[#0abb75] text-white" style={{paddingTop:"17px", paddingBottom:"17px"}}
            size="middle" >+ Add</Button>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreatePurchaseOrder;
