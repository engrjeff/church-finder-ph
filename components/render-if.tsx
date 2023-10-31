import React from "react";

function RenderIf(props: React.PropsWithChildren<{ condition: boolean }>) {
  return <>{props.condition ? props.children : null}</>;
}

export default RenderIf;
