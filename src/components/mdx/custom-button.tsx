import React from "react";
import { Button } from "@/components/ui/button";

function CustomButton({ children }: { children: React.ReactNode }) {
  return (
    <Button className="w-auto">
      {children}
    </Button>
  );
}

export default CustomButton;
