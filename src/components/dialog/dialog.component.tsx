"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { DialogType } from "./dialog.context";

export function DialogComponent({
  isOpen,
  type,
  message,
  defaultValue,
  onClose,
}: {
  isOpen: boolean;
  type: DialogType;
  message: string;
  defaultValue: string;
  onClose: (value: any) => void;
}) {
  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose(type === "prompt" ? inputValue : true);
  };

  const title = useMemo(() => {
    switch (type) {
      case "alert":
        return "Attention required!";
      case "confirm":
        return "Please confirm";
      case "prompt":
        return "User input required";
    }
  }, [type]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open: boolean) =>
        !open && onClose(type === "confirm" ? false : null)
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {title}
          </DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {type === "prompt" && (
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter your response"
            />
          )}
          <DialogFooter className="mt-4">
            {type !== "alert" && (
              <Button
                type="button"
                variant="outline"
                onClick={() => onClose(false)}
              >
                Cancel
              </Button>
            )}
            <Button type="submit">OK</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
