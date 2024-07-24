import { AmountField } from "@/components/common/amt-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  value: number;
  returns: number;
  returnText: string;
  className?: string;
};

export default function StatCard({
  title,
  value,
  returns,
  returnText,
  className,
}: Props) {
  return (
    <>
      <Card className={cn("hidden sm:block", className)}>
        <CardHeader className="pb-3">
          <CardDescription>{title}</CardDescription>
          <CardTitle>
            <AmountField amount={value} className="text-4xl justify-start" />
          </CardTitle>
        </CardHeader>
        <CardContent className="py-0 pb-1">
          <div className="text-xs text-muted-foreground">
            {`${returns.toFixed()}% ${returnText}`}
          </div>
        </CardContent>
        <CardFooter>
          <Progress
            value={returns}
            aria-label={`${returns.toFixed()}% ${returnText}`}
          />
        </CardFooter>
      </Card>

      <Card className="flex items-center justify-between gap-4 sm:hidden  p-4">
        <div className="grid gap-1 w-full">
          <span className="text-sm text-muted-foreground">{title}</span>
          <Progress
            value={returns}
            aria-label={`${returns.toFixed()}% ${returnText}`}
          />
          <div className="text-xs text-muted-foreground">
            {`${returns.toFixed()}% ${returnText}`}
          </div>
        </div>
        <div className="grid gap-1">
          <AmountField amount={value} className="justify-end" />
        </div>
      </Card>
    </>
  );
}
