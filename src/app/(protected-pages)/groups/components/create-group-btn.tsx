import {
  ModalButton,
  ModalContent,
  ModalWrapper,
} from "@/components/ui/custom/modal-wrapper";
import { ReactNode } from "react";
import GroupForm from "./group-form";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function CreateGroupBtn({ className, children }: Props) {
  return (
    <ModalWrapper>
      <ModalButton className={className}>{children}</ModalButton>
      <ModalContent
        title="Add New Group"
        description="Enter details for new group"
      >
        <GroupForm />
      </ModalContent>
    </ModalWrapper>
  );
}
