import { Bot, User, Loader2, Sparkles } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChatMessages({ messages, loading }) {
  return (
    <Card className="overflow-hidden border border-border/60 bg-white/90 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.4)]">
      <ScrollArea className="h-105 p-4 sm:p-6">
        {messages.length === 0 ? (
          <div className="my-3 flex h-full flex-col items-center justify-center rounded-[28px] border border-dashed border-primary/20 bg-[linear-gradient(135deg,rgba(59,130,246,0.08),rgba(255,255,255,1))] p-8 text-center shadow-inner sm:p-10">
            <div className="mb-4 rounded-2xl bg-primary/10 p-3 text-primary">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="mb-1 text-base font-semibold text-foreground">Knowledge Agent Ready</h3>
            <p className="max-w-md text-sm leading-7 text-muted-foreground">
              Ask questions about employee records, uploaded documents, or enterprise workflows and get grounded answers.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex max-w-[90%] gap-3 ${
                  msg.role === 'human' ? 'self-end flex-row-reverse' : 'self-start'
                }`}
              >
                <Avatar className="h-9 w-9 shrink-0 border border-border/60 bg-background shadow-sm">
                  <AvatarFallback className={msg.role === 'human' ? 'bg-primary text-primary-foreground' : 'bg-slate-100 text-slate-700'}>
                    {msg.role === 'human' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>

                <div
                  className={`rounded-[20px] border px-4 py-3 text-sm leading-7 whitespace-pre-wrap shadow-sm ${
                    msg.role === 'human'
                      ? 'rounded-tr-sm border-primary/20 bg-primary text-primary-foreground'
                      : 'rounded-tl-sm border-border/60 bg-slate-50 text-foreground'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        )}

        {loading && (
          <div className="mt-4 flex w-fit items-center gap-2.5 rounded-full border border-border/60 bg-slate-50 px-4 py-2.5 text-muted-foreground shadow-sm">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span className="text-xs font-medium">Agent traversing Knowledge Graph...</span>
          </div>
        )}
      </ScrollArea>
    </Card>
  );
}