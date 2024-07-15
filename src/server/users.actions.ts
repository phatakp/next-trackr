import { protectedProcedure } from "@/lib/zsa";
import {
  checkCashAcctExistsForUser,
  createCashAcctForUser,
} from "./accounts.actions";
import { getBankForCashAcct } from "./banks.actions";

export const syncUser = protectedProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    // Get Bank ID for Cash
    const [bankId, error] = await getBankForCashAcct();
    if (error) throw error.message;
    if (!bankId) throw "Bank not found";

    //Check Cash Account exists for user
    const [acct, err] = await checkCashAcctExistsForUser(bankId);
    if (err) throw err.message;

    if (!acct) {
      const [, error] = await createCashAcctForUser(bankId);
      if (error) throw error.message;
    }
  });
