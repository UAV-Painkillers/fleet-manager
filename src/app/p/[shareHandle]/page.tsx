import { PilotIdCard } from "@/components/pilot-id/pilot-id-card";
import { CodeBlock } from "@/components/ui/code-block";
import { getSupabaseServerClient } from "@/lib/supabase.server";
import { Pilot } from "@/types/supabase-custom";
import { useEffect } from "react";

async function pilotProfileFetcher(shareHandle: string) {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("pilots")
    .select("*")
    .eq("share_handle", shareHandle)
    .limit(1);

  if (error?.code === "PGRST116") {
    return {
      error: null,
      data: null,
    };
  }

  if (data?.length !== 1) {
    return {
      error: new Error("PILOT_ID_NOT_FOUND"),
      data: null,
    };
  }

  return {
    error,
    data: data[0],
  };
}

interface Props {
  params: {
    shareHandle: string;
  };
}
export default async function PilotIdPage(props: Props) {
  const { shareHandle } = props.params;

  const { error, data: pilot } = await pilotProfileFetcher(shareHandle);

  const {
    data: { user },
  } = await getSupabaseServerClient().auth.getUser();
  const editMode = user?.id === pilot?.user_id;

  if (error) {
    return (
      <div>
        <p>Oh no! Something went wrong while loading the pilot-id.</p>
        <CodeBlock title="Error Details">
          {JSON.stringify(error, null, 4)}
        </CodeBlock>
      </div>
    );
  }

  if (!pilot) {
    return (
      <div>
        <p>Oh no! We couldn&apos;t find the pilot-id.</p>
      </div>
    );
  }

  return <PilotIdCard pilot={pilot} editMode={editMode} />;
}
