import React, { type ComponentType, type ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Accept either an MDX component or raw JSX/text
interface AccordionItemProps {
  trigger: string;
  content: ReactNode | ComponentType<Record<string, never>>; // Accepts text, JSX, or MDX components
}

interface AccordionComponentProps {
  items: AccordionItemProps[];
  type?: "single" | "multiple";
  defaultValue?: string;
  className?: string;
}

export default function AccordionComponent({
  items,
  type = "single",
  defaultValue,
  className,
}: AccordionComponentProps) {
  if (type === "multiple") {
    return (
      <Accordion
        type="multiple"
        defaultValue={defaultValue ? [defaultValue] : undefined}
        className={`w-full mb-6 ${className || ""}`}
      >
        {items.map((item, i) => (
          <AccordionItem key={`${item.trigger}-${i}`} value={`item-${i + 1}`}>
            <AccordionTrigger className="text-base font-medium">
              {item.trigger}
            </AccordionTrigger>
            <AccordionContent>
              {typeof item.content === "function" ? (
                <item.content /> // Render MDX component
              ) : (
                item.content // Render plain text or JSX
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }

  return (
    <Accordion
      type="single"
      defaultValue={defaultValue}
      collapsible
      className={`w-full mb-6 ${className || ""}`}
    >
      {items.map((item, i) => (
        <AccordionItem key={`${item.trigger}-${i}`} value={`item-${i + 1}`}>
          <AccordionTrigger className="text-base font-medium">
            {item.trigger}
          </AccordionTrigger>
          <AccordionContent>
            {typeof item.content === "function" ? (
              <item.content /> // Render MDX component
            ) : (
              item.content // Render plain text or JSX
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
