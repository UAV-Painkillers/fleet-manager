import { DroneStatus } from "@/types/supabase-custom";
import { useSearchParams, useRouter } from "next/navigation";
import { SortBy } from "./sort-filter";

export function useDroneFilterCriteria() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortBy = (searchParams.get("sortBy") as SortBy) || SortBy.name;
  const filterText = searchParams.get("filterText") || "";
  const statusFilterSearchParam = searchParams.get("statusFilter");
  let statusFilter: DroneStatus[keyof DroneStatus] | "all" = statusFilterSearchParam as 'all';

  if (statusFilter !== "all") {
    statusFilter = parseInt(statusFilter, 10) as DroneStatus[keyof DroneStatus];
  }

  if (Number.isNaN(statusFilter)) {
    statusFilter = "all";
  }

  const updateQueryParams = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    router.push(`?${newParams.toString()}`, { shallow: true });
  };

  return {
    sortBy,
    filterText,
    statusFilter,
    setSortBy: (sortBy: SortBy) => updateQueryParams({ sortBy }),
    setFilterText: (filterText: string) => updateQueryParams({ filterText }),
    setStatusFilter: (statusFilter: DroneStatus) =>
      updateQueryParams({ statusFilter: statusFilter.toString() }),
  };
}
