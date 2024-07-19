import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteConfig } from "@/lib/site-config";
import { FullAccount, InvestmentType } from "@/types";
import AcctForm from "./acct-form";

export default function InvestmentFormWrapper({
  invType,
  acct,
}: {
  invType: InvestmentType;
  acct?: FullAccount;
}) {
  return (
    <Tabs defaultValue={invType ?? "fund"} className="w-full space-y-8">
      <TabsList>
        {siteConfig.invTypes.map((t) => (
          <TabsTrigger
            key={t}
            value={t}
            className="capitalize"
            disabled={!!acct}
          >
            {t}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={"equity"}>
        <AcctForm type={"investment"} invType={"equity"} acct={acct} />
      </TabsContent>
      <TabsContent value={"fund"}>
        <AcctForm type={"investment"} invType={"fund"} acct={acct} />
      </TabsContent>
      <TabsContent value={"fd"}>
        <AcctForm type={"investment"} invType={"fd"} acct={acct} />
      </TabsContent>
    </Tabs>
  );
}
