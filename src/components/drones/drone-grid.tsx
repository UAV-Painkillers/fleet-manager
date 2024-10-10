"use client";

import { DroneCard } from "./drone-card";
import { AddDroneCard } from "./add-drone-card";
import { Drone } from "@/types/supabase-custom";
import { useCallback, useEffect, useState } from "react";

interface Props {
  drones: Drone[];
}

export function DroneGrid(props: Props) {
  const { drones: incomingDrones } = props;

  const [allDrones, setAllDrones] = useState<Drone[]>(incomingDrones);

  useEffect(() => {
    setAllDrones(incomingDrones);
  }, [incomingDrones]);

  const onCreateSuccess = useCallback((drone: Drone) => {
    setAllDrones((currentDrones) => [...currentDrones, drone]);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {allDrones.map((drone) => (
        <DroneCard key={drone.id} drone={drone} />
      ))}
      <AddDroneCard onCreateSuccess={onCreateSuccess} />
    </div>
  );
}
