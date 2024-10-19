"use server";

import { DroneCard } from "./drone-card";
import { AddDroneCard } from "./add-drone-card";
import { Drone } from "@/types/supabase-custom";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

interface Props {
  drones: Drone[];
}

export async function DroneGrid(props: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {props.drones.map((drone) => (
        <DroneCard key={drone.id} drone={drone} />
      ))}
      <AddDroneCard onCreateSuccess={async () => {
        "use server";

        revalidatePath("/drones");
        redirect("/drones");
      }} />
    </div>
  );
}
