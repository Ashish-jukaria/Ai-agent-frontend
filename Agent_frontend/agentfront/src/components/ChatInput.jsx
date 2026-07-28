import { useState } from 'react';
import { ArrowUp } from 'lucide-react';
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
    <form 
      onSubmit={handleSubmit} 
      className="relative flex w-full items-center rounded-[24px] border border-border/60 bg-background px-2 py-2 shadow-[0_0_15px_rgba(0,0,0,0.05)] focus-within:ring-1 focus-within:ring-border/80 transition-all"
    >
      <input
        type="text"
        value={inputQuery}
        onChange={(e) => setInputQuery(e.target.value)}
        placeholder="Message AI Agent..."
        className="flex-1 bg-transparent px-4 py-2.5 text-[15px] outline-none placeholder:text-muted-foreground"
      />
      
      <Button
        type="submit"
        disabled={loading || !inputQuery.trim()}
        size="icon"
        className="h-9 w-9 shrink-0 rounded-full cursor-pointer transition-transform active:scale-95"
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
    </form>
  );
}