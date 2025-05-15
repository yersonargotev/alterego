import type React from "react";

const Pre = (props: React.ComponentPropsWithoutRef<"pre">) => {
  return (
    <pre
      className="bg-card text-card-foreground rounded-lg p-4 mb-4 overflow-auto font-mono text-sm"
      {...props}
    />
  );
};

export default Pre;
