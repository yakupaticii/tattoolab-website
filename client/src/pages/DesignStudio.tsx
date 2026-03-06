import { Button } from "@/components/ui/button";
import { Sparkles, Image as ImageIcon, Wand2, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function DesignStudio() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col p-4 md:p-8">
      <div className="container max-w-6xl mx-auto flex-1 flex flex-col">
        <header className="mb-8">
          <Link href="/">
            <div className="inline-flex items-center text-sm text-muted-foreground hover:text-accent mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </div>
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                 <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                   <Sparkles className="w-6 h-6 text-accent" />
                 </div>
                 <h1 className="font-display text-3xl font-bold">Design Studio</h1>
              </div>
              <p className="text-muted-foreground">Transform your ideas into stunning tattoo designs with AI.</p>
            </div>
          </div>
        </header>

        <main className="flex-1 grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Main Workspace */}
          <div className="bg-card/40 border border-border/50 rounded-2xl flex flex-col p-6 items-center justify-center min-h-[500px]">
            <ImageIcon className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">Your generated design will appear here</p>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <div className="bg-card/40 border border-border/50 rounded-2xl p-6">
              <h3 className="font-bold mb-4 font-display text-xl">Generation Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Prompt</label>
                  <textarea 
                    className="w-full bg-background border border-border rounded-lg p-4 text-sm focus:outline-none focus:border-accent resize-none min-h-[120px]"
                    placeholder="Describe the tattoo you want (e.g., A minimalist geometric wolf howling at the moon)..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Style</label>
                  <select className="w-full bg-background border border-border rounded-lg p-3 text-sm focus:outline-none focus:border-accent">
                    <option>Realism</option>
                    <option>Traditional / Old School</option>
                    <option>Minimalist / Line Art</option>
                    <option>Watercolor</option>
                    <option>Blackwork</option>
                  </select>
                </div>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg">
                  <Wand2 className="w-4 h-4 mr-2" /> Generate Design
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
