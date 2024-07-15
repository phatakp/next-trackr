"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { loginWithGoogle } from "../actions";

export default function SocialButton() {
  const handleClick = async () => {
    const [, error] = await loginWithGoogle();
    if (error) toast.error(error.message);
  };

  return (
    <Button variant="secondary" className="w-full" onClick={handleClick}>
      Login with Google
    </Button>
  );
}
