import * as yup from "yup";

export const lastMonthClosingSchema = yup.object().shape({
    transactionDate: yup.string().required("Transaction Date is required"),
    lastMonthClosingBalanceVat: yup.number().min(0, "LMC VAT Amount can not be negative").typeError('LMC VAT Amount should be number').required("LMC VAT Amount is required"),
    lastMonthClosingBalanceSd: yup.number().min(0, "LMC SD Amount can not be negative").typeError('LMC SD Amount should be number').required("LMC SD Amount is required"),
});