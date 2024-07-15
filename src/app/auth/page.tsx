import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./components/login-form";
import SignUpForm from "./components/signup-form";
import SocialButton from "./components/social-button";

export default function LoginPage() {
  return (
    <Tabs defaultValue="login" className="w-full md:max-w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <div className="grid gap-4 py-4">
          <div className="grid gap-2 md:text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-muted-foreground text-sm md:text-balance">
              Use your Google account or enter Email to login to your account
            </p>
          </div>
          <div className="space-y-8">
            <SocialButton />

            <div className="relative h-0.5 bg-muted w-full rounded">
              <span className="text-sm absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 sm:px-4 text-muted-foreground">
                or continue with
              </span>
            </div>

            <LoginForm />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="signup">
        <div className="grid gap-4 py-4">
          <div className="grid gap-2 md:text-center">
            <h1 className="text-3xl font-bold">User Registration</h1>
            <p className="text-muted-foreground text-sm md:text-balance">
              Use your Google account or enter details to create your account
            </p>
          </div>
          <div className="space-y-8">
            <SocialButton />

            <div className="relative h-0.5 bg-muted w-full rounded">
              <span className="text-sm absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 sm:px-4 text-muted-foreground">
                or continue with
              </span>
            </div>

            <SignUpForm />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
