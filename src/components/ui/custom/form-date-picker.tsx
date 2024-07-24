"use client";

import { CalendarIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";

interface FormDateProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  desc?: string;
  isLoading?: boolean;
  type?: "date";
}

export function FormDatePicker({
  name,
  label,
  desc,
  value,
  isLoading = false,
  disabled = false,
}: FormDateProps) {
  const {
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useFormContext();
  const error = errors[name!]?.message ?? "";

  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name!}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <Popover modal open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <div className="relative z-0 w-full group">
                  <Button
                    type="button"
                    variant={"outline"}
                    disabled={disabled || isLoading}
                    className={cn(
                      "w-full pl-3 text-left font-normal h-10 peer",
                      !value && "text-muted-foreground"
                    )}
                  >
                    {value ? (
                      format(new Date(value as string), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                  <FormLabel
                    className={cn(
                      "peer-focus:font-medium px-2 absolute text-sm bg-background text-foreground duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 rounded-sm origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-muted peer-placeholder-shown:text-muted-foreground peer-placeholder-shown:-translate-y-2 peer-placeholder-shown:py-1 peer-focus:scale-75 peer-focus:bg-background peer-focus:text-foreground peer-focus:-translate-y-6 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                      disabled && "text-muted-foreground opacity-70",
                      error &&
                        "text-destructive peer-placeholder-shown:bg-destructive peer-placeholder-shown:text-destructive-foreground "
                    )}
                  >
                    {label}
                  </FormLabel>
                </div>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-[99]" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(val) => {
                  if (val) {
                    field.onChange(format(val, "yyyy-MM-dd"));
                    // setValue(name!, format(val, "yyyy-MM-dd"));
                  }
                  setOpen(false);
                }}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {desc && <FormDescription>{desc}</FormDescription>}
          <FormMessage>{error as string}</FormMessage>
        </FormItem>
      )}
    />
  );
}
