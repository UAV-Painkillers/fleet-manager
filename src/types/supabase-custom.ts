import { Database } from "./supabase";

export type Pilot = Database["public"]["Tables"]["pilots"]["Row"];
export type Document = Database["public"]["Tables"]["documents"]["Row"];
export type DocumentCategory = Database["public"]["Enums"]["document_category"];
export type Manufacturer = Database["public"]["Tables"]["manufacturers"]["Row"];
export type Frame = Database["public"]["Tables"]["frames"]["Row"] & {
  manufacturer?: Manufacturer;
}
export const DroneStatus = {
  Perfect: 0,
  Flyable: 1,
  Broken: 2,
} as const;
export type DroneStatus = typeof DroneStatus;
export type Drone = Omit<Database["public"]["Tables"]["drones"]["Row"], 'status'> & {
  frame?: Frame;
  status: DroneStatus[keyof DroneStatus];
};