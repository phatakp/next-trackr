import { Button } from "@/components/ui/button";
import { loginWithGoogle } from "../actions";

export default function SocialButton() {
  return (
    <form action={loginWithGoogle}>
      <Button variant="secondary" className="w-full" type="submit">
        Login with Google
      </Button>
    </form>
  );
}
