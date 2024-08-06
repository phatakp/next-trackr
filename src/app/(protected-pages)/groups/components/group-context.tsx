"use client";

import { getUserGroups } from "@/server/groups.actions";
import { Group } from "@/types";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type GroupContextProps = {
  isGroupLoading: boolean;
  groups: Group[] | undefined;
  currGroup: number;
  setCurrGroup: Dispatch<SetStateAction<number>>;
};

const GroupContext = createContext({} as GroupContextProps);

export default function GroupProvider({ children }: { children: ReactNode }) {
  const { data: groups, isLoading } = useQuery({
    queryKey: ["user-groups"],
    queryFn: async () => await getUserGroups(),
  });
  const [currGroup, setCurrGroup] = useState<number>(0);

  useEffect(() => {
    if (groups?.data && groups.data.length > 0) setCurrGroup(groups.data[0].id);
  }, [groups?.data]);

  return (
    <GroupContext.Provider
      value={{
        groups: groups?.data,
        isGroupLoading: isLoading,
        currGroup,
        setCurrGroup,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
}

export function useGroupContext() {
  const context = useContext(GroupContext);
  if (!context) throw new Error("Group Context not used with a provider");
  return context;
}
