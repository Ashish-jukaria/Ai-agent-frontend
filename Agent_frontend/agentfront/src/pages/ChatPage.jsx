import { useState, useRef, useEffect } from 'react';
import { useAuth } from "@clerk/clerk-react";
import axios from 'axios';
import PdfUploader from '../components/PdfUploader';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';

const FASTAPI_URL = "https://ai-agent-z14g.onrender.com";
const POLL_INTERVAL_MS = 1500;
const MAX_POLL_ATTEMPTS = 40; // ~60s before giving up

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => { scrollToBottom(); }, [messages, loading]);

  // Fetch a fresh token each poll — Clerk tokens are short-lived and a long-running
  // job could otherwise outlive the token grabbed at send time.
  const pollJob = async (jobId) => {
    for (let attempt = 0; attempt < MAX_POLL_ATTEMPTS; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));

      const token = await getToken();
      const { data } = await axios.get(`${FASTAPI_URL}/chat/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.status === "done") return { text: data.response, pendingDraft: data.pending_draft || null };;
      if (data.status === "error") throw new Error(data.error || "Something went wrong.");
      // status === "pending" -> keep polling
    }
    throw new Error("Timed out waiting for a response.");
  };

  const handleSendMessage = async (userText) => {
    setMessages((prev) => [...prev, { role: "human", text: userText }]);
    setLoading(true);

    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${FASTAPI_URL}/chat`,
        { query: userText },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );

      const {aiReply,pendingDraft } = await pollJob(data.job_id);
      setMessages((prev) => [...prev, { role: "ai", text: aiReply || "No response received.",pendingDraft  }]);
    } catch (error) {
      const errMsg = error.response?.data?.detail || error.message || "Error connecting to backend.";
      setMessages((prev) => [...prev, { role: "ai", text: `❌ ${errMsg}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full flex-col bg-transparent">
      <div className="flex-1 overflow-y-auto">
        <ChatMessages messages={messages} loading={loading} />
        <div ref={messagesEndRef} className="h-6" />
      </div>

      <div className="shrink-0 bg-gradient-to-t from-background/90 via-background/80 to-transparent pt-6 pb-4 px-4">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
          <PdfUploader />
          <ChatInput onSendMessage={handleSendMessage} loading={loading} />
          <div className="text-center text-[11px] text-muted-foreground">
            AI can make mistakes. Verify important information.
          </div>
        </div>
      </div>
    </div>
  );
}