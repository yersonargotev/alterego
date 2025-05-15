"use client";

import type React from "react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface CodeProps {
  className?: string;
  children: React.ReactNode;
}

const Code = (props: CodeProps) => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const className = props.className || "";
  const matches = className.match(/language-(.*)/);
  const language = matches?.[1] || "";

  const handleCopy = () => {
    if (codeRef.current) {
      const codeText = codeRef.current.innerText;
      navigator.clipboard.writeText(codeText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div
      className="rounded-lg border w-full max-w-full overflow-hidden mb-4"
      style={{ maxWidth: "100%", overflow: "hidden" }}
    >
      <div className="flex justify-between items-center bg-secondary py-2 px-4 rounded-t-lg border-b">
        <span className="text-secondary-foreground text-sm">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 gap-1 text-xs"
        >
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
      <pre
        className="bg-card p-4 rounded-b-lg overflow-auto w-full block max-w-full"
        style={{
          maxWidth: "100%",
          overflowX: "auto",
          wordWrap: "break-word",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        <code
          ref={codeRef}
          className={`${className} text-card-foreground block w-full font-mono text-sm`}
          style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
        >
          {props.children}
        </code>
      </pre>
    </div>
  );
};

export default Code;
