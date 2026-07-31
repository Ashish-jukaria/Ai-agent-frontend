import { useState, useEffect, useCallback } from 'react';
import { useAuth } from "@clerk/clerk-react";
import axios from 'axios';
import { Calendar, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const FASTAPI_URL = "https://ai-agent-z14g.onrender.com";

export default function GoogleCalendarConnect() {
  const [connected, setConnected] = useState(false);
  const [checking, setChecking] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const { getToken } = useAuth();

  const checkStatus = useCallback(async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${FASTAPI_URL}/auth/google/status`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConnected(data.connected);
    } catch {
      setConnected(false);
    } finally {
      setChecking(false);
    }
  }, [getToken]);

  useEffect(() => {
    checkStatus();

    // Primary channel: the popup posts a message back once linked
    const handleMessage = (event) => {
      if (event.origin !== new URL(FASTAPI_URL).origin) return;
      if (event.data?.type === "google_calendar_connected") {
        setConnected(true);
        setConnecting(false);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [checkStatus]);

  const handleConnect = async () => {
    setConnecting(true);
    const token = await getToken();
    const { data } = await axios.get(`${FASTAPI_URL}/auth/google/connect`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const popup = window.open(data.auth_url, "google-oauth", "width=500,height=650");

    // Fallback in case postMessage doesn't land (e.g. popup blockers, browser quirks)
    const poll = setInterval(() => {
      if (popup.closed) {
        clearInterval(poll);
        setConnecting(false);
        checkStatus();
      }
    }, 1000);
  };

  const handleDisconnect = async () => {
    const token = await getToken();
    await axios.post(`${FASTAPI_URL}/auth/google/disconnect`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setConnected(false);
  };

  if (checking) return null;

  return (
    <div className="flex items-center gap-2">
      {connected ? (
        <>
          <Badge variant="default" className="rounded-full text-[11px]">
            <CheckCircle2 className="mr-1 h-3 w-3" />
          Calender and Gmail connected
          </Badge>
          <Button size="sm" variant="ghost" onClick={handleDisconnect} className="text-xs text-muted-foreground">
            Disconnect
          </Button>
        </>
      ) : (
        <Button size="sm" variant="secondary" onClick={handleConnect} disabled={connecting} className="rounded-full text-xs">
          {connecting ? <Loader2 className="mr-1.5 h-3 w-3 animate-spin" /> : <Calendar className="mr-1.5 h-3 w-3" />}
          {connecting ? "Connecting..." : "Connect Google Calendar and Gmail"}
        </Button>
      )}
    </div>
  );
}