import AppLayout from "@/app/app-layout";

export default function PilotIdPageLayout(props: React.PropsWithChildren) {
  return <AppLayout childrenRequireAuthentication={false}>{props.children}</AppLayout>;
}