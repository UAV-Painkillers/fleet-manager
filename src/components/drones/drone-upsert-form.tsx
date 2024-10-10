"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageInput } from "../image-input";
import {
  Drone,
  Frame,
  FullDroneSelectStatement,
} from "@/types/supabase-custom";
import { FrameSelect } from "./frames/frame-select";
import { useDialog } from "@/components/dialog";
import { useFileUpload } from "@/hooks/use-image-upload";
import { createDroneAction } from "./drone-upsert-form.actions";

type DroneUpsertFormProps = {
  onCreateSuccess?: (drone: Drone) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DroneUpsertForm({
  open,
  onOpenChange,
  onCreateSuccess,
}: DroneUpsertFormProps) {
  const [showNewFrameForm, setShowNewFrameForm] = useState(false);
  const { confirm, alert } = useDialog();
  const uploadFile = useFileUpload("cdn");

  const [nickname, setNickname] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [selectedFrameId, setSelectedFrameId] = useState<Frame["id"] | null>(
    null
  );

  const createDrone = useCallback(
    async (imagePath?: string) => {
      if (!selectedFrameId) {
        return;
      }

      const { drone, error } = await createDroneAction({
        nickname,
        frameId: selectedFrameId,
        imagePath,
      });

      if (error) {
        alert(
          "Oh no! Something went wrong while creating your drone. (" +
            error.message +
            ")"
        );
        console.error(error);
        return false;
      }

      return drone;
    },
    [selectedFrameId, nickname, alert]
  );

  const uploadDroneImage = useCallback(async () => {
    if (!image) {
      return;
    }

    const fullFilePath = await uploadFile(image, {
      path: "drones",
      upsert: true,
    });
    return fullFilePath;
  }, [image, uploadFile]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const fileId = await uploadDroneImage();
      const drone = await createDrone(fileId);

      if (!drone) {
        return;
      }

      if (typeof onCreateSuccess === "function") {
        onCreateSuccess(drone);
      }
    },
    [uploadDroneImage, createDrone, onCreateSuccess]
  );

  // check if there are changes to the form and close the dialog if there are
  // otherwise ask the user if he wants to discard the changes
  const handleClosing = useCallback(async () => {
    const isChanged =
      nickname !== "" || image !== null || selectedFrameId !== null;

    if (isChanged) {
      const isConfirmed = await confirm("Do you want to discard the changes?");
      if (!isConfirmed) {
        return;
      }
    }

    onOpenChange(false);
  }, [confirm, image, nickname, selectedFrameId]);

  useEffect(() => {
    if (!open) {
      return;
    }

    setNickname("");
    setImage(null);
    setSelectedFrameId(null);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleClosing}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upsert Drone</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nickname">Nickname (optional)</Label>
            <Input
              id="nickname"
              name="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Frame</Label>
            <FrameSelect
              onValueChange={setSelectedFrameId}
              value={selectedFrameId}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <ImageInput onChange={setImage} />
          </div>
          <Button type="submit">Save Drone</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
