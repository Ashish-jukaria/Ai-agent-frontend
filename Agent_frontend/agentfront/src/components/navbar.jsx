import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-background/80 backdrop-blur-md border-b sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <Database className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold text-foreground">Enterprise Graph Agent</h1>
            <Badge variant="outline" className="text-[10px] py-0 px-1.5 font-mono">v1.0</Badge>
          </div>
          <p className="text-xs text-muted-foreground">LangGraph • Neo4j • Qdrant</p>
        </div>
      </div>
      <div>
        <SignedOut>
          <SignInButton mode="modal">
            <Button size="sm">Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
}