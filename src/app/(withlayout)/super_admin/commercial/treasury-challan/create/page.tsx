/* eslint-disable react/no-unescaped-entities */
"use client";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import DarazCommonRedirectButton from "@/components/ui/DarazCommonRedirectButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Input, Row, message, Select } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as yup from "yup";
import {
  useTreasuryChallanDropDownQuery,
  useAddTreasuryChallanMutation,
  useVatMonthQuery,
  useGetSingleBankQuery,
  useGetVatCodeDetailQuery,
} from "@/redux/api/commercialApi/treasuryChallanApi";
import Loading from "@/app/loading";
import { treasuaryChallan } from "@/schemas/treasuryChallanSchema";
import { useRouter } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";

const CreateTreasury = () => {
  //Sates
  const [isPaidChecked, setIsPaidChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetForm, setResetForm] = useState(false);

  // get bank branch  data

  const [bankId, setBankId] = useState("");

  //Vat Code Details
  const [vatCodeId, setVatCodeId] = useState("");

  const router = useRouter();

  const [addTreasury] = useAddTreasuryChallanMutation();

  //All Drop Down
  const { data: datasource } = useTreasuryChallanDropDownQuery({
    ...{},
  });
  // console.log(datasource, "source");

  const [selectedDate, setSelectedDate] = useState<any>(
    dayjs().format("YYYY-MM-DD")
  );
  const { data: vdsDate, error: vdsError } = useVatMonthQuery(selectedDate);
  const [trasactionDate, setTrasactionDate] = useState("");

  //Sending same date pattern as api
  const handleDateChange = (value: Dayjs | null) => {
    const selectedDate = new Date(value);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    console.log("Selected Date:", formattedDate);
    setSelectedDate(formattedDate);
    setTrasactionDate(value ? value.format("YYYY-MM-DD") : "");
  };

  const vatMonthData = vdsDate?.result?.vatMonth;
  const names = vatMonthData
    ? vatMonthData.map((item: { name: string }) => item.name).join(", ")
    : "";

  console.log("Selected Date:", selectedDate);
  console.log("VAT Month Data:", vatMonthData);

  //Bank Name Drop down function
  const bankOptions =
    datasource &&
    datasource?.result?.bankType?.map((treasurychallan: any) => {
      return {
        label: treasurychallan?.name,
        value: parseInt(treasurychallan?.id),
      };
    });

  const handleSelectChange = (value: any) => {
    setBankId(value);
  };

  const { data: bankBranch } = useGetSingleBankQuery(bankId);

  // Bank Branch Options
  const [branchOptions, setBranchOptions] = useState([]);

  useEffect(() => {
    // Update branchOptions when bankBranch changes
    if (bankBranch && bankBranch.result && bankBranch.result?.bankBranchInfos) {
      const mappedOptions = bankBranch.result.bankBranchInfos.map(
        (options: any) => ({
          label: options?.bankBranchName,
          value: options?.id,
        })
      );

      // Update the state with the mapped options
      setBranchOptions(mappedOptions);
    }
  }, [bankId, bankBranch]);

  //Supplier Name Drop down function
  const commisionearateNameOptions =
    datasource &&
    datasource?.result?.commissionarateType?.map((treasurychallan: any) => {
      return {
        label: treasurychallan?.name,
        value: parseInt(treasurychallan?.id),
      };
    });

  //Vat Code Drop down function
  const vatCodeOptions =
    datasource &&
    datasource?.result?.vatCode?.map((treasurychallan: any) => {
      return {
        label: treasurychallan?.name,
        value: parseInt(treasurychallan?.id),
      };
    });

  const { data: vatCodeDetails } = useGetVatCodeDetailQuery(vatCodeId);

  const vatCodeDetailsData = vatCodeDetails?.result?.name;

  console.log(vatCodeDetailsData, "Vat Code Details Data");

  const handleVatCodeDetails = (value: any) => {
    setVatCodeId(value);
  };

  const [publishDate, setPublishDate] = useState(dayjs().format("YYYY-MM-DD"));

  const selectPublishDate = (value: Dayjs | null) => {
    setPublishDate(value ? value.format("YYYY-MM-DD") : "");
  };

  // submit handler
  const onSubmit = async (values: any) => {
    values.vatMonthId = vatMonthData
      ?.map((item: { id: number }) => item.id)
      .join(", ");
    values.tcAcctItemId = vatCodeDetails?.result?.id;
    values.transactionDate = dayjs(selectedDate).format("YYYY-MM-DD");
    values.treasuryChallanDate = dayjs(publishDate).format("YYYY-MM-DD");
    values.storeId = 8;

    try {
      console.log("Submitted Data", values);
      setLoading(true);
      const res = await addTreasury(values);

      if ("data" in res && res.data && res.data.result) {
        message.success("Treasury Challan Created Successfully!");
        router.push(
          `/super_admin/commercial/treasury-challan/view/${res?.data?.result?.id}`
        );
        setLoading(false);
      } else {
        // Handle API errors or validation errors
        message.error(
          "Failed to Create Treasury. Please check the data and try again."
        );
      }
    } catch (err: any) {
      console.error(err.message);
      // Handle other errors (e.g., network issues)
      message.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  //Remarks Functions

  const [remarks, setRemarks] = useState("");

  const handleChange = (e: any) => {
    const newValue = e.target.value;

    if (newValue.length < 50) {
      setRemarks(newValue);
    } else {
      message.error("Remarks cannot exceed 50 characters");
    }
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const handleResetForm = () => {
    setResetForm(true);
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <div style={{ padding: "10px" }}>
      <UMBreadCrumb
        pageName="Treasury Challan"
        lastName="Create"
        link={"/super_admin/commercial/treasury-challan"}
      />
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
        <Form
          resolver={yupResolver(treasuaryChallan)}
          submitHandler={onSubmit}
          restore={resetForm}
          handleReset={() => setResetForm(false)}
        >
          <div style={{ padding: "0px", marginTop: "12px" }}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="number"
                  name="transactionID"
                  label="Transaction ID:"
                  value={"***</NEW/>***"}
                  disable
                  placeholder="***</NEW/>***"
                  required
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                }}
              >
                <FormDatePicker
                  name=""
                  value={trasactionDate ? dayjs(trasactionDate) : null}
                  label="Transaction Date:"
                  onChange={(value) => handleDateChange(value)}
                  size="large"
                  required
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <>
                  <FormInput
                    style={{ width: "100%", textAlign: "left", color: "black" }}
                    name="vatMonthId"
                    value={names}
                    label="VAT Month:  "
                    placeholder="VAT Month"
                    required
                    disable
                  />
                  {selectedDate && vatMonthData === undefined && (
                    <div style={{ color: "red", marginBottom: "10px" }}>
                      Transaction Date hasn't any VAT Month!
                    </div>
                  )}
                </>
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <DRZSelectField
                  style={{ width: "100%", textAlign: "left" }}
                  name="bankId"
                  options={bankOptions}
                  label="Bank Name/MFS: "
                  placeholder="--SELECT Bank--"
                  onChange={(value) => {
                    handleSelectChange(value);
                  }}
                  required
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <DRZSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="bankBrunchId"
                  label="Bank Branch Name:"
                  placeholder="--SELECT Bank Branch--"
                  onSearch={onSearch}
                  options={branchOptions}
                  required
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormDatePicker
                  name=""
                  value={publishDate ? dayjs(publishDate) : null}
                  onChange={(value) => selectPublishDate(value)}
                  label="Treasury Challan Date:"
                  size="large"
                  required
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="treasuryChallanNo"
                  label="Treasury Challan No:"
                  placeholder="Treasury Challan No"
                  required
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <DRZSelectField
                  style={{ width: "100%", textAlign: "left" }}
                  name="commissionerateId"
                  options={commisionearateNameOptions}
                  label="Name Of Commisionerate:"
                  required
                  placeholder="--SELECT Name--"
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <DRZSelectField
                  style={{ width: "100%", textAlign: "left" }}
                  name="vatCodeId"
                  options={vatCodeOptions}
                  label="VAT Code:"
                  required
                  placeholder="--SELECT Code--"
                  onChange={handleVatCodeDetails}
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left", color: "black" }}
                  type="text"
                  name=""
                  value={vatCodeDetailsData}
                  label="VAT Code Details: "
                  placeholder="VAT code details"
                  required
                  disable
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="number"
                  name="tcAmount"
                  label="Treasury Amount: "
                  placeholder="Input (Total Payable VAT)"
                  required
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  label="Remarks:"
                  type="text"
                  name="remarks"
                  value={remarks}
                  onChange={handleChange}
                  placeholder="Remarks...."
                />
              </Col>
            </Row>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginTop: "20px" }}
              >
                <input
                  type="checkbox"
                  id="paidCheckbox"
                  checked={isPaidChecked}
                  onChange={(e) => setIsPaidChecked(e.target.checked)}
                />
                <label
                  htmlFor="paidCheckbox"
                  style={{ marginLeft: "10px", fontWeight: "bold" }}
                >
                  Paid
                </label>
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginTop: "10px" }}
              >
                <Button
                  disabled={!isPaidChecked}
                  style={{
                    color: isPaidChecked ? "#ffffff" : "#8c8c8c",
                    backgroundColor: isPaidChecked ? "#1890ff" : "#f5f5f5",
                    cursor: isPaidChecked ? "pointer" : "not-allowed",
                  }}
                >
                  Make Payment
                </Button>
              </Col>
            </Row>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "end",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                gap: "10px",
              }}
            >
              <Link href={`/super_admin/commercial/treasury-challan`}>
                {" "}
                <DarazCommonCloseButton>Close</DarazCommonCloseButton>
              </Link>
              <button
                className={`text-white py-2 px-4 rounded shadow-md hover:shadow-lg hover:bg-[#363434] bg-[#b9aba4] cursor-pointer focus:outline-none font-medium text-sm text-center border-none`}
                onClick={handleResetForm}
              >
                Reset
              </button>
              <DarazCommonButton>Save</DarazCommonButton>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateTreasury;
