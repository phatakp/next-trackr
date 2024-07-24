"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/media-query";
import { cn } from "@/lib/utils";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type ModalContextProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalContext = createContext({} as ModalContextProps);

function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Modal not used within Modal Context");

  const { open, setOpen } = context;
  return { modalOpen: open, setModalOpen: setOpen };
}

const ModalWrapper = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          {children}
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          {children}
        </Drawer>
      )}
    </ModalContext.Provider>
  );
};

const ModalButton = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop)
    return (
      <DialogTrigger asChild className={cn(className)}>
        {children}
      </DialogTrigger>
    );
  return (
    <DrawerTrigger asChild className={cn(className)}>
      {children}
    </DrawerTrigger>
  );
};

const ModalContent = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop)
    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    );
  return (
    <DrawerContent>
      <DrawerHeader className="text-left">
        <DrawerTitle className="capitalize">{title}</DrawerTitle>
        <DrawerDescription>{description}</DrawerDescription>
      </DrawerHeader>
      <div className="px-4">{children}</div>
      <DrawerFooter className="pt-2">
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
};

export { ModalButton, ModalContent, ModalWrapper, useModalContext };
