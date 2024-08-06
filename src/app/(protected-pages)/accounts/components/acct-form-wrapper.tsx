import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteConfig } from "@/lib/site-config";
import { AcctType, FullAccount, InvestmentType } from "@/types";
import AcctForm from "./acct-form";

export default function AcctFormWrapper({
  type,
  invType,
  acct,
}: {
  type: AcctType;
  invType?: InvestmentType | undefined;
  acct?: FullAccount;
}) {
  return (
    <Tabs defaultValue={!invType ? type : invType} className="w-full space-y-8">
      <TabsList>
        {type === "investment"
          ? siteConfig.invTypes.map((t) => (
              <TabsTrigger
                key={t}
                value={t}
                className="capitalize"
                disabled={!!acct}
              >
                {t}
              </TabsTrigger>
            ))
          : siteConfig.acctTypes
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
      {siteConfig.acctTypes
        .filter((t) => t !== "investment")
        .map((opt) => (
          <TabsContent key={opt} value={opt}>
            <AcctForm type={opt} acct={acct} />
          </TabsContent>
        ))}
      {siteConfig.invTypes.map((opt) => (
        <TabsContent key={opt} value={opt}>
          <AcctForm type={"investment"} invType={opt} acct={acct} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
