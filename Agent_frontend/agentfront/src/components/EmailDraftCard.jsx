import { useState } from 'react';
import { useAuth } from "@clerk/clerk-react";
import axios from 'axios';
import { Mail, Send, X, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const FASTAPI_URL = "http://localhost:8000";

export default function EmailDraftCard({ draft }) {
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState("");
  const { getToken } = useAuth();

  const handleSend = async () => {
    setStatus("sending");
    try {
      const token = await getToken();
      await axios.post(`${FASTAPI_URL}/email/draft/${draft.draft_id}/send`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err.response?.data?.detail || "Failed to send.");
    }
  };

  const handleCancel = async () => {
    const token = await getToken();
    await axios.post(`${FASTAPI_URL}/email/draft/${draft.draft_id}/cancel`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStatus("cancelled");
  };

  return (
    <Card className="max-w-[90%] border-border/60 bg-muted/40 p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
        <Mail className="h-4 w-4 text-primary" />
        Email draft — review before sending
      </div>
      <div className="space-y-1 text-sm">
        <p><span className="text-muted-foreground">To:</span> {draft.to}</p>
        <p><span className="text-muted-foreground">Subject:</span> {draft.subject}</p>
        <p className="whitespace-pre-wrap pt-1 text-foreground">{draft.body}</p>
      </div>

      {status === "pending" && (
        <div className="mt-3 flex gap-2">
          <Button size="sm" onClick={handleSend} className="rounded-full">
            <Send className="mr-1.5 h-3.5 w-3.5" /> Send
          </Button>
          <Button size="sm" variant="ghost" onClick={handleCancel} className="rounded-full">
            <X className="mr-1.5 h-3.5 w-3.5" /> Cancel
          </Button>
        </div>
      )}
      {status === "sending" && (
        <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-3.5 w-3.5 animate-spin" /> Sending...
        </div>
      )}
      {status === "sent" && (
        <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
          <CheckCircle2 className="h-3.5 w-3.5" /> Sent
        </div>
      )}
      {status === "cancelled" && (
        <div className="mt-3 text-sm text-muted-foreground">Draft cancelled.</div>
      )}
      {status === "error" && (
        <div className="mt-3 text-sm text-destructive">❌ {error}</div>
      )}
    </Card>
  );
}