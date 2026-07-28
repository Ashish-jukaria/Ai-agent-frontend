import { Bot, Loader2, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const markdownComponents = {
  p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  ul: ({ children }) => <ul className="mb-3 ml-5 list-disc space-y-1">{children}</ul>,
  ol: ({ children }) => <ol className="mb-3 ml-5 list-decimal space-y-1">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  code: ({ inline, children }) =>
    inline ? (
      <code className="rounded bg-muted px-1.5 py-0.5 text-[13px] font-mono">{children}</code>
    ) : (
      <code className="block overflow-x-auto rounded-lg bg-muted p-3 text-[13px] font-mono">{children}</code>
    ),
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">
      {children}
    </a>
  ),
  h1: ({ children }) => <h1 className="mb-2 text-lg font-semibold">{children}</h1>,
  h2: ({ children }) => <h2 className="mb-2 text-base font-semibold">{children}</h2>,
  h3: ({ children }) => <h3 className="mb-2 text-sm font-semibold">{children}</h3>,
};

export default function ChatMessages({ messages, loading }) {
  if (messages.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center px-4">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Sparkles className="h-8 w-8" />
        </div>
        <h2 className="mb-2 text-2xl font-semibold text-foreground">How can I help you today?</h2>
        <p className="text-sm text-muted-foreground max-w-md">
          Upload a document below or ask a question about your enterprise graph.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 py-6 px-4 sm:px-0">
      {messages.map((msg, index) => (
        <div key={index} className={`flex w-full ${msg.role === 'human' ? 'justify-end' : 'justify-start'}`}>
          {msg.role === 'human' ? (
            <div className="max-w-[80%] rounded-2xl bg-muted/70 px-5 py-3.5 text-[15px] leading-relaxed text-foreground whitespace-pre-wrap">
              {msg.text}
            </div>
          ) : (
            <div className="flex w-full gap-4 max-w-[90%]">
              <Avatar className="h-8 w-8 shrink-0 border border-border/50 shadow-sm">
                <AvatarFallback className="bg-background text-primary">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="pt-1 text-[15px] leading-relaxed text-foreground min-w-0 flex-1">
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                  {msg.text}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      ))}

      {loading && (
        <div className="flex w-full gap-4">
          <Avatar className="h-8 w-8 shrink-0 border border-border/50 shadow-sm">
            <AvatarFallback className="bg-background text-primary">
              <Bot className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="pt-2">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
}