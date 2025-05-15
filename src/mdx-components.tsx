import React from "react";
import type { MDXComponents } from "mdx/types";
import YouTube from "@/components/mdx/youtube";
import Code from "@/components/mdx/code";
import InlineCode from "@/components/mdx/inline-code";
import Pre from "@/components/mdx/pre";
import Image from "@/components/mdx/image";
import CustomLink from "@/components/mdx/custom-link";
import { Button } from "@/components/ui/button";
import AccordionComponent from "@/components/mdx/accordion-component";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    YouTube,
    AccordionComponent,
    Button: (props) => (
      <Button className="mb-4" {...props} />
    ),
    Image,
    pre: Pre,
    code: ({ className, children, ...rest }) => {
      if (className) {
        return (
          <Code className={className} {...rest}>
            {children}
          </Code>
        );
      }
      return <InlineCode>{children}</InlineCode>;
    },
    h1: (props) => (
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight mb-4" {...props} />
    ),
    h2: (props) => (
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-4" {...props} />
    ),
    h3: (props) => (
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4" {...props} />
    ),
    h4: (props) => (
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-4" {...props} />
    ),
    h5: (props) => (
      <h5 className="scroll-m-20 text-lg font-semibold tracking-tight mb-4" {...props} />
    ),
    h6: (props) => (
      <h6 className="scroll-m-20 text-base font-semibold tracking-tight mb-4" {...props} />
    ),
    p: (props) => (
      <p className="leading-7 mb-4" {...props} />
    ),
    li: (props) => (
      <li className="mt-2" {...props} />
    ),
    ul: (props) => (
      <ul className="list-disc pl-6 mb-4" {...props} />
    ),
    ol: (props) => (
      <ol className="list-decimal pl-6 mb-4" {...props} />
    ),
    hr: (props) => (
      <hr className="my-4 border-border" {...props} />
    ),
    blockquote: (props) => (
      <blockquote
        className="border-l-4 border-border pl-4 my-4 italic"
        {...props}
      />
    ),
    a: ({ href = "", children, ...rest }) => {
      return (
        <CustomLink href={href} {...rest}>
          {children}
        </CustomLink>
      );
    },
    table: (props) => (
      <div className="overflow-x-auto my-4">
        <table
          className="w-full border-collapse border border-border"
          {...props}
        />
      </div>
    ),
    thead: (props) => (
      <thead className="bg-muted" {...props} />
    ),
    tbody: (props) => (
      <tbody className="divide-y divide-border" {...props} />
    ),
    tr: (props) => (
      <tr className="even:bg-muted/50" {...props} />
    ),
    th: (props) => (
      <th
        className="px-4 py-2 text-sm font-medium text-foreground border border-border"
        {...props}
      />
    ),
    td: (props) => (
      <td
        className="px-4 py-2 text-sm text-muted-foreground border border-border"
        {...props}
      />
    ),
  };
}
