"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type MdxContentProps = {
  slug: string;
  fallback?: React.ReactNode;
};

const MdxContent = ({ slug, fallback }: MdxContentProps) => {
  try {
    const MDXContent = dynamic(() => import(`@/content/posts/${slug}.mdx`));
    return <MDXContent />;
  } catch (error) {
    console.error("Failed to load MDX content:", error);
    return fallback || (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Content not found.</AlertDescription>
      </Alert>
    );
  }
};

export default MdxContent;
