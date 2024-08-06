"use client";

import { getUsers } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/custom/form-input";
import { useModalContext } from "@/components/ui/custom/modal-wrapper";
import { Form, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createGroup } from "@/server/groups.actions";
import { NewGroupSchema } from "@/types/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2, Plus, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useGroupContext } from "./group-context";

export default function GroupForm() {
  const { setModalOpen } = useModalContext();
  const { setCurrGroup } = useGroupContext();
  const [user, setUser] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const { data: profiles, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const form = useForm<z.infer<typeof NewGroupSchema>>({
    resolver: zodResolver(NewGroupSchema),
    defaultValues: {
      name: "",
      users: [],
    },
  });

  const { name, users } = form.watch();

  const { mutateAsync: createGrpAction, status: createStatus } = useMutation({
    mutationFn: createGroup,
    onError: (err) => toast.error(err.message),
    onSuccess: () => setModalOpen(false),
  });

  async function onSubmit(values: z.infer<typeof NewGroupSchema>) {
    const resp = await createGrpAction(values);
    if (!resp.error && resp.data) {
      setCurrGroup(resp.data);
      toast.success("Group created successfully!");
    }
  }

  function handleChange(val: string) {
    form.setValue("users", [...users, val]);
    setIsClicked(false);
  }

  if (isLoading) return <Loader2 className="animate-spin size-4" />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormInput name="name" label="Group Name" value={name} />
        <div className="grid w-full gap-4">
          <FormLabel>Users</FormLabel>
          {users?.map((u) => (
            <div key={u} className="flex items-center gap-3">
              <Button size={"icon"} variant={"destructive"} type="button">
                <X className="size-4" />
              </Button>
              <Input value={u} disabled />
            </div>
          ))}
          <div className="flex items-center gap-3">
            <Button
              type="button"
              size={"icon"}
              onClick={() => setIsClicked((prev) => !prev)}
              variant={isClicked ? "destructive" : "default"}
            >
              {isClicked ? (
                <X className="size-4" />
              ) : (
                <Plus className="size-4" />
              )}
            </Button>
            {isClicked && (
              <Select value={user} onValueChange={handleChange}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select user..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Select a user...</SelectItem>
                  {profiles?.map((g) => (
                    <SelectItem key={g.id} value={g.id}>
                      {g.first_name} {g.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
}
