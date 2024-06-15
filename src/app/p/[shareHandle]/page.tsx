import { PilotIdCard } from "@/components/pilot-id/pilot-id-card";
import { CodeBlock } from "@/components/ui/code-block";
import { getSupabaseServer } from "@/lib/supabase-server";
import { Pilot } from "@/types/supabase-custom";

async function pilotProfileFetcher(shareHandle: string) {
  const supabase = getSupabaseServer();
  return await supabase
    .from("pilots")
    .select("*")
    .eq("share_handle", shareHandle)
    .limit(1)
    .returns<Pilot>()
    .single();
}

interface Props {
  params: {
    shareHandle: string;
  };
}
export default async function PilotIdPage(props: Props) {
  const { shareHandle } = props.params;

  const { error, data: pilot } = await pilotProfileFetcher(shareHandle);

  console.log({
    error, pilot
  })

  if (error) {
    return (
      <div>
        <p>Oh no! Something went wrong while loading your profile.</p>
        <CodeBlock title="Error Details">{JSON.stringify(error, null, 4)}</CodeBlock>
      </div>
    );
  }

  if (!pilot) {
    return (
      <div>
        <p>Oh no! We couldn't find your profile.</p>
      </div>
    );
  }

  return <PilotIdCard pilot={pilot} />;
}
