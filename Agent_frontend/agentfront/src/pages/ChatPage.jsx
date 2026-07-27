import { useState } from 'react';
import { useAuth } from "@clerk/clerk-react";
import axios from 'axios';
import PdfUploader from '../components/PdfUploader';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';

const FASTAPI_URL = "http://localhost:8000";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const handleSendMessage = async (userText) => {
    setMessages((prev) => [...prev, { role: "human", text: userText }]);
    setLoading(true);

    try {
      const token = await getToken();
      const response = await axios.post(
        `${FASTAPI_URL}/chat`,
        { query: userText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const aiReply = response.data.response || "No response received.";
      setMessages((prev) => [...prev, { role: "ai", text: aiReply }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "❌ Error: Unable to authenticate or communicate with backend." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-[24px] bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(248,250,252,0.95))] p-3 shadow-inner sm:p-4">
      <div className="flex flex-col gap-2 rounded-[20px] border border-border/60 bg-white/80 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Knowledge workspace</h2>
          <p className="text-sm text-muted-foreground">Upload context and ask questions in natural language.</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          <span className="h-2 w-2 rounded-full bg-primary" />
          Live assistant
        </div>
      </div>

      <PdfUploader />
      <ChatMessages messages={messages} loading={loading} />
      <ChatInput onSendMessage={handleSendMessage} loading={loading} />
    </div>
  );
}