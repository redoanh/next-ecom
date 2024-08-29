import * as yup from "yup";

export const treasuaryChallan = yup.object().shape({
  treasuryChallanNo: yup.string().required("Treasury Challan No is required"),
  vatCodeId: yup.string().required("Vat Code is required"),
  tcAmount: yup
    .number()
    .positive("Treasury Amount must be greater than 0")
    .required("Treasury Amount is required"),
  bankBrunchId: yup.string().required("Bank Brnach Name is required"),
  bankId: yup.string().required("Bank Name is required"),
  // vatMonthId: yup.string().required("VAT Month is required"),
  // transactionDate: yup.date().required("VAT Month is required"),
});
