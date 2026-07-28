import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { ShieldCheck, Sparkles } from "lucide-react";
import Navbar from "./components/Navbar";
import ChatPage from "./pages/ChatPage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function App() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_32%),linear-gradient(135deg,_#f8fbff_0%,_#f3f4f6_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_32%),linear-gradient(135deg,_#0a0e17_0%,_#0d1220_100%)] font-sans text-foreground transition-colors duration-300">
      <Navbar />

      <main className="flex w-full flex-1 min-h-0 flex-col overflow-hidden">
        <section className="shrink-0 rounded-[28px] border border-border/70 bg-white/80 dark:bg-slate-900/70 p-5 shadow-[0_25px_70px_-35px_rgba(15,23,42,0.45)] backdrop-blur xl:p-6 transition-colors duration-300">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                AI workplace copilot
              </div>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Explore your organization's knowledge in one place
              </h1>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Ask questions across your Neo4j graph and uploaded documents with secure, agent-driven answers.
              </p>
            </div>

            <div className="hidden rounded-2xl border border-border/60 bg-slate-50/80 dark:bg-slate-800/60 px-4 py-3 text-sm text-muted-foreground md:block">
              <div className="flex items-center gap-2 font-medium text-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Tenant-isolated & secure
              </div>
            </div>
          </div>
        </section>

        <SignedIn>
          <div className="flex flex-1 min-h-0 flex-col overflow-hidden rounded-[30px] border border-border/70 bg-white/75 dark:bg-slate-900/60 p-3 shadow-[0_25px_70px_-35px_rgba(15,23,42,0.35)] backdrop-blur transition-colors duration-300">
            <ChatPage />
          </div>
        </SignedIn>

        <SignedOut>
          <div className="m-auto w-full">
            <Card className="mx-auto max-w-2xl overflow-hidden border-0 bg-gradient-to-br from-primary/10 via-background to-slate-100 dark:to-slate-800 p-10 text-center shadow-[0_25px_70px_-35px_rgba(15,23,42,0.4)]">
              <div className="mx-auto flex flex-col items-center">
                <div className="mb-4 rounded-2xl border border-primary/15 bg-background/80 p-3 text-primary">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <h2 className="mb-2 text-2xl font-semibold text-foreground">Welcome to the corporate portal</h2>
                <p className="mb-6 text-sm leading-7 text-muted-foreground sm:text-base">
                  Authenticate to securely query your tenant-isolated knowledge graph and document store.
                </p>
                <SignInButton mode="modal">
                  <Button size="lg" className="rounded-full px-6 cursor-pointer">
                    Authenticate Now
                  </Button>
                </SignInButton>
              </div>
            </Card>
          </div>
        </SignedOut>
      </main>
    </div>
  );
}