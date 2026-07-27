import { useState } from 'react';
import { Send } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChatInput({ onSendMessage, loading }) {
  const [inputQuery, setInputQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputQuery.trim() || loading) return;
    onSendMessage(inputQuery);
    setInputQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-[24px] border border-border/60 bg-white/90 p-2.5 shadow-[0_14px_45px_-28px_rgba(15,23,42,0.45)]">
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask anything (e.g., 'What is my date of joining?')..."
          className="h-12 flex-1 rounded-full border border-transparent bg-slate-50 px-4 text-sm shadow-none transition focus-visible:border-primary/30 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-primary/20"
        />
        <Button
          type="submit"
          disabled={loading || !inputQuery.trim()}
          className="h-12 shrink-0 rounded-full px-5 shadow-sm transition hover:scale-[1.01]"
        >
          <Send className="mr-1.5 h-4 w-4" />
          Send
        </Button>
      </div>
    </form>
  );
}