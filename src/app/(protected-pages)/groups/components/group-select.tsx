"use client";

import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useGroupContext } from "./group-context";

const FormSchema = z.object({
  groupId: z.coerce.number({
    required_error: "Group is required",
  }),
});

export function GroupSelect() {
  const { groups, currGroup, isGroupLoading, setCurrGroup } = useGroupContext();
  if (isGroupLoading) return <Loader2 className="animate-spin size-4" />;

  function handleChange(val: string) {
    setCurrGroup(Number(val));
  }

  return (
    <Select value={currGroup.toString()} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px] mx-auto">
        <SelectValue placeholder="Curr Group" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="0">Select a group...</SelectItem>
        {groups?.map((g) => (
          <SelectItem key={g.id} value={g.id.toString()}>
            {g.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
