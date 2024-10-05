import { DroneGrid } from "@/components/drones/drone-grid";
import { SortBy, SortFilter } from "@/components/drones/sort-filter";
import { getSupabase } from "@/lib/supabase";
import { Drone, DroneStatus } from "@/types/supabase-custom";

interface FetchDronesProps {
  sortBy: SortBy;
  filterText: string;
  statusFilter: DroneStatus | "all";
}
async function fetchDrones(
  props: FetchDronesProps
): Promise<{ drones: Drone[]; error: Error | null }> {
  const { sortBy, filterText, statusFilter } = props;

  const supabase = getSupabase();

  let query = supabase.from("drones").select(
    `
  *,
  frame:frame_id (
    *,
    manufacturer:manufacturer_id (*)
  )
`
  );

  if (filterText) {
    query.ilike('nickname', `%${filterText}%`);
  }
  
  if (statusFilter && statusFilter !== "all") {
    query.eq('status', statusFilter);
  }

  if (sortBy === SortBy.status) {
    query.order('status', { ascending: true });
  } else {
    query.order('nickname', { ascending: true });
  }

  const { data, error } = await query.limit(100);

  if (error) {
    return {
      drones: [],
      error,
    };
  }

  const drones = data ?? [];

  return {
    drones,
    error: null,
  };
}

interface DronesPageProps {
  searchParams: {
    sortBy?: SortBy;
    filterText?: string;
    statusFilter?: DroneStatus;
  };
}

export default async function DronesPage({ searchParams }: DronesPageProps) {
  const sortBy = (searchParams.sortBy as SortBy) || SortBy.name;
  const filterText = searchParams.filterText || "";
  const statusFilter = (searchParams.statusFilter as DroneStatus) || "all";

  const { drones, error } = await fetchDrones({
    sortBy,
    filterText,
    statusFilter,
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Drone Fleet</h1>

      <SortFilter />
      <DroneGrid drones={drones} />
    </div>
  );
}
