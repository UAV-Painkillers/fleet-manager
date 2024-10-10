"use client";

import { PlusCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DroneUpsertForm } from "./drone-upsert-form";
import { useCallback, useState } from "react";
import { DialogProvider } from "../dialog";
import { Drone } from "@/types/supabase-custom";

interface Props {
  onCreateSuccess?: (drone: Drone) => void;
}

export function AddDroneCard(props: Props) {
  const [showUpsertForm, setShowUpsertForm] = useState(false);
 
  const onClick = () => {
    setShowUpsertForm(true);
  };

  const onCreateSuccess = useCallback((drone: Drone) => {
    if (typeof props.onCreateSuccess === "function") {
      props.onCreateSuccess(drone);
    }

    setShowUpsertForm(false);
  }, [props]);

  return (
    <>
      <Card
        className="cursor-pointer hover:shadow-lg transition-shadow flex items-center justify-center"
        onClick={onClick}
      >
        <CardContent className="p-4 text-center">
          <PlusCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p className="text-gray-500">Add New Drone</p>
        </CardContent>
      </Card>
      <DialogProvider>
        <DroneUpsertForm
          onCreateSuccess={onCreateSuccess}
          open={showUpsertForm}
          onOpenChange={setShowUpsertForm}
        />
      </DialogProvider>
    </>
  );
}
