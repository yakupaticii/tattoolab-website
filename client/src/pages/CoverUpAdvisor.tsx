import { Button } from "@/components/ui/button";
import { Shield, Upload, Sparkles, ArrowLeft, MoveRight } from "lucide-react";
import { Link } from "wouter";

export default function CoverUpAdvisor() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col p-4 md:p-8">
            <div className="container max-w-5xl mx-auto flex-1 flex flex-col">
                <header className="mb-8">
                    <Link href="/">
                        <div className="inline-flex items-center text-sm text-muted-foreground hover:text-accent mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </div>
                    </Link>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                            <Shield className="w-6 h-6 text-accent" />
                        </div>
                        <h1 className="font-display text-3xl font-bold">Cover-Up Advisor</h1>
                    </div>
                    <p className="text-muted-foreground">Get AI-powered recommendations for covering existing tattoos.</p>
                </header>

                <main className="flex-1 grid md:grid-cols-2 gap-8">
                    <div className="bg-card/40 border border-border/50 rounded-2xl flex flex-col p-6">
                        <h3 className="font-display text-xl mb-4 flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/20 text-accent text-sm">1</span>
                            Current Tattoo
                        </h3>
                        <div className="flex-1 border-2 border-dashed border-border/50 rounded-xl flex flex-col items-center justify-center p-8 bg-background/50 hover:bg-background/80 transition-colors cursor-pointer group">
                            <Upload className="w-10 h-10 text-muted-foreground/50 mb-4 group-hover:text-accent transition-colors" />
                            <p className="text-sm text-balance text-center text-muted-foreground mb-6">Snap a clear photo of the tattoo you want to cover up.</p>
                            <Button variant="outline" className="border-accent/30 group-hover:bg-accent/10">Upload Photo</Button>
                        </div>
                    </div>

                    <div className="bg-card/40 border border-border/50 rounded-2xl flex flex-col p-6">
                        <h3 className="font-display text-xl mb-4 flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/20 text-accent text-sm">2</span>
                            Suggested Designs
                        </h3>
                        <div className="flex-1 rounded-xl flex flex-col items-center justify-center p-8 bg-background/50 border border-border/30 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
                            <Sparkles className="w-10 h-10 text-muted-foreground/30 mb-4 z-10" />
                            <p className="text-sm text-center text-muted-foreground max-w-xs z-10">Upload a photo first to get cover-up suggestions that match the shape and darkness of your current design.</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
