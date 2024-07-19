import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteConfig } from "@/lib/site-config";
import type { AcctType, FullAccount } from "@/types";
import AcctForm from "./acct-form";

export default function NonInvestmentFormWrapper({
  type,
  acct,
}: {
  type: AcctType;
  acct?: FullAccount;
}) {
  return (
    <Tabs defaultValue={type ?? "savings"} className="w-full space-y-8">
      <TabsList>
        {siteConfig.acctTypes
          .filter((t) => t !== "investment")
          .map((t) => (
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
      <TabsContent value={"savings"}>
        <AcctForm type={"savings"} acct={acct} />
      </TabsContent>
      <TabsContent value={"credit-card"}>
        <AcctForm type={"credit-card"} acct={acct} />
      </TabsContent>
      <TabsContent value={"wallet"}>
        <AcctForm type={"wallet"} acct={acct} />
      </TabsContent>
      <TabsContent value={"mortgage"}>
        <AcctForm type={"mortgage"} acct={acct} />
      </TabsContent>
    </Tabs>
  );
}
