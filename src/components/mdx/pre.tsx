import type React from "react";

const Pre = (props: React.ComponentPropsWithoutRef<"pre">) => {
  return (
    <pre
      className="bg-transparent rounded-lg p-0 mb-0 overflow-auto font-mono text-sm"
      {...props}
    />
  );
};

export default Pre;
