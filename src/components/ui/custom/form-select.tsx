import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
import { SelectOption } from "@/types";
import { Check, ChevronsUpDown } from "lucide-react";
import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";

interface FormSelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  desc?: string;
  isLoading?: boolean;
}

const FormSelect: FC<FormSelectProps> = ({
  name,
  label,
  desc,
  className,
  options,
  disabled,
  isLoading = false,
}) => {
  const [open, setOpen] = useState(false);
  const {
    control,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useFormContext();
  const error = errors[name!]?.message ?? "";

  return (
    <FormField
      control={control}
      name={name!}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <div className="group relative z-0 w-full">
            {/* <FormLabel>{label}</FormLabel> */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    isLoading={isLoading}
                    disabled={disabled}
                    className={cn(
                      "w-full justify-between",
                      !field.value && "text-muted-foreground",
                      error && "border-destructive"
                    )}
                  >
                    {field.value
                      ? options.find((opt) => opt.value === field.value)?.label
                      : `Select ${label}...`}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder={`Search ${label}...`} />
                  <CommandList>
                    <CommandEmpty>No {label} found.</CommandEmpty>
                    <CommandGroup>
                      {options.map((opt) => (
                        <CommandItem
                          value={opt.label}
                          key={opt.value}
                          onSelect={() => {
                            setValue(name!, opt.value);
                            clearErrors(name!);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              opt.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {opt.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormLabel
              htmlFor={`${name}-id`}
              className={cn(
                "bg-background text-foreground peer-placeholder-shown:bg-muted peer-placeholder-shown:text-muted-foreground peer-focus:bg-background peer-focus:text-foreground absolute left-3 top-4 z-10 origin-[0] -translate-y-6 scale-75 transform rounded-sm px-2 text-sm leading-none duration-300 peer-placeholder-shown:-translate-y-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:py-1 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                disabled && "text-muted-foreground opacity-70",
                error &&
                  "text-destructive peer-placeholder-shown:bg-destructive peer-placeholder-shown:text-destructive-foreground"
              )}
            >
              {label}
            </FormLabel>
          </div>
          {desc && <FormDescription>{desc}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSelect;
