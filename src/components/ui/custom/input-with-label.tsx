import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

export interface InputWithLabelProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
}

const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ className, name, error, value, disabled, label, type, ...props }, ref) => {
    return (
      <div className="group relative z-0 w-full">
        <Input
          type={type}
          name={name}
          id={`${name}-id`}
          className={cn(
            "peer h-10",
            error &&
              "border-destructive text-destructive focus-visible:border-input focus-visible:text-foreground focus-visible:ring-0",
            !value && error && "focus-visible:ring-destructive",
            className
          )}
          value={value}
          disabled={disabled}
          placeholder={" "}
          {...props}
        />
        <Label
          htmlFor={`${name}-id`}
          className={cn(
            "bg-background text-foreground peer-placeholder-shown:bg-muted peer-placeholder-shown:text-muted-foreground peer-focus:bg-background peer-focus:text-foreground absolute left-3 top-4 z-10 origin-[0] -translate-y-6 scale-75 transform rounded-sm px-2 text-sm leading-none duration-300 peer-placeholder-shown:-translate-y-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:py-1 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            disabled && "text-muted-foreground opacity-70",
            error &&
              "text-destructive peer-placeholder-shown:bg-destructive peer-placeholder-shown:text-destructive-foreground",
            type === "hidden" && "hidden"
          )}
        >
          {label}
        </Label>
      </div>
    );
  }
);
InputWithLabel.displayName = "InputWithLabel";

export { InputWithLabel };

// type Props = InputHTMLAttributes<HTMLInputElement> & {
//   className?: string;
//   label: string;
//   error?: boolean;
// };
// export default function InputWithLabel({
//   name,
//   type,
//   label,
//   className,
//   disabled,
//   error,
//   value,
//   ...props
// }: Props) {
//   return (
//     <div className="group relative z-0 w-full">
//       <Input
//         type={type}
//         name={name}
//         id={`${name}-id`}
//         className={cn(
//           "peer h-10",
//           error &&
//             "border-destructive text-destructive focus-visible:border-input focus-visible:text-foreground focus-visible:ring-0",
//           !value && error && "focus-visible:ring-destructive",
//           className
//         )}
//         placeholder={" "}
//         {...props}
//       />
//       <Label
//         htmlFor={`${name}-id`}
//         className={cn(
//           "bg-background text-foreground peer-placeholder-shown:bg-muted peer-placeholder-shown:text-muted-foreground peer-focus:bg-background peer-focus:text-foreground absolute left-3 top-4 z-10 origin-[0] -translate-y-6 scale-75 transform rounded-sm px-2 text-sm leading-none duration-300 peer-placeholder-shown:-translate-y-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:py-1 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
//           disabled && "text-muted-foreground opacity-70",
//           error &&
//             "text-destructive peer-placeholder-shown:bg-destructive peer-placeholder-shown:text-destructive-foreground",
//           type === "hidden" && "hidden"
//         )}
//       >
//         {label}
//       </Label>
//     </div>
//   );
// }
