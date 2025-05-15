'use client';

import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { codeToHtml, type BundledLanguage } from 'shiki';
import { CopyIcon, type CopyIconHandle } from '@/components/ui/copy';

interface CodeProps {
  className?: string;
  children: React.ReactNode;
}

// Helper function to extract string from ReactNode
const getNodeText = (node: React.ReactNode): string => {
  if (node == null) { // handles null and undefined
    return '';
  }
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(getNodeText).join('');
  }
  // Check if it's a React element with children
  if (typeof node === 'object' && node !== null && 'props' in node) {
    const props = (node as { props?: { children?: React.ReactNode } }).props;
    if (props && typeof props === 'object' && 'children' in props) {
      return getNodeText(props.children);
    }
  }
  return '';
};

const Code = (props: CodeProps) => {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState<string | null>(null);
  const [rawCode, setRawCode] = useState<string>("");
  const copyIconRef = useRef<CopyIconHandle>(null);
  const { resolvedTheme } = useTheme();

  const { className, children } = props;
  const matches = className?.match(/language-(.*)/);
  // Ensure language is a valid BundledLanguage or fallback to plaintext
  const language = (matches?.[1] || "plaintext") as BundledLanguage;

  useEffect(() => {
    const codeString = getNodeText(children);
    setRawCode(codeString);

    const highlight = async () => {
      try {
        const shikiTheme = resolvedTheme === 'light' ? 'catppuccin-latte' : 'catppuccin-mocha';
        const html = await codeToHtml(codeString, {
          lang: language,
          theme: shikiTheme,
        });
        setHighlightedCode(html);
      } catch (error) {
        console.error("Shiki highlighting error:", error);
        const escapedCodeString = codeString.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        setHighlightedCode(`<pre class="shiki-fallback"><code>${escapedCodeString}</code></pre>`);
      }
    };

    if (codeString) {
      highlight();
    } else {
      setHighlightedCode('<pre><code></code></pre>');
    }
  }, [children, language, resolvedTheme]); // Rerun when children, language or theme changes

  const handleCopy = () => {
    if (rawCode) {
      navigator.clipboard.writeText(rawCode).then(() => {
        setCopied(true);
        copyIconRef.current?.startAnimation();
        setTimeout(() => {
          setCopied(false);
          copyIconRef.current?.stopAnimation();
        }, 2000);
      });
    }
  };

  // Initial rendering state (loading or before useEffect runs)
  if (highlightedCode === null) {
    return (
      <div
        className="rounded-lg border w-full max-w-full overflow-hidden mb-4"
      >
        <div className="flex justify-between items-center bg-secondary py-2 px-4 rounded-t-lg border-b">
          <span className="text-secondary-foreground text-sm">{language || 'code'}</span>
          <div className="text-xs text-muted-foreground">Copy</div>
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
          <code className={`${className || ''} text-card-foreground block w-full font-mono text-sm`}
            style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
          >
            {/* Display raw code or children as placeholder during loading */}
            {rawCode || getNodeText(children) || 'Loading code...'}
          </code>
        </pre>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg border w-full max-w-full overflow-hidden mb-4 shiki-container"
    >
      <div className="flex justify-between items-center bg-secondary py-2 px-4 rounded-t-lg border-b">
        <span className="text-secondary-foreground text-sm">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 gap-1 text-xs flex items-center hover:bg-muted"
        >
          <CopyIcon ref={copyIconRef} size={16} />
          <span className="ml-1">{copied ? "Copied!" : "Copy"}</span>
        </Button>
      </div>
      <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </div>
  );
};

export default Code;
