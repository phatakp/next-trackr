"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import { InputWithLabel } from "./input-with-label";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  desc?: string;
  isLoading?: boolean;
}

const FormInput: FC<FormInputProps> = ({
  name,
  type,
  value,
  label,
  desc,
  className,
  onChange,
  disabled,
  isLoading = false,
  ...props
}) => {
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext();
  const errorMsg = errors[name!]?.message ?? "";

  return (
    <FormField
      control={control}
      name={name!}
      render={({ field }) => {
        const { value: fvalue, onChange: fChange } = field;
        return (
          <FormItem
            className={cn(
              "animate-in zoom-in-95 fade-in-0 slide-in-from-left-2 duration-500",
              type === "hidden" ? "w-0" : "w-full",
              className
            )}
          >
            <FormControl>
              <InputWithLabel
                name={name}
                label={label}
                type={type}
                value={value ?? fvalue}
                onChange={onChange ?? fChange}
                disabled={disabled ?? isSubmitting ?? isLoading}
                placeholder={" "}
                error={!!errorMsg}
                {...props}
              />
              {/* <div className="group relative z-0 w-full">
                <Input
                  type={type}
                  value={value ?? fvalue}
                  onChange={onChange ?? fChange}
                  className={cn(
                    "peer h-10",
                    error &&
                      "border-destructive text-destructive focus-visible:border-input focus-visible:text-foreground focus-visible:ring-0",
                    !value && error && "focus-visible:ring-destructive",
                    className
                  )}
                  disabled={disabled ?? isSubmitting ?? isLoading}
                  placeholder={" "}
                  {...props}
                />
                <FormLabel
                  className={cn(
                    "bg-background text-foreground peer-placeholder-shown:bg-muted peer-placeholder-shown:text-muted-foreground peer-focus:bg-background peer-focus:text-foreground absolute left-3 top-4 z-10 origin-[0] -translate-y-6 scale-75 transform rounded-sm px-2 text-sm leading-none duration-300 peer-placeholder-shown:-translate-y-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:py-1 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                    disabled && "text-muted-foreground opacity-70",
                    error &&
                      "text-destructive peer-placeholder-shown:bg-destructive peer-placeholder-shown:text-destructive-foreground",
                    type === "hidden" && "hidden"
                  )}
                >
                  {label}
                </FormLabel>
                <FormMessage
                  className={cn(
                    "peer pt-1 peer-focus-within:hidden peer-focus:hidden peer-focus-visible:hidden"
                  )}
                >
                  {error as string}
                </FormMessage>
              </div> */}
            </FormControl>
            {desc && <FormDescription>{desc}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default FormInput;
