"use client";
import { LoginSchema } from "@/app/auth/zod-schemas";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/custom/form-input";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { loginWithPassword } from "../actions";

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    const resp = await loginWithPassword(values);
    if (resp?.serverError) toast.error(resp.serverError);
    else {
      toast.success("Login successful!");
      router.replace("/dashboard");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormInput name="email" label="Email" type="email" />
        <FormInput name="password" label="Password" type="password" />
        <div className="flex w-full items-center justify-end">
          <Button type="submit" size={"sm"}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
