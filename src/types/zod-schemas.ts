import { siteConfig } from "@/lib/site-config";
import { z } from "zod";

export const NewAccountFormParams = z.object({
  name: z.string().min(4, "Acct Name should have min 4 chars"),
  number: z
    .string()
    .min(2, "Acct Number / MF or Stock Code should have min 2 chars"),
  type: z.enum(siteConfig.acctTypes),
  inv_type: z.enum(siteConfig.invTypes).optional(),
  balance: z.coerce
    .number({
      invalid_type_error: "Balance is required",
    })
    .positive("Should be more than 0"),
  curr_value: z.coerce.number({
    invalid_type_error: "Curr Value is required",
  }),
  bank_id: z.coerce.number({
    invalid_type_error: "Required",
  }),
  //Equity fields
  buy_price: z.coerce.number().optional(),
  curr_price: z.coerce.number().optional(),
  quantity: z.coerce.number().optional(),
  prefix: z.string().optional(),
  //MF Fields
  is_sip: z.boolean().optional(),
  nav: z.coerce.number().optional(),
  units: z.coerce.number().optional(),
});

export const NewAccountFormSchema = NewAccountFormParams.superRefine(
  (data, context) => {
    if (data.type !== "investment" && data.number.length < 4)
      return context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Should be more than 4",
        path: ["number"],
      });
    if (data.type === "investment" && data.curr_value <= 0)
      return context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Should be more than 0",
        path: ["curr_value"],
      });
    if (data.inv_type === "equity" && !data.quantity)
      return context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Should be more than 0",
        path: ["quantity"],
      });
    if (data.inv_type === "equity" && !data.buy_price)
      return context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Should be more than 0",
        path: ["buy_price"],
      });
    if (data.inv_type === "fund" && !data.units)
      return context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Should be more than 0",
        path: ["units"],
      });
  }
);

export const UpdAccountFormSchema = NewAccountFormParams.extend({
  id: z.coerce.number(),
}).superRefine((data, context) => {
  if (data.type !== "investment" && data.number.length < 4)
    return context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Should be more than 4",
      path: ["number"],
    });
  if (data.type === "investment" && data.curr_value <= 0)
    return context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Should be more than 0",
      path: ["curr_value"],
    });
  if (data.inv_type === "equity" && !data.quantity)
    return context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Should be more than 0",
      path: ["quantity"],
    });
  if (data.inv_type === "equity" && !data.buy_price)
    return context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Should be more than 0",
      path: ["buy_price"],
    });
  if (data.inv_type === "fund" && !data.units)
    return context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Should be more than 0",
      path: ["units"],
    });
});

export const NewTxnFormParams = z.object({
  date: z.string({ required_error: "Date is required" }),
  amount: z.coerce
    .number({
      invalid_type_error: "Amount is required",
    })
    .positive("Should be more than 0"),
  description: z.string().optional(),
  type: z.enum(siteConfig.txnTypes),
  category_id: z.coerce.number({
    invalid_type_error: "Required",
  }),
  source_id: z.coerce.number().optional(),
  destination_id: z.coerce.number().optional(),
  group_id: z.coerce.number().optional(),
  //Recurring Fields
  is_recurring: z.boolean().optional(),
  frequency: z.enum(siteConfig.frequency).optional(),
  start_date: z.coerce.string().optional(),
  end_date: z.coerce.string().optional(),
});

export const NewTxnFormSchema = NewTxnFormParams.superRefine(
  (data, context) => {
    if (data.type !== "income" && !data.source_id)
      return context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Required",
        path: ["source_id"],
      });
    if (data.type !== "expense" && !data.destination_id)
      return context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Required",
        path: ["destination_id"],
      });
    if (data.is_recurring && !data.start_date)
      return context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Required",
        path: ["start_date"],
      });
    if (data.is_recurring && !data.frequency)
      return context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Required",
        path: ["frequency"],
      });
  }
);

export const UpdTxnFormSchema = NewTxnFormParams.extend({
  id: z.coerce.number(),
}).superRefine((data, context) => {
  if (data.type !== "income" && !data.source_id)
    return context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Required",
      path: ["source_id"],
    });
  if (data.type !== "expense" && !data.destination_id)
    return context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Required",
      path: ["destination_id"],
    });
  if (data.is_recurring && !data.start_date)
    return context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Required",
      path: ["start_date"],
    });
  if (data.is_recurring && !data.frequency)
    return context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Required",
      path: ["frequency"],
    });
});
