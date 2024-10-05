import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Drone, DroneStatus } from "@/types/supabase-custom";
import Image from "next/image";

interface DroneCardProps {
  drone: Drone;
}

export function DroneCard({ drone }: DroneCardProps) {
  const getStatusIcon = (status: DroneStatus[keyof DroneStatus]) => {
    switch (status) {
      case DroneStatus.Perfect:
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case DroneStatus.Flyable:
        return <AlertCircle className="w-6 h-6 text-yellow-500" />;
      case DroneStatus.Broken:
        return <XCircle className="w-6 h-6 text-red-500" />;
    }
  };

  const fallbackImage = "/placeholder.svg";

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold">{drone.nickname}</h2>
          {getStatusIcon(drone.status)}
        </div>
        <div className="flex justify-between items-start">
          <small>Manufacturer: <b>{drone.frame?.manufacturer?.name ?? '-'}</b></small>
        </div>
        <div className="flex justify-between items-start mb-2">
          <small>Frame: <b>{drone.frame?.name ?? '-'}</b></small>
        </div>
        <Image
          src={drone.image ?? fallbackImage}
          alt={drone.nickname!}
          width={100}
          height={100}
          className="w-full h-32 object-cover rounded-md"
        />
      </CardContent>
    </Card>
  );
}
