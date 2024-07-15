"use client";
import { RegisterSchema } from "@/app/auth/zod-schemas";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/custom/form-input";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { register } from "../actions";

export default function SignUpForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      password2: "",
    },
  });

  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    const [, error] = await register(values);
    if (error) toast.error(error.message);
    else {
      toast.success("Please check your email");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormInput name="name" label="Name" />
        <FormInput name="email" label="Email" type="email" />
        <FormInput name="password" label="Password" type="password" />
        <FormInput name="password2" label="Confirm" type="password" />
        <div className="flex w-full items-center justify-end">
          <Button type="submit" size={"sm"}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
