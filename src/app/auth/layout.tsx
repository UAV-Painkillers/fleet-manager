import AppLayout from "../app-layout";

export default function(props: React.PropsWithChildren) {
  return <AppLayout minimal>
    {props.children}
  </AppLayout>;
};