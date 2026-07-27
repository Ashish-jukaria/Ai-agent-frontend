import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { ShieldCheck, Sparkles } from "lucide-react";
import Navbar from "./components/navbar";
import ChatPage from "./pages/ChatPage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_32%),linear-gradient(135deg,_#f8fbff_0%,_#f3f4f6_100%)] font-sans text-foreground">
      <Navbar />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <section className="rounded-[28px] border border-border/70 bg-white/80 p-6 shadow-[0_25px_70px_-35px_rgba(15,23,42,0.45)] backdrop-blur xl:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                AI workplace copilot
              </div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Explore your organization’s knowledge in one place
              </h1>
              <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                Ask questions across your Neo4j graph and uploaded documents with secure, agent-driven answers.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-slate-50/80 px-4 py-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 font-medium text-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Tenant-isolated & secure
              </div>
            </div>
          </div>
        </section>

        <SignedIn>
          <div className="rounded-[30px] border border-border/70 bg-white/75 p-3 shadow-[0_25px_70px_-35px_rgba(15,23,42,0.35)] backdrop-blur">
            <ChatPage />
          </div>
        </SignedIn>

        <SignedOut>
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary/10 via-background to-slate-100 p-10 text-center shadow-[0_25px_70px_-35px_rgba(15,23,42,0.4)]">
            <div className="mx-auto flex max-w-xl flex-col items-center">
              <div className="mb-4 rounded-2xl border border-primary/15 bg-background/80 p-3 text-primary">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h2 className="mb-2 text-2xl font-semibold text-foreground">Welcome to the corporate portal</h2>
              <p className="mb-6 text-sm leading-7 text-muted-foreground sm:text-base">
                Authenticate to securely query your tenant-isolated knowledge graph and document store.
              </p>
              <SignInButton mode="modal">
                <Button size="lg" className="rounded-full px-6">
                  Authenticate Now
                </Button>
              </SignInButton>
            </div>
          </Card>
        </SignedOut>
      </main>
    </div>
  );
}