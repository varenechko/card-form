import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import * as zod from "zod";
import { luhnCheck } from "../utils/luhn";

dayjs.extend(customParseFormat);

export const CardFormSchema = zod.object({
  number: zod
    .string()
    .min(19, {
      message: "Incorrect card number",
    })
    .max(22, {
      message: "Incorrect card number",
    })
    .refine((val) => luhnCheck(val.replace(/\s/g, "")), {
      message: "Incorrect card number",
    }),
  expirationDate: zod
    .string()
    .regex(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/)
    .refine((val) => dayjs(val, "MM/YY").isAfter(dayjs(), "month"), {
      message: "Outdated date",
    }),
  securityCode: zod
    .string()
    .min(3, {
      message: "Invalid",
    })
    .max(4, {
      message: "Invalid",
    }),
  name: zod.string().max(25, {
    message: "The name should be 25 characters long",
  }),
});
