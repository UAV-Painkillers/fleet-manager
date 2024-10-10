"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DroneStatus } from "@/types/supabase-custom";
import { useDroneFilterCriteria } from "./drone-filter.utils";

export enum SortBy {
  name = "name",
  status = "status",
}

export function SortFilter() {
  const {
    sortBy,
    filterText,
    statusFilter,
    setSortBy,
    setFilterText,
    setStatusFilter,
  } = useDroneFilterCriteria();

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex flex-col gap-2">
        <Label>Sort by</Label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="status">Status</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Filter by status</Label>
        <Select value={String(statusFilter)} onValueChange={(val: string) => {
          if (val === 'all') {
            setStatusFilter('all');
            return;
          }

          setStatusFilter(parseInt(val, 10) as DroneStatus[keyof DroneStatus]);
        }}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {Object.keys(DroneStatus).map((statusLabel) => (
              <SelectItem value={String(DroneStatus[statusLabel as keyof DroneStatus])} key={DroneStatus[statusLabel as keyof DroneStatus]}>
                {statusLabel}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2 flex-grow">
        <Label htmlFor="filter-input">Search drones</Label>
        <Input
          id="filter-input"
          type="text"
          placeholder="Filter by name or nickname"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full"
          autoComplete="off"
        />
      </div>
    </div>
  );
}
